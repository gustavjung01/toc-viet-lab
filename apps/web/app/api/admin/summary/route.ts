import { NextResponse } from "next/server";
import { readAdminAccess } from "@/lib/admin-permission";
import { hasD1Env, queryD1 } from "@/lib/d1-http";
import { buildServerApiUrl, hasServerApiBaseUrl } from "@/lib/server-api";

async function safeCount(sql: string) {
  try {
    const rows = await queryD1<{ count: number }>(sql);
    return { value: Number(rows[0]?.count ?? 0), error: "" };
  } catch (error: any) {
    return { value: 0, error: error?.message || "count_failed" };
  }
}

async function recruitmentCount() {
  if (!hasServerApiBaseUrl()) return { value: 0, error: "SERVER_API_BASE_URL missing" };
  try {
    const res = await fetch(`${buildServerApiUrl("/recruitment/jobs")}?limit=1`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "VPS recruitment API failed");
    return { value: Number(data.total ?? 0), error: "" };
  } catch (error: any) {
    return { value: 0, error: error?.message || "recruitment_failed" };
  }
}

export async function GET() {
  const access = await readAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: access.status });
  }

  const warnings: string[] = [];
  let users = { value: 0, error: "" };
  let saved = { value: 0, error: "" };
  let articles = { value: 0, error: "" };

  if (!hasD1Env()) {
    warnings.push("D1 env missing, user/content counts are not available.");
  } else {
    users = await safeCount("SELECT COUNT(*) as count FROM users");
    saved = await safeCount("SELECT COUNT(*) as count FROM saved_items");
    articles = await safeCount("SELECT COUNT(*) as count FROM articles");
  }

  const jobs = await recruitmentCount();
  for (const item of [users, saved, articles, jobs]) {
    if (item.error) warnings.push(item.error);
  }

  return NextResponse.json({
    ok: true,
    user: access.user,
    summary: {
      users: users.value,
      savedItems: saved.value,
      articles: articles.value,
      recruitmentJobs: jobs.value,
    },
    warnings,
  });
}
