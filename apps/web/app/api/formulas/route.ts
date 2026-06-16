import { NextRequest, NextResponse } from "next/server";
import { filterFallbackFormulas, normalizeFormula } from "@/lib/formulas";

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const q = searchParams.get("q");
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "50", 10), 1), 50);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

  if (!hasD1Env()) {
    const fallback = filterFallbackFormulas({ q, tag, limit, offset });
    return NextResponse.json({ ...fallback, limit, offset, source: "fallback" });
  }

  let sql = `SELECT
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
  WHERE published = 1`;
  let countSql = "SELECT COUNT(*) as total FROM formulas WHERE published = 1";
  const params: Array<string | number> = [];
  const countParams: Array<string | number> = [];

  if (tag && tag !== "Tất cả") {
    sql += " AND tag = ?";
    countSql += " AND tag = ?";
    params.push(tag);
    countParams.push(tag);
  }

  if (q) {
    sql += " AND (title LIKE ? OR excerpt LIKE ? OR tag LIKE ? OR base LIKE ? OR note LIKE ?)";
    countSql += " AND (title LIKE ? OR excerpt LIKE ? OR tag LIKE ? OR base LIKE ? OR note LIKE ?)";
    const needle = `%${q}%`;
    params.push(needle, needle, needle, needle, needle);
    countParams.push(needle, needle, needle, needle, needle);
  }

  sql += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

  try {
    const rows = await queryD1(sql, params);
    const countRows = await queryD1(countSql, countParams);
    const total = Number(countRows?.[0]?.total ?? rows.length);

    return NextResponse.json({
      formulas: rows.map(normalizeFormula),
      total,
      limit,
      offset,
      source: "d1",
    });
  } catch (e: any) {
    const fallback = filterFallbackFormulas({ q, tag, limit, offset });
    return NextResponse.json({
      ...fallback,
      limit,
      offset,
      source: "fallback",
      warning: e.message,
    });
  }
}
