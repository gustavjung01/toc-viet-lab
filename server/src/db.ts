import { Pool } from "pg";
import { normalizeRecruitmentJob, unixNow, type RecruitmentJobPost } from "./recruitment";

type RecruitmentJobRow = Record<string, unknown>;

const DATABASE_URL = process.env.DATABASE_URL?.trim() ?? "";
let pool: Pool | null = null;

export function hasDatabaseUrl() {
  return DATABASE_URL.length > 0;
}

export function getDatabasePool() {
  if (!pool) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      application_name: "tocviet-api",
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    });
  }

  return pool;
}

export type RecruitmentJobsPage = {
  jobs: RecruitmentJobPost[];
  total: number;
  limit: number;
  offset: number;
};

type RecruitmentJobsPageOptions = {
  employerUserId?: string;
};

const recruitmentJobSelect = `SELECT
  id,
  employer_user_id,
  employer_display_name,
  employer_type,
  title,
  position,
  description,
  city,
  district,
  address,
  salary_min,
  salary_max,
  salary_text,
  work_type,
  experience_level,
  benefits,
  contact_name,
  contact_phone,
  contact_email,
  status,
  plan_code,
  boost_until,
  published_at,
  expires_at,
  created_at,
  tags
 FROM tocviet.job_posts`;

export async function getRecruitmentJobsPage(
  limit: number,
  offset: number,
  options: RecruitmentJobsPageOptions = {}
): Promise<RecruitmentJobsPage> {
  if (!hasDatabaseUrl()) {
    throw new Error("DATABASE_URL is not configured for the Toc Viet VPS backend.");
  }

  const pool = getDatabasePool();
  const now = unixNow();

  if (options.employerUserId) {
    const [totalResult, jobsResult] = await Promise.all([
      pool.query<{ count: string }>(
        `SELECT COUNT(*)::bigint AS count
         FROM tocviet.job_posts
         WHERE employer_user_id = $1`,
        [options.employerUserId]
      ),
      pool.query<RecruitmentJobRow>(
        `${recruitmentJobSelect}
         WHERE employer_user_id = $3
         ORDER BY CASE WHEN status = 'published' AND (expires_at IS NULL OR expires_at > $4) THEN 0 ELSE 1 END,
           created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset, options.employerUserId, now]
      ),
    ]);

    return {
      jobs: jobsResult.rows.map(normalizeRecruitmentJob),
      total: Number(totalResult.rows[0]?.count ?? 0),
      limit,
      offset,
    };
  }

  const countFilter = "WHERE status = 'published' AND (expires_at IS NULL OR expires_at > $1)";
  const jobsFilter = "WHERE status = 'published' AND (expires_at IS NULL OR expires_at > $3)";

  const [totalResult, jobsResult] = await Promise.all([
    pool.query<{ count: string }>(
      `SELECT COUNT(*)::bigint AS count
       FROM tocviet.job_posts
       ${countFilter}`,
      [now]
    ),
    pool.query<RecruitmentJobRow>(
      `${recruitmentJobSelect}
       ${jobsFilter}
       ORDER BY CASE WHEN boost_until IS NOT NULL AND boost_until > $3 THEN 0 ELSE 1 END,
         created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset, now]
    ),
  ]);

  return {
    jobs: jobsResult.rows.map(normalizeRecruitmentJob),
    total: Number(totalResult.rows[0]?.count ?? 0),
    limit,
    offset,
  };
}
