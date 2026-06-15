"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, Briefcase, Crown, Loader2, Megaphone, Plus, Rocket } from "lucide-react";
import { getRecruitmentRoleLabel, recruitmentPlanCards } from "@/lib/recruitment";
import type { RecruitmentJobPost, RecruitmentUsage } from "@/lib/recruitment-jobs";

type Props = { role: string };

const ZERO_USAGE: RecruitmentUsage = {
  postsThisMonth: 0,
  activePosts: 0,
  boostsThisMonth: 0,
  paidPostCredits: 0,
  paidBoostCredits: 0,
  remainingPosts: 0,
  remainingActive: 0,
  remainingBoosts: 0,
  canPost: false,
};

export function MyRecruitmentDashboard({ role }: Props) {
  const [jobs, setJobs] = useState<RecruitmentJobPost[]>([]);
  const [usage, setUsage] = useState<RecruitmentUsage>(ZERO_USAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actingId, setActingId] = useState<string | null>(null);

  async function loadJobs() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/recruitment/jobs?mine=1", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Không thể tải tin tuyển dụng.");
      return;
    }

    setJobs(data.jobs ?? []);
    setUsage(data.usage ?? ZERO_USAGE);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function patchJob(id: string, action: "close" | "publish" | "boost") {
    setActingId(id);
    setError("");
    const res = await fetch(`/api/recruitment/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json().catch(() => ({}));
    setActingId(null);

    if (!res.ok) {
      setError(data.error || "Không thể cập nhật tin.");
      return;
    }

    await loadJobs();
  }

  const statCards = [
    { label: "Gói tài khoản", value: getRecruitmentRoleLabel(role), icon: Crown },
    { label: "Tin còn lại", value: String(usage.remainingPosts), icon: Briefcase },
    { label: "Slot đang hoạt động", value: String(usage.remainingActive), icon: Rocket },
    { label: "Lượt đẩy còn lại", value: String(usage.remainingBoosts), icon: Megaphone },
  ];

  return (
    <>
      <section className="rounded-[2rem] bg-charcoal p-7 text-white shadow-soft md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-champagne">Tài khoản tuyển dụng</p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">Tin tuyển dụng của tôi</h1>
            <p className="mt-4 max-w-3xl leading-8 text-white/65">
              Tài khoản này có thể đăng tuyển dù chưa khai báo salon. Giới hạn nằm ở số tin miễn phí, số tin đang hoạt động và lượt đẩy tin.
            </p>
          </div>
          <Link href="/tuyen-dung/dang-tin" className="inline-flex items-center gap-2 rounded-full bg-champagne px-5 py-3 text-sm font-extrabold text-charcoal shadow-gold transition hover:brightness-110">
            <Plus size={17} /> Đăng tin
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {statCards.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <item.icon className="h-5 w-5 text-champagne" />
              <p className="mt-4 text-sm font-bold text-white/55">{item.label}</p>
              <div className="mt-1 text-2xl font-black text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {error && (
        <section className="mt-6 flex items-start gap-3 rounded-[2rem] bg-red-50 p-5 text-red-600">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold leading-6">{error}</p>
        </section>
      )}

      {!loading && !usage.canPost && (
        <section className="mt-6 rounded-[2rem] border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-charcoal">Đã chạm giới hạn miễn phí</h2>
              <p className="mt-2 max-w-3xl leading-7 text-warmgray">
                Không khóa vì thiếu salon. Khi hết quota, hệ thống mời mua gói đăng thêm hoặc gói tuyển nhiều.
              </p>
            </div>
            <Link href="#recruitment-plans" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-extrabold text-champagne">
              Xem gói <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      )}

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex items-center justify-center rounded-[2rem] bg-white p-12 shadow-soft">
            <Loader2 className="h-8 w-8 animate-spin text-[#D6A84F]" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="col-span-full rounded-[2rem] border border-dashed border-black/10 bg-white p-10 text-center shadow-soft">
            <Briefcase className="mx-auto h-10 w-10 text-[#D6A84F]" />
            <h2 className="mt-4 text-2xl font-black text-charcoal">Chưa có tin tuyển dụng</h2>
            <p className="mt-2 text-sm text-warmgray">Bấm “Đăng tin” để tạo tin đầu tiên. Không cần khai báo salon.</p>
          </div>
        ) : jobs.map((job) => (
          <article key={job.id} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-warmgray">{job.status === "published" ? "Đang hoạt động" : job.status}</span>
              {job.featured && <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-bold text-[#D6A84F]">Đã đẩy</span>}
            </div>
            <h3 className="mt-5 text-xl font-black text-charcoal">{job.title}</h3>
            <p className="mt-2 text-sm font-semibold text-warmgray">{job.location}</p>
            <p className="mt-1 text-sm font-semibold text-warmgray">{job.salaryText}</p>
            <p className="mt-4 text-sm leading-7 text-warmgray">{job.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => patchJob(job.id, job.status === "published" ? "close" : "publish")}
                disabled={actingId === job.id}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-charcoal disabled:opacity-50"
              >
                {job.status === "published" ? "Đóng tin" : "Mở lại"}
              </button>
              <button
                onClick={() => patchJob(job.id, "boost")}
                disabled={actingId === job.id}
                className="rounded-full bg-charcoal px-4 py-2 text-sm font-bold text-champagne disabled:opacity-50"
              >
                Đẩy tin
              </button>
            </div>
          </article>
        ))}
      </section>

      <section id="recruitment-plans" className="mt-10">
        <div className="mb-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#D6A84F]">Gói tuyển dụng</p>
          <h2 className="mt-2 text-3xl font-black text-charcoal">Thu phí khi vượt giới hạn</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {recruitmentPlanCards.map((plan) => (
            <div key={plan.code} className={`rounded-[2rem] bg-white p-6 shadow-soft ${plan.popular ? "ring-2 ring-[#D6A84F]" : ""}`}>
              {plan.popular && <div className="mb-4 w-fit rounded-full bg-[#D6A84F] px-4 py-1 text-xs font-extrabold text-charcoal">Phù hợp nhất</div>}
              <h3 className="text-2xl font-black text-charcoal">{plan.name}</h3>
              <p className="mt-2 text-sm leading-6 text-warmgray">{plan.desc}</p>
              <div className="mt-6 text-4xl font-black text-charcoal">{plan.price}</div>
              <div className="mt-1 text-sm text-warmgray">{plan.unit}</div>
              <button className="mt-6 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-extrabold text-champagne">Mua gói mock</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
