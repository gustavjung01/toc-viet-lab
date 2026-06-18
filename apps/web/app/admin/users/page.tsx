import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { readAdminAccess } from "@/lib/admin-permission";
import { hasD1Env, queryD1 } from "@/lib/d1-http";

type UserRow = {
  id: string;
  name: string | null;
  role: string | null;
  ai_credits: number | null;
};

async function getRows() {
  if (!hasD1Env()) return { rows: [] as UserRow[], error: "D1 env chưa cấu hình." };
  try {
    const rows = await queryD1<UserRow>("SELECT id, name, role, ai_credits FROM users LIMIT 80");
    return { rows, error: "" };
  } catch (error: any) {
    return { rows: [] as UserRow[], error: error?.message || "Không đọc được users." };
  }
}

export default async function AdminUsersPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;
  const { rows, error } = await getRows();

  return (
    <AdminShell>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Users</p>
        <h2 className="mt-3 text-3xl font-black text-white">Tài khoản</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">MVP read-only.</p>
      </section>
      {error && <div className="mt-5 rounded-3xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">{error}</div>}
      <section className="mt-6 grid gap-3">
        {rows.map((user) => (
          <div key={user.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-black text-white">{user.name || "Chưa có tên"}</p>
                <p className="mt-1 text-xs font-semibold text-white/45">{user.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-black text-[#F0C76A]">{user.role || "free"}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white">AI {Number(user.ai_credits ?? 0)}</span>
              </div>
            </div>
          </div>
        ))}
        {rows.length === 0 && !error && <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/55">Chưa có users.</div>}
      </section>
    </AdminShell>
  );
}
