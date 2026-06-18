import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { readAdminAccess } from "@/lib/admin-permission";
import { buildServerApiUrl, hasServerApiBaseUrl } from "@/lib/server-api";

type JobRow = {
  id: string;
  title: string;
  employerDisplayName?: string;
  location?: string;
  salaryText?: string;
  status?: string;
  createdAt?: number;
};

async function getJobs() {
  if (!hasServerApiBaseUrl()) return { rows: [] as JobRow[], total: 0, error: "SERVER_API_BASE_URL chưa cấu hình." };
  try {
    const res = await fetch(`${buildServerApiUrl("/recruitment/jobs")}?limit=50`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Không đọc được VPS recruitment.");
    return { rows: (data.jobs ?? []) as JobRow[], total: Number(data.total ?? 0), error: "" };
  } catch (error: any) {
    return { rows: [] as JobRow[], total: 0, error: error?.message || "Không đọc được VPS recruitment." };
  }
}

export default async function AdminRecruitmentJobsPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;
  const { rows, total, error } = await getJobs();

  return (
    <AdminShell>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Recruitment</p>
        <h2 className="mt-3 text-3xl font-black text-white">Tin tuyển dụng</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">MVP đang đọc danh sách published jobs từ VPS Postgres. Tổng: {total}</p>
      </section>
      {error && <div className="mt-5 rounded-3xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">{error}</div>}
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((job) => (
          <article key={job.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-black text-[#F0C76A]">{job.status || "published"}</span>
            <h3 className="mt-4 text-xl font-black text-white">{job.title}</h3>
            <p className="mt-2 text-sm font-semibold text-white/60">{job.employerDisplayName || "Nhà tuyển dụng"}</p>
            <p className="mt-1 text-sm text-white/50">{job.location || "Chưa có khu vực"}</p>
            <p className="mt-3 text-sm font-bold text-white/75">{job.salaryText || "Lương trao đổi"}</p>
          </article>
        ))}
        {rows.length === 0 && !error && <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/55">Chưa có tin tuyển dụng.</div>}
      </section>
    </AdminShell>
  );
}
