import { NextRequest, NextResponse } from "next/server";
import { getFallbackFormulaBySlug, normalizeFormula } from "@/lib/formulas";

const API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`;

function hasD1Env() {
  return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_D1_DATABASE_ID && process.env.CLOUDFLARE_D1_TOKEN);
}

function d1Headers() {
  return {
    Authorization: "Bearer " + process.env.CLOUDFLARE_D1_TOKEN,
    "Content-Type": "application/json",
  };
}

async function queryD1(sql: string, params: Array<string | number> = []) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: d1Headers(),
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result?.[0]?.results ?? [];
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!hasD1Env()) {
    const formula = getFallbackFormulaBySlug(slug);
    return formula
      ? NextResponse.json({ formula, source: "fallback" })
      : NextResponse.json({ formula: null, source: "fallback" }, { status: 404 });
  }

  try {
    const rows = await queryD1(
      `SELECT
        id,
        slug,
        title,
        excerpt,
        content,
        tag,
        base,
        developer,
        ratio,
        note,
        image_key as imageKey,
        difficulty,
        read_time as readTime,
        published,
        created_at as createdAt
      FROM formulas
      WHERE slug = ? AND published = 1
      LIMIT 1`,
      [slug]
    );

    const formula = rows?.[0] ? normalizeFormula(rows[0]) : null;
    if (!formula) {
      return NextResponse.json({ formula: null, source: "d1" }, { status: 404 });
    }

    return NextResponse.json({ formula, source: "d1" });
  } catch (e: any) {
    const formula = getFallbackFormulaBySlug(slug);
    return formula
      ? NextResponse.json({ formula, source: "fallback", warning: e.message })
      : NextResponse.json({ formula: null, source: "fallback", warning: e.message }, { status: 404 });
  }
}
