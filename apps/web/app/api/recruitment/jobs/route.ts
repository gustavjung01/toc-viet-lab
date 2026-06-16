import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasD1Env, queryD1 } from "@/lib/d1-http";
import { getRecruitmentLimits } from "@/lib/recruitment";
import {
  getFallbackJobs,
  normalizeJobPost,
  parseEmployerType,
  parseWorkType,
  randomRecruitmentId,
  sanitizeText,
  unixNow,
  type RecruitmentUsage,
} from "@/lib/recruitment-jobs";

function monthStartUnix() {
  const now = new Date();
  return Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000);
}

async function getPaidCredits(userId: string, orderType: "post_package" | "boost_package") {
  const rows = await queryD1<{ credits: number }>(
    `SELECT COALESCE(SUM(quantity_total - quantity_used), 0) as credits
     FROM recruitment_orders
     WHERE user_id = ?
       AND status = 'paid'
       AND order_type = ?
       AND quantity_used < quantity_total
       AND (expires_at IS NULL OR expires_at > unixepoch())`,
    [userId, orderType]
  );

  return Number(rows?.[0]?.credits ?? 0);
}

async function getRecruitmentUsage(userId: string, role: string): Promise<RecruitmentUsage> {
  const limits = getRecruitmentLimits(role);
  const monthStart = monthStartUnix();

  const [postCountRows, activeCountRows, boostCountRows, paidPostCredits, paidBoostCredits] = await Promise.all([
    queryD1<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM job_posts
       WHERE employer_user_id = ?
         AND created_at >= ?
         AND status IN ('published', 'closed', 'expired')`,
      [userId, monthStart]
    ),
    queryD1<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM job_posts
       WHERE employer_user_id = ?
         AND status = 'published'
         AND (expires_at IS NULL OR expires_at > unixepoch())`,
      [userId]
    ),
    queryD1<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM job_posts
       WHERE employer_user_id = ?
         AND boost_until IS NOT NULL
         AND boost_until >= ?`,
      [userId, monthStart]
    ),
    getPaidCredits(userId, "post_package"),
    getPaidCredits(userId, "boost_package"),
  ]);

  const postsThisMonth = Number(postCountRows?.[0]?.count ?? 0);
  const activePosts = Number(activeCountRows?.[0]?.count ?? 0);
  const boostsThisMonth = Number(boostCountRows?.[0]?.count ?? 0);
  const totalPostQuota = limits.monthlyPosts + paidPostCredits;
  const totalActiveQuota = limits.activePosts + paidPostCredits;
  const totalBoostQuota = limits.monthlyBoosts + paidBoostCredits;
  const remainingPosts = Math.max(totalPostQuota - postsThisMonth, 0);
  const remainingActive = Math.max(totalActiveQuota - activePosts, 0);
  const remainingBoosts = Math.max(totalBoostQuota - boostsThisMonth, 0);

  return {
    postsThisMonth,
    activePosts,
    boostsThisMonth,
    paidPostCredits,
    paidBoostCredits,
    remainingPosts,
    remainingActive,
    remainingBoosts,
    canPost: remainingPosts > 0 && remainingActive > 0,
  };
}

async function consumePaidPostCredit(userId: string) {
  const rows = await queryD1<{ id: string }>(
    `SELECT id
     FROM recruitment_orders
     WHERE user_id = ?
       AND status = 'paid'
       AND order_type = 'post_package'
       AND quantity_used < quantity_total
       AND (expires_at IS NULL OR expires_at > unixepoch())
     ORDER BY paid_at ASC, created_at ASC
     LIMIT 1`,
    [userId]
  );

  const order = rows?.[0];
  if (!order) return false;

  await queryD1(
    `UPDATE recruitment_orders
     SET quantity_used = quantity_used + 1
     WHERE id = ?`,
    [order.id]
  );

  return true;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mine = searchParams.get("mine") === "1";
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "30", 10), 1), 50);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

  if (!hasD1Env()) {
    if (mine) {
      const session = await auth();
      if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const role = (session.user as any)?.role ?? "free";
      const limits = getRecruitmentLimits(role);
      return NextResponse.json({
        jobs: [],
        usage: {
          postsThisMonth: 0,
          activePosts: 0,
          boostsThisMonth: 0,
          paidPostCredits: 0,
          paidBoostCredits: 0,
          remainingPosts: limits.monthlyPosts,
          remainingActive: limits.activePosts,
          remainingBoosts: limits.monthlyBoosts,
          canPost: true,
        },
        source: "empty-local",
        warning: "D1 env is not configured",
      });
    }

    const jobs = getFallbackJobs();
    return NextResponse.json({ jobs: jobs.slice(offset, offset + limit), total: jobs.length, limit, offset, source: "fallback" });
  }

  try {
    if (mine) {
      const session = await auth();
      const userId = (session?.user as any)?.id;
      if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      const rows = await queryD1(
        `SELECT *
         FROM job_posts
         WHERE employer_user_id = ?
         ORDER BY created_at DESC
         LIMIT ${limit} OFFSET ${offset}`,
        [userId]
      );
      const usage = await getRecruitmentUsage(userId, (session?.user as any)?.role ?? "free");

      return NextResponse.json({
        jobs: rows.map(normalizeJobPost),
        total: rows.length,
        usage,
        limit,
        offset,
        source: "d1",
      });
    }

    const rows = await queryD1(
      `SELECT *
       FROM job_posts
       WHERE status = 'published'
         AND (expires_at IS NULL OR expires_at > unixepoch())
       ORDER BY CASE WHEN boost_until IS NOT NULL AND boost_until > unixepoch() THEN 0 ELSE 1 END,
         created_at DESC
       LIMIT ${limit} OFFSET ${offset}`
    );

    return NextResponse.json({
      jobs: rows.map(normalizeJobPost),
      total: rows.length,
      limit,
      offset,
      source: "d1",
    });
  } catch (e: any) {
    if (mine) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }

    const jobs = getFallbackJobs();
    return NextResponse.json({ jobs: jobs.slice(offset, offset + limit), total: jobs.length, limit, offset, source: "fallback", warning: e.message });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  const role = (session?.user as any)?.role ?? "free";

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasD1Env()) {
    return NextResponse.json({ error: "Chưa cấu hình D1 nên chưa thể lưu tin thật." }, { status: 503 });
  }

  const body = await req.json();
  const title = sanitizeText(body.title);
  const position = sanitizeText(body.position, title);
  const employerDisplayName = sanitizeText(body.employerDisplayName);
  const employerType = parseEmployerType(body.employerType);
  const city = sanitizeText(body.city);
  const district = sanitizeText(body.district);
  const salaryText = sanitizeText(body.salaryText, "Thỏa thuận");
  const description = sanitizeText(body.description);
  const contactName = sanitizeText(body.contactName, employerDisplayName);
  const contactPhone = sanitizeText(body.contactPhone);
  const contactEmail = sanitizeText(body.contactEmail);
  const workType = parseWorkType(body.workType);
  const experienceLevel = sanitizeText(body.experienceLevel);
  const benefits = sanitizeText(body.benefits);

  if (!title || !position || !employerDisplayName || !city || !description || !contactName) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc: vị trí, đơn vị tuyển, khu vực, mô tả hoặc liên hệ." }, { status: 400 });
  }

  const usage = await getRecruitmentUsage(userId, role);
  if (!usage.canPost) {
    return NextResponse.json({ error: "Đã hết quota đăng tin. Vui lòng mua gói đăng thêm hoặc gói tuyển nhiều.", usage }, { status: 402 });
  }

  const limits = getRecruitmentLimits(role);
  const usingPaidCredit = usage.postsThisMonth >= limits.monthlyPosts;
  const now = unixNow();
  const id = randomRecruitmentId();
  const expiresAt = now + 30 * 24 * 60 * 60;

  await queryD1(
    `INSERT INTO job_posts (
      id,
      employer_user_id,
      employer_display_name,
      employer_type,
      title,
      position,
      description,
      city,
      district,
      salary_text,
      work_type,
      experience_level,
      benefits,
      contact_name,
      contact_phone,
      contact_email,
      status,
      plan_code,
      published_at,
      expires_at,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?, ?)`,
    [
      id,
      userId,
      employerDisplayName,
      employerType,
      title,
      position,
      description,
      city,
      district,
      salaryText,
      workType,
      experienceLevel,
      benefits,
      contactName,
      contactPhone,
      contactEmail,
      usingPaidCredit ? "starter" : "free",
      now,
      expiresAt,
      now,
    ]
  );

  if (usingPaidCredit) {
    await consumePaidPostCredit(userId);
  }

  const rows = await queryD1(`SELECT * FROM job_posts WHERE id = ? LIMIT 1`, [id]);
  const nextUsage = await getRecruitmentUsage(userId, role);

  return NextResponse.json({ job: normalizeJobPost(rows[0]), usage: nextUsage }, { status: 201 });
}
