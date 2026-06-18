"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Search, Sparkles, XCircle } from "lucide-react";

type Job = {
  id: string;
  title: string;
  employerDisplayName?: string;
  location?: string;
  city?: string;
  salaryText?: string;
  status?: string;
  description?: string;
  createdAt?: number;
  featured?: boolean;
};

const statusOptions = [
  { label: "Tất cả", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Closed", value: "closed" },
  { label: "Rejected", value: "rejected" },
  { label: "Expired", value: "expired" },
];

const actions = [
  { label: "Duyệt", value: "publish", icon: CheckCircle2 },
  { label: "Từ chối", value: "reject", icon: XCircle },
  { label: "Đóng", value: "close", icon: XCircle },
  { label: "Đẩy", value: "boost", icon: Sparkles },
];

export function RecruitmentJobsManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Job | null>(null);

  const params = useMemo(() => {
    const next = new URLSearchParams({ limit: "80", status });
    if (query.trim()) next.set("q", query.trim());
    return next.toString();
  }, [status, query]);

  async function loadJobs() {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/recruitment/jobs?${params}`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Không tải được tin tuyển dụng.");
      return;
    }
    setJobs(data.jobs ?? []);
  }

  useEffect(() => {
    const timeout = window.setTimeout(loadJobs, 250);
    return () => window.clearTimeout(timeout);
  }, [params]);

  async function runAction(job: Job, action: string) {
    setActingId(`${job.id}:${action}`);
    setError("");
    const res = await fetch(`/api/admin/recruitment/jobs/${encodeURIComponent(job.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json().catch(() => ({}));
    setActingId("");
    if (!res.ok) {
      setError(data.error || data.message || "Không cập nhật được tin.");
      return;
    }
    setJobs((current) => current.map((item) => (item.id === job.id ? data.job : item)));
    if (selected?.id === job.id) setSelected(data.job);
  }

  return (
    <>
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Recruitment</p>
        <h2 className="mt-3 text-3xl font-black text-white">Tin tuyển dụng</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">
          Lọc, xem chi tiết và thao tác duyệt/từ chối/đóng/đẩy tin từ VPS Postgres.
        </p>
      </section>

      <section className="mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm title, salon, thành phố..."
              className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/35"
            />
          </label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-full border border-white/10 bg-black/60 px-4 py-3 text-sm font-black text-white outline-none">
            {statusOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
      </section>

      {error && <div className="mt-5 rounded-3xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">{error}</div>}

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center rounded-3xl border border-white/10 bg-white/5 p-12"><Loader2 className="h-8 w-8 animate-spin text-[#D6A84F]" /></div>
        ) : jobs.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/55">Không có tin phù hợp.</div>
        ) : jobs.map((job) => (
          <article key={job.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-black text-[#F0C76A]">{job.status || "published"}</span>
              {job.featured && <span className="rounded-full bg-purple-400/15 px-3 py-1 text-xs font-black text-purple-200">Đã đẩy</span>}
            </div>
            <button type="button" onClick={() => setSelected(job)} className="mt-4 block text-left">
              <h3 className="text-xl font-black text-white">{job.title}</h3>
              <p className="mt-2 text-sm font-semibold text-white/60">{job.employerDisplayName || "Nhà tuyển dụng"}</p>
              <p className="mt-1 text-sm text-white/50">{job.location || job.city || "Chưa có khu vực"}</p>
              <p className="mt-3 text-sm font-bold text-white/75">{job.salaryText || "Lương trao đổi"}</p>
            </button>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.value} type="button" onClick={() => runAction(job, action.value)} disabled={!!actingId} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs font-black text-white/75 hover:text-[#F0C76A] disabled:opacity-50">
                    {actingId === `${job.id}:${action.value}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon size={14} />}
                    {action.label}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Chi tiết tin</p>
                <h3 className="mt-3 text-2xl font-black">{selected.title}</h3>
                <p className="mt-2 text-sm font-semibold text-white/60">{selected.employerDisplayName || "Nhà tuyển dụng"} • {selected.location || selected.city || "Chưa có khu vực"}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full bg-white/10 px-3 py-2 text-sm font-black">Đóng</button>
            </div>
            <p className="mt-6 whitespace-pre-line text-sm font-semibold leading-8 text-white/75">{selected.description || "Chưa có mô tả."}</p>
          </div>
        </div>
      )}
    </>
  );
}
