import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

function randomId() {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
          sql: "SELECT * FROM user_formulas WHERE user_id = ? ORDER BY created_at DESC",
          params: [session.user.id],
        }),
      }
    );
    const data = await res.json();
    if (!data.success) throw new Error(JSON.stringify(data.errors));
    return NextResponse.json({ formulas: data.result[0].results });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, tag, base, developer, ratio, note } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Tên công thức không được để trống" }, { status: 400 });
  }

  const id = randomId();
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
          sql: `INSERT INTO user_formulas (id, user_id, title, tag, base, developer, ratio, note)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          params: [id, session.user.id, title, tag ?? "", base ?? "", developer ?? "", ratio ?? "", note ?? ""],
        }),
      }
    );
    const data = await res.json();
    if (!data.success) throw new Error(JSON.stringify(data.errors));
    return NextResponse.json({ id, title, tag, base, developer, ratio, note }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
