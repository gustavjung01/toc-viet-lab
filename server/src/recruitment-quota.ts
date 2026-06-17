import type { Pool, PoolClient } from "pg";

export type RecruitmentUserRole = "free" | "member" | "pro";

export type RecruitmentUsage = {
  postsThisMonth: number;
  activePosts: number;
  boostsThisMonth: number;
  paidPostCredits: number;
  paidBoostCredits: number;
  remainingPosts: number;
  remainingActive: number;
  remainingBoosts: number;
  canPost: boolean;
};

type Queryable = Pick<Pool, "query"> | Pick<PoolClient, "query">;

const ROLE_LIMITS: Record<
  RecruitmentUserRole,
  {
    monthlyPosts: number;
    activePosts: number;
    monthlyBoosts: number;
  }
> = {
  free: { monthlyPosts: 1, activePosts: 1, monthlyBoosts: 0 },
  member: { monthlyPosts: 3, activePosts: 3, monthlyBoosts: 1 },
  pro: { monthlyPosts: 10, activePosts: 10, monthlyBoosts: 3 },
};

function monthStartUnix() {
  const now = new Date();
  return Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000);
}

export function getRecruitmentLimits(role?: string) {
  if (role === "pro" || role === "member" || role === "free") return ROLE_LIMITS[role];
  return ROLE_LIMITS.free;
}

function normalizeCount(value: unknown) {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
}

export async function getRecruitmentUsage(db: Queryable, userId: string, role: string): Promise<RecruitmentUsage> {
  const limits = getRecruitmentLimits(role);
  const now = Math.floor(Date.now() / 1000);
  const monthStart = monthStartUnix();

  const [postCountRows, activeCountRows, boostCountRows, paidPostCreditsRows, paidBoostCreditsRows] = await Promise.all([
    db.query<{ count: string }>(
      `SELECT COUNT(*)::bigint AS count
       FROM tocviet.job_posts
       WHERE employer_user_id = $1
         AND created_at >= $2
         AND status IN ('published', 'closed', 'expired')`,
      [userId, monthStart]
    ),
    db.query<{ count: string }>(
      `SELECT COUNT(*)::bigint AS count
       FROM tocviet.job_posts
       WHERE employer_user_id = $1
         AND status = 'published'
         AND (expires_at IS NULL OR expires_at > $2)`,
      [userId, now]
    ),
    db.query<{ count: string }>(
      `SELECT COUNT(*)::bigint AS count
       FROM tocviet.job_posts
       WHERE employer_user_id = $1
         AND boost_until IS NOT NULL
         AND boost_until >= $2`,
      [userId, monthStart]
    ),
    db.query<{ credits: string }>(
      `SELECT COALESCE(SUM(quantity_total - quantity_used), 0)::bigint AS credits
       FROM tocviet.recruitment_orders
       WHERE user_id = $1
         AND status = 'paid'
         AND order_type = 'post_package'
         AND quantity_used < quantity_total
         AND (expires_at IS NULL OR expires_at > $2)`,
      [userId, now]
    ),
    db.query<{ credits: string }>(
      `SELECT COALESCE(SUM(quantity_total - quantity_used), 0)::bigint AS credits
       FROM tocviet.recruitment_orders
       WHERE user_id = $1
         AND status = 'paid'
         AND order_type = 'boost_package'
         AND quantity_used < quantity_total
         AND (expires_at IS NULL OR expires_at > $2)`,
      [userId, now]
    ),
  ]);

  const postsThisMonth = normalizeCount(postCountRows.rows[0]?.count);
  const activePosts = normalizeCount(activeCountRows.rows[0]?.count);
  const boostsThisMonth = normalizeCount(boostCountRows.rows[0]?.count);
  const paidPostCredits = normalizeCount(paidPostCreditsRows.rows[0]?.credits);
  const paidBoostCredits = normalizeCount(paidBoostCreditsRows.rows[0]?.credits);
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

export async function claimPaidRecruitmentPostCredit(db: Queryable, userId: string) {
  const now = Math.floor(Date.now() / 1000);

  const creditRows = await db.query<{ id: string; package_code: "starter" | "growth" }>(
    `SELECT id, package_code
     FROM tocviet.recruitment_orders
     WHERE user_id = $1
       AND status = 'paid'
       AND order_type = 'post_package'
       AND quantity_used < quantity_total
       AND (expires_at IS NULL OR expires_at > $2)
     ORDER BY COALESCE(paid_at, created_at) ASC, created_at ASC, id ASC
     LIMIT 1
     FOR UPDATE`,
    [userId, now]
  );

  const credit = creditRows.rows[0];
  if (!credit) return null;

  await db.query(
    `UPDATE tocviet.recruitment_orders
     SET quantity_used = quantity_used + 1,
         updated_at = $2
     WHERE id = $1`,
    [credit.id, now]
  );

  return credit;
}
