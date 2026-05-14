import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const sql = category && category !== "Tất cả"
    ? "SELECT * FROM cases WHERE published = 1 AND category = ? ORDER BY created_at DESC"
    : "SELECT * FROM cases WHERE published = 1 ORDER BY created_at DESC";

  const params = category && category !== "Tất cả" ? [category] : [];

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql, params }),
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (!data.success) throw new Error(JSON.stringify(data.errors));
    return NextResponse.json({ cases: data.result[0].results });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
