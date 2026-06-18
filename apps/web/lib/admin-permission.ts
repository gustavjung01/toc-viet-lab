import { auth } from "@/auth";

const STAFF_ROLES = new Set(["admin", "owner"]);

function cleanEmail(value?: string | null) {
  return String(value || "").trim().toLowerCase();
}

export function adminEmailList() {
  return String(process.env.ADMIN_ALLOWED_EMAILS || process.env.TOCVIET_ADMIN_EMAILS || "")
    .split(",")
    .map(cleanEmail)
    .filter(Boolean);
}

export async function readAdminAccess() {
  const session = await auth();
  const user = session?.user as any;

  if (!user?.email && !user?.id) {
    return { ok: false, status: 401 as const, reason: "Bạn cần đăng nhập để vào admin.", user: null };
  }

  const role = String(user?.role || "free").toLowerCase();
  const email = cleanEmail(user?.email);
  const allowedByRole = STAFF_ROLES.has(role);
  const allowedByEmail = email && adminEmailList().includes(email);

  if (!allowedByRole && !allowedByEmail) {
    return {
      ok: false,
      status: 403 as const,
      reason: "Tài khoản này chưa có quyền admin.",
      user: { id: user?.id, name: user?.name, email: user?.email, role },
    };
  }

  return {
    ok: true,
    status: 200 as const,
    reason: "ok",
    user: { id: user?.id, name: user?.name, email: user?.email, role },
  };
}
