import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { readAdminAccess } from "@/lib/admin-permission";

export default async function AdminReportsPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;

  return (
    <AdminShell>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Reports</p>
        <h2 className="mt-3 text-3xl font-black text-white">Báo cáo</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">Khu này để dành cho lượt dùng AI, đăng tuyển, traffic và doanh thu sau này.</p>
      </section>
    </AdminShell>
  );
}
