import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "12", 10), 1), 50);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

  let sql = "SELECT * FROM articles WHERE published = 1";
  let countSql = "SELECT COUNT(*) as total FROM articles WHERE published = 1";
  const params: string[] = [];
  const countParams: string[] = [];

  if (category && category !== "Tất cả") {
    sql += " AND category = ?";
    countSql += " AND category = ?";
    params.push(category);
    countParams.push(category);
  }

  if (q) {
    sql += " AND (title LIKE ? OR excerpt LIKE ?)";
    countSql += " AND (title LIKE ? OR excerpt LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
    countParams.push(`%${q}%`, `%${q}%`);
  }

  sql += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

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

    // Count total
    const countRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: countSql, params: countParams }),
        cache: "no-store",
      }
    );
    const countData = await countRes.json();
    const total = countData.success ? (countData.result?.[0]?.results?.[0]?.total ?? 0) : 0;

    return NextResponse.json({ articles: data.result[0].results, total, limit, offset });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
