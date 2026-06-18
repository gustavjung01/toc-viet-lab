import type http from "node:http";
import { getDatabasePool } from "./db";
import { normalizeRecruitmentJob, unixNow } from "./recruitment";

export type AdminRecruitmentError = {
  statusCode: number;
  code: string;
  message: string;
};

export type AdminRecruitmentAction = "publish" | "reject" | "close" | "expire" | "boost";

function readHeader(headers: http.IncomingHttpHeaders, keys: string[]) {
  for (const key of keys) {
    const value = headers[key];
    if (Array.isArray(value)) {
      const first = value.find((item) => String(item).trim().length > 0);
      if (first) return String(first).trim();
      continue;
    }
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return "";
}

export function adminRecruitmentHeaders() {
  return { "x-tocviet-api-source": "vps-postgres" };
}

export function parseRecruitmentAdminActor(headers: http.IncomingHttpHeaders): { userId: string; email: string } | AdminRecruitmentError {
  const configuredSecret = process.env.INTERNAL_API_SECRET?.trim() ?? "";
  if (!configuredSecret) {
    return { statusCode: 503, code: "internal_secret_not_configured", message: "INTERNAL_API_SECRET is not configured." };
  }

  const source = readHeader(headers, ["x-tocviet-source"]);
  if (source && source !== "vercel-next-proxy") {
    return { statusCode: 403, code: "invalid_source", message: "Admin requests must come through the Vercel proxy." };
  }

  const suppliedSecret = readHeader(headers, ["x-internal-api-secret"]);
  const authorization = readHeader(headers, ["authorization"]);
  const bearerToken = authorization.replace(/^Bearer\s+/i, "");
  if ((suppliedSecret || bearerToken) !== configuredSecret) {
    return { statusCode: 401, code: "invalid_internal_secret", message: "Missing or invalid internal secret." };
  }

  const userId = readHeader(headers, ["x-tocviet-admin-user-id", "x-tocviet-user-id", "x-user-id"]);
  if (!userId) {
    return { statusCode: 401, code: "missing_admin_context", message: "Missing admin user context." };
  }

  return {
    userId,
    email: readHeader(headers, ["x-tocviet-admin-email", "x-tocviet-user-email", "x-user-email"]),
  };
}

export function parseAdminRecruitmentAction(raw: unknown): AdminRecruitmentAction | AdminRecruitmentError {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { statusCode: 400, code: "invalid_body", message: "Request body must be a JSON object." };
  }

  const action = String((raw as Record<string, unknown>).action || "").trim();
  if (action === "publish" || action === "reject" || action === "close" || action === "expire" || action === "boost") {
    return action;
  }

  return { statusCode: 400, code: "invalid_action", message: "Action must be publish, reject, close, expire, or boost." };
}

export async function getAdminRecruitmentJobsPage(limit: number, offset: number, filters: { status?: string; q?: string } = {}) {
  const pool = getDatabasePool();
  const values: Array<string | number> = [];
  const where: string[] = [];

  if (filters.status && filters.status !== "all") {
    values.push(filters.status);
    where.push(`status = $${values.length}`);
  }

  if (filters.q) {
    values.push(`%${filters.q}%`);
    where.push(`(title ILIKE $${values.length} OR employer_display_name ILIKE $${values.length} OR city ILIKE $${values.length})`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const totalResult = await pool.query<{ count: string }>(`SELECT COUNT(*)::bigint AS count FROM tocviet.job_posts ${whereSql}`, values);

  values.push(limit, offset);
  const jobsResult = await pool.query<Record<string, unknown>>(
    `SELECT * FROM tocviet.job_posts
     ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  );

  return {
    jobs: jobsResult.rows.map(normalizeRecruitmentJob),
    total: Number(totalResult.rows[0]?.count ?? 0),
    limit,
    offset,
  };
}

export async function applyAdminRecruitmentAction(jobId: string, action: AdminRecruitmentAction) {
  const pool = getDatabasePool();
  const now = unixNow();
  const boostUntil = now + 7 * 24 * 60 * 60;
  const defaultExpiresAt = now + 30 * 24 * 60 * 60;

  const statusByAction: Partial<Record<AdminRecruitmentAction, string>> = {
    publish: "published",
    reject: "rejected",
    close: "closed",
    expire: "expired",
  };

  let result;
  if (action === "boost") {
    result = await pool.query<Record<string, unknown>>(
      `UPDATE tocviet.job_posts
       SET boost_until = $2, status = CASE WHEN status = 'draft' THEN 'published' ELSE status END,
           published_at = COALESCE(published_at, $3),
           expires_at = CASE WHEN expires_at IS NULL OR expires_at < $3 THEN $4 ELSE expires_at END
       WHERE id = $1
       RETURNING *`,
      [jobId, boostUntil, now, defaultExpiresAt]
    );
  } else {
    result = await pool.query<Record<string, unknown>>(
      `UPDATE tocviet.job_posts
       SET status = $2,
           published_at = CASE WHEN $2 = 'published' THEN COALESCE(published_at, $3) ELSE published_at END,
           expires_at = CASE WHEN $2 = 'published' AND (expires_at IS NULL OR expires_at < $3) THEN $4 ELSE expires_at END
       WHERE id = $1
       RETURNING *`,
      [jobId, statusByAction[action], now, defaultExpiresAt]
    );
  }

  if (!result.rows[0]) {
    return { statusCode: 404, code: "job_not_found", message: "Recruitment job not found." } satisfies AdminRecruitmentError;
  }

  return normalizeRecruitmentJob(result.rows[0]);
}
