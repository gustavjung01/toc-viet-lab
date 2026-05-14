import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

function randomId() {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

async function d1Query(sql: string, params: any[]) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    }
  );
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result[0];
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await d1Query(
      "SELECT * FROM ai_usage_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 50",
      [session.user.id]
    );
    const credits = await d1Query(
      "SELECT ai_credits FROM users WHERE id = ?",
      [session.user.id]
    );
    return NextResponse.json({
      logs: result.results,
      credits: credits.results[0]?.ai_credits ?? 0,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { tool, prompt, result, creditsUsed = 1 } = await req.json();
  if (!tool) {
    return NextResponse.json({ error: "tool is required" }, { status: 400 });
  }
  try {
    const userRow = await d1Query(
      "SELECT ai_credits FROM users WHERE id = ?",
      [session.user.id]
    );
    const currentCredits = userRow.results[0]?.ai_credits ?? 0;
    if (currentCredits < creditsUsed) {
      return NextResponse.json({ error: "Không đủ credit AI" }, { status: 402 });
    }
    await d1Query(
      "UPDATE users SET ai_credits = ai_credits - ? WHERE id = ?",
      [creditsUsed, session.user.id]
    );
    const id = randomId();
    await d1Query(
      "INSERT INTO ai_usage_logs (id, user_id, tool, credits_used, prompt, result) VALUES (?, ?, ?, ?, ?, ?)",
      [id, session.user.id, tool, creditsUsed, prompt ?? "", result ?? ""]
    );
    return NextResponse.json({
      id,
      remainingCredits: currentCredits - creditsUsed,
    }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
