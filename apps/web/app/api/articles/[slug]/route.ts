import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sql: "SELECT * FROM articles WHERE slug = ? AND published = 1 LIMIT 1",
          params: [slug],
        }),
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (!data.success) {
      throw new Error(JSON.stringify(data.errors));
    }

    const article = data.result?.[0]?.results?.[0] ?? null;
    if (!article) {
      return NextResponse.json({ article: null }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, article: null }, { status: 500 });
  }
}
