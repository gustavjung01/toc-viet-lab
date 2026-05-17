import { NextResponse } from "next/server";

export async function GET() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_D1_TOKEN;

  if (!accountId || !databaseId || !token) {
    return NextResponse.json({ error: "Missing Cloudflare env vars" }, { status: 500 });
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  try {
    const [totalRes, catRes] = await Promise.all([
      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ sql: "SELECT COUNT(*) as total FROM cases WHERE published = 1", params: [] }),
        cache: "no-store",
      }),
      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ sql: "SELECT category, COUNT(*) as count FROM cases WHERE published = 1 GROUP BY category ORDER BY count DESC", params: [] }),
        cache: "no-store",
      }),
    ]);

    const [totalData, catData] = await Promise.all([totalRes.json(), catRes.json()]);

    if (!totalData.success) throw new Error(JSON.stringify(totalData.errors));
    if (!catData.success) throw new Error(JSON.stringify(catData.errors));

    const total: number = totalData.result?.[0]?.results?.[0]?.total ?? 0;
    const byCategory: Record<string, number> = {};
    for (const row of catData.result?.[0]?.results ?? []) {
      byCategory[row.category ?? "(none)"] = row.count;
    }

    return NextResponse.json({ total, byCategory });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
