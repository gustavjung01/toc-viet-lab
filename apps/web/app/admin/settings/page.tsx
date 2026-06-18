import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { readAdminAccess, adminEmailList } from "@/lib/admin-permission";

export default async function AdminSettingsPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;
  const emails = adminEmailList();

  return (
    <AdminShell>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Settings</p>
        <h2 className="mt-3 text-3xl font-black text-white">Cài đặt admin</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">Admin MVP đang dùng role admin/owner hoặc danh sách email từ biến môi trường.</p>
      </section>
      <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h3 className="font-black text-white">ADMIN_ALLOWED_EMAILS</h3>
        <p className="mt-2 text-sm font-semibold leading-7 text-white/60">
          {emails.length > 0 ? `${emails.length} email đang được cấu hình.` : "Chưa có email admin trong env. Có thể dùng role admin/owner nếu session có role."}
        </p>
      </section>
    </AdminShell>
  );
}
