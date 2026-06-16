import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

function hasD1Env() {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.CLOUDFLARE_D1_DATABASE_ID &&
    process.env.CLOUDFLARE_D1_TOKEN
  );
}

async function d1Query(sql: string, params: any[]) {
  if (!hasD1Env()) {
    throw new Error("Thiếu cấu hình D1 env cho tài khoản.");
  }

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
  if (!res.ok || !data.success) {
    throw new Error(data.errors?.[0]?.message || "D1 không trả về dữ liệu hợp lệ.");
  }
  return data.result?.[0];
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Bạn cần đăng nhập để xem tài khoản." }, { status: 401 });
  }
  try {
    const result = await d1Query(
      "SELECT id, name, email, role, ai_credits, created_at FROM users WHERE id = ?",
      [session.user.id]
    );
    const user = result?.results?.[0] ?? null;
    if (!user) {
      return NextResponse.json(
        { error: "Chưa tìm thấy hồ sơ tài khoản trong database.", user: null },
        { status: 404 }
      );
    }
    return NextResponse.json({ user });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Không thể tải hồ sơ tài khoản." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Bạn cần đăng nhập để cập nhật tài khoản." }, { status: 401 });
  }
  const { name } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Tên không được để trống" }, { status: 400 });
  }
  try {
    await d1Query(
      "UPDATE users SET name = ? WHERE id = ?",
      [name.trim(), session.user.id]
    );
    return NextResponse.json({ success: true, name: name.trim() });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Không thể cập nhật tài khoản." }, { status: 500 });
  }
}
