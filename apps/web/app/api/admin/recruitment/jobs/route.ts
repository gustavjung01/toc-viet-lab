import { NextRequest, NextResponse } from "next/server";
import { readAdminAccess } from "@/lib/admin-permission";
import { buildServerApiUrl, hasServerApiBaseUrl } from "@/lib/server-api";

function adminHeaders(access: Awaited<ReturnType<typeof readAdminAccess>>) {
  const headers = new Headers();
  headers.set("content-type", "application/json");
  headers.set("x-tocviet-source", "vercel-next-proxy");
  if (process.env.INTERNAL_API_SECRET) headers.set("x-internal-api-secret", process.env.INTERNAL_API_SECRET);
  if (access.user?.id) headers.set("x-tocviet-admin-user-id", String(access.user.id));
  if (access.user?.email) headers.set("x-tocviet-admin-email", String(access.user.email));
  return headers;
}

export async function GET(req: NextRequest) {
  const access = await readAdminAccess();
  if (!access.ok) return NextResponse.json({ error: access.reason }, { status: access.status });
  if (!hasServerApiBaseUrl()) return NextResponse.json({ error: "SERVER_API_BASE_URL chưa cấu hình." }, { status: 503 });

  const sourceUrl = new URL(req.url);
  const target = new URL(buildServerApiUrl("/admin/recruitment/jobs"));
  sourceUrl.searchParams.forEach((value, key) => target.searchParams.set(key, value));

  const response = await fetch(target.toString(), {
    method: "GET",
    headers: adminHeaders(access),
    cache: "no-store",
  });
  const text = await response.text();
  return new NextResponse(text, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
      "x-tocviet-api-source": "vps",
    },
  });
}
