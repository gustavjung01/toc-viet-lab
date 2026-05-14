import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  let sql = "SELECT * FROM articles WHERE published = 1";
  const params: string[] = [];

  if (category && category !== "Tất cả") {
    sql += " AND category = ?";
    params.push(category);
  }

  if (q) {
    sql += params.length > 0
      ? " AND (title LIKE ? OR excerpt LIKE ?)"
      : " AND (title LIKE ? OR excerpt LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  sql += " ORDER BY created_at DESC";

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
    return NextResponse.json({ articles: data.result[0].results });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
