import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { proxyToServerApi } from "@/lib/server-api";

async function getSessionHeaders() {
  const session = await auth();
  const user = session?.user as any;
  const headers: Record<string, string> = {};

  if (user?.id) headers["x-tocviet-user-id"] = String(user.id);
  if (user?.role) headers["x-tocviet-user-role"] = String(user.role);
  if (user?.name) headers["x-tocviet-user-display-name"] = String(user.name);
  if (user?.email) headers["x-tocviet-user-email"] = String(user.email);

  return headers;
}

async function callJobs(req: NextRequest) {
  const sessionHeaders = await getSessionHeaders();
  const response = await proxyToServerApi(req, "/recruitment/jobs", { headers: sessionHeaders });
  if (response) return response;

  return NextResponse.json({
    error: "Backend VPS chưa được cấu hình.",
    expectedEnv: "SERVER_API_BASE_URL hoặc NEXT_PUBLIC_API_BASE_URL",
    legacyRoute: "/api/recruitment/jobs",
  }, { status: 503 });
}

export async function GET(req: NextRequest) {
  try {
    return await callJobs(req);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Không thể gọi backend VPS." }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await callJobs(req);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Không thể gọi backend VPS." }, { status: 502 });
  }
}
