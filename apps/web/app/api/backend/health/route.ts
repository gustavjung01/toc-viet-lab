import { NextResponse } from "next/server";
import { buildServerApiUrl, hasServerApiBaseUrl } from "@/lib/server-api";

const VPS_SOURCE_HEADER = { "x-tocviet-api-source": "vps" };

export async function GET() {
  if (!hasServerApiBaseUrl()) {
    return NextResponse.json({
      ok: false,
      source: "vercel-next",
      status: "not-configured",
      message: "SERVER_API_BASE_URL hoặc NEXT_PUBLIC_API_BASE_URL chưa được cấu hình.",
    }, { status: 503 });
  }

  try {
    const response = await fetch(buildServerApiUrl("/health"), { cache: "no-store" });
    const text = await response.text();
    let body: unknown = text;
    try {
      body = JSON.parse(text);
    } catch {}

    return NextResponse.json({
      ok: response.ok,
      source: "vps",
      status: response.status,
      body,
    }, {
      status: response.ok ? 200 : 502,
      headers: VPS_SOURCE_HEADER,
    });
  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      source: "vps",
      status: "unreachable",
      message: e?.message || "Không thể kết nối backend VPS.",
    }, { status: 502 });
  }
}
