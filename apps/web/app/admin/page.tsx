import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { AdminStatCard } from "@/components/admin/stat-card";
import { readAdminAccess } from "@/lib/admin-permission";
import { hasD1Env, queryD1 } from "@/lib/d1-http";
import { buildServerApiUrl, hasServerApiBaseUrl } from "@/lib/server-api";

async function countD1(sql: string) {
  try {
    const rows = await queryD1<{ count: number }>(sql);
    return { value: Number(rows[0]?.count ?? 0), error: "" };
  } catch (error: any) {
    return { value: 0, error: error?.message || "Không đọc được D1." };
  }
}

async function countRecruitmentJobs() {
  if (!hasServerApiBaseUrl()) return { value: 0, error: "SERVER_API_BASE_URL chưa cấu hình." };
  try {
    const res = await fetch(`${buildServerApiUrl("/recruitment/jobs")}?limit=1`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Không đọc được VPS recruitment.");
    return { value: Number(data.total ?? 0), error: "" };
  } catch (error: any) {
    return { value: 0, error: error?.message || "Không đọc được VPS recruitment." };
  }
}

export default async function AdminPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;

  const warnings: string[] = [];
  let users = { value: 0, error: "" };
  let saved = { value: 0, error: "" };
  let articles = { value: 0, error: "" };

  if (!hasD1Env()) {
    warnings.push("D1 env chưa đủ nên chưa đọc được users/content.");
  } else {
    users = await countD1("SELECT COUNT(*) as count FROM users");
    saved = await countD1("SELECT COUNT(*) as count FROM saved_items");
    articles = await countD1("SELECT COUNT(*) as count FROM articles");
  }

  const jobs = await countRecruitmentJobs();
  for (const item of [users, saved, articles, jobs]) if (item.error) warnings.push(item.error);

  return (
    <AdminShell>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">MVP read-only</p>
        <h2 className="mt-3 text-3xl font-black text-white">Tổng quan hệ thống</h2>
        <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-white/65">
          Bản admin đầu tiên chỉ đọc dữ liệu. Chưa có nút sửa/xóa/duyệt để tránh chạm nhầm production.
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Users" value={users.value} hint="D1 users" />
        <AdminStatCard label="Bài đã lưu" value={saved.value} hint="D1 saved_items" />
        <AdminStatCard label="Bài kiến thức" value={articles.value} hint="D1 articles" />
        <AdminStatCard label="Tin tuyển dụng" value={jobs.value} hint="VPS Postgres published jobs" />
      </section>

      {warnings.length > 0 && (
        <section className="mt-6 rounded-[2rem] border border-amber-300/30 bg-amber-300/10 p-5 text-amber-100">
          <h3 className="font-black">Cảnh báo hệ thống</h3>
          <ul className="mt-3 space-y-2 text-sm font-semibold leading-6">
            {warnings.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </section>
      )}
    </AdminShell>
  );
}
