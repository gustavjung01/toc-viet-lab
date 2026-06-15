import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasD1Env, queryD1 } from "@/lib/d1-http";
import { getRecruitmentLimits } from "@/lib/recruitment";
import { normalizeJobPost, unixNow } from "@/lib/recruitment-jobs";

async function getPaidBoostCredits(userId: string) {
  const rows = await queryD1<{ credits: number }>(
    `SELECT COALESCE(SUM(quantity_total - quantity_used), 0) as credits
     FROM recruitment_orders
     WHERE user_id = ?
       AND status = 'paid'
       AND order_type = 'boost_package'
       AND quantity_used < quantity_total
       AND (expires_at IS NULL OR expires_at > unixepoch())`,
    [userId]
  );

  return Number(rows?.[0]?.credits ?? 0);
}

async function getBoostsThisMonth(userId: string) {
  const now = new Date();
  const monthStart = Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000);
  const rows = await queryD1<{ count: number }>(
    `SELECT COUNT(*) as count
     FROM job_posts
     WHERE employer_user_id = ?
       AND boost_until IS NOT NULL
       AND boost_until >= ?`,
    [userId, monthStart]
  );

  return Number(rows?.[0]?.count ?? 0);
}

async function consumePaidBoostCredit(userId: string) {
  const rows = await queryD1<{ id: string }>(
    `SELECT id
     FROM recruitment_orders
     WHERE user_id = ?
       AND status = 'paid'
       AND order_type = 'boost_package'
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  const role = (session?.user as any)?.role ?? "free";
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasD1Env()) return NextResponse.json({ error: "Chưa cấu hình D1 nên chưa thể cập nhật tin." }, { status: 503 });

  const { id } = await params;
  const body = await req.json();
  const action = body.action;

  const ownerRows = await queryD1<{ id: string; status: string }>(
    `SELECT id, status FROM job_posts WHERE id = ? AND employer_user_id = ? LIMIT 1`,
    [id, userId]
  );

  if (!ownerRows?.[0]) return NextResponse.json({ error: "Không tìm thấy tin tuyển dụng của bạn." }, { status: 404 });

  if (action === "close") {
    await queryD1(
      `UPDATE job_posts SET status = 'closed' WHERE id = ? AND employer_user_id = ?`,
      [id, userId]
    );
  } else if (action === "publish") {
    await queryD1(
      `UPDATE job_posts SET status = 'published' WHERE id = ? AND employer_user_id = ?`,
      [id, userId]
    );
  } else if (action === "boost") {
    const limits = getRecruitmentLimits(role);
    const boostsThisMonth = await getBoostsThisMonth(userId);
    const paidBoostCredits = await getPaidBoostCredits(userId);
    const remainingBoosts = Math.max(limits.monthlyBoosts + paidBoostCredits - boostsThisMonth, 0);

    if (remainingBoosts <= 0) {
      return NextResponse.json({ error: "Đã hết lượt đẩy tin. Vui lòng mua gói Đẩy tin nổi bật." }, { status: 402 });
    }

    const usePaidCredit = boostsThisMonth >= limits.monthlyBoosts;
    await queryD1(
      `UPDATE job_posts
       SET boost_until = ?, status = 'published'
       WHERE id = ? AND employer_user_id = ?`,
      [unixNow() + 7 * 24 * 60 * 60, id, userId]
    );

    if (usePaidCredit) {
      await consumePaidBoostCredit(userId);
    }
  } else {
    return NextResponse.json({ error: "Action không hợp lệ." }, { status: 400 });
  }

  const rows = await queryD1(`SELECT * FROM job_posts WHERE id = ? LIMIT 1`, [id]);
  return NextResponse.json({ job: normalizeJobPost(rows[0]) });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasD1Env()) return NextResponse.json({ error: "Chưa cấu hình D1 nên chưa thể xóa tin." }, { status: 503 });

  const { id } = await params;
  await queryD1(`DELETE FROM job_posts WHERE id = ? AND employer_user_id = ?`, [id, userId]);
  return NextResponse.json({ success: true });
}
