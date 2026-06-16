import { NextRequest, NextResponse } from "next/server";
import { proxyToServerApi } from "@/lib/server-api";

async function callJobs(req: NextRequest) {
  const response = await proxyToServerApi(req, "/recruitment/jobs");
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
