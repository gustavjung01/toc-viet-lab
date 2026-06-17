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

const statusLabel: Record<string, string> = {
  published: "Đang hoạt động",
  draft: "Bản nháp",
  closed: "Đã đóng",
  expired: "Hết hạn",
  rejected: "Không duyệt",
};

export function MyRecruitmentDashboard({ role }: Props) {
  const [jobs, setJobs] = useState<RecruitmentJobPost[]>([]);
  const [usage, setUsage] = useState<RecruitmentUsage>(ZERO_USAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [actingId, setActingId] = useState<string | null>(null);

  async function loadJobs() {
    setLoading(true);
    setError("");
    setWarning("");
    const res = await fetch("/api/backend/jobs?mine=1", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Không thể tải tin tuyển dụng.");
      return;
    }

    setJobs(data.jobs ?? []);
    setUsage(data.usage ?? ZERO_USAGE);
    if (data.warning) setWarning(data.warning);
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

  const needsPostPlan = !loading && (usage.remainingPosts <= 0 || usage.remainingActive <= 0);
  const needsBoostPlan = !loading && usage.remainingBoosts <= 0;

  const statCards = [
    { label: "Gói tài khoản", value: getRecruitmentRoleLabel(role), icon: Crown, hint: "Không cần salon" },
    { label: "Tin còn lại", value: String(usage.remainingPosts), icon: Briefcase, hint: `${usage.postsThisMonth} tin đã dùng` },
    { label: "Slot hoạt động còn", value: String(usage.remainingActive), icon: Rocket, hint: `${usage.activePosts} tin đang mở` },
    { label: "Lượt đẩy còn lại", value: String(usage.remainingBoosts), icon: Megaphone, hint: `${usage.boostsThisMonth} lượt đã dùng` },
  ];

  return (
    <>
      <section className="rounded-[2rem] bg-charcoal p-7 text-white shadow-soft md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-champagne">Tài khoản tuyển dụng</p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">Tin tuyển dụng của tôi</h1>
            <p className="mt-4 max-w-3xl leading-8 text-white/75">
              Bất cứ tài khoản đã đăng nhập đều có thể đăng tuyển. Hệ thống chỉ giới hạn theo số tin, slot đang hoạt động và lượt đẩy, không khóa vì thiếu hồ sơ salon.
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
              <p className="mt-4 text-sm font-bold text-white/70">{item.label}</p>
              <div className="mt-1 text-2xl font-black text-white">{item.value}</div>
              <p className="mt-1 text-xs font-semibold text-white/50">{item.hint}</p>
            </div>
          ))}
        </div>
      </section>

      {warning && (
        <section className="mt-6 flex items-start gap-3 rounded-[2rem] border border-amber-200 bg-amber-50 p-5 text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-black text-amber-950">Đang chạy dữ liệu tạm</p>
            <p className="mt-1 text-sm font-semibold leading-6">{warning}</p>
          </div>
        </section>
      )}

      {error && (
        <section className="mt-6 flex items-start gap-3 rounded-[2rem] bg-red-50 p-5 text-red-600">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold leading-6">{error}</p>
        </section>
      )}

      {!loading && (needsPostPlan || needsBoostPlan) && (
        <section className="mt-6 rounded-[2rem] border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-charcoal">Cần mua thêm để tiếp tục</h2>
              <p className="mt-2 max-w-3xl leading-7 text-mutedLight">
                {needsPostPlan
                  ? "Bạn đã hết tin đăng hoặc slot đang hoạt động. Mua gói đăng thêm/gói tuyển nhiều để mở thêm tin, không cần nâng cấp thành salon."
                  : "Bạn đã hết lượt đẩy tin trong tháng. Mua thêm lượt đẩy để đưa tin lên nổi bật."}
              </p>
            </div>
            <Link href="#recruitment-plans" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-extrabold text-champagne">
              Xem gói phù hợp <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      )}

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex items-center justify-center rounded-[2rem] bg-white p-12 shadow-soft">
            <Loader2 className="h-8 w-8 animate-spin text-goldText" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="col-span-full rounded-[2rem] border border-dashed border-black/10 bg-white p-10 text-center shadow-soft">
            <Briefcase className="mx-auto h-10 w-10 text-goldText" />
            <h2 className="mt-4 text-2xl font-black text-charcoal">Chưa có tin tuyển dụng</h2>
            <p className="mt-2 text-sm text-mutedLight">Bấm “Đăng tin” để tạo tin đầu tiên. Tài khoản cá nhân cũng đăng được.</p>
          </div>
        ) : jobs.map((job) => {
          const isPublished = job.status === "published";
          return (
            <article key={job.id} className="rounded-[2rem] bg-white p-6 text-charcoal shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-mutedLight">{statusLabel[job.status] ?? job.status}</span>
                {job.featured && <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-bold text-goldText">Đã đẩy</span>}
              </div>
              <h3 className="mt-5 text-xl font-black text-charcoal">{job.title}</h3>
              <p className="mt-2 text-sm font-semibold text-mutedLight">{job.location}</p>
              <p className="mt-1 text-sm font-semibold text-mutedLight">{job.salaryText}</p>
              <p className="mt-4 text-sm leading-7 text-mutedLight">{job.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => patchJob(job.id, isPublished ? "close" : "publish")}
                  disabled={actingId === job.id}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-charcoal disabled:opacity-50"
                >
                  {isPublished ? "Đóng tin" : "Mở lại"}
                </button>
                <button
                  onClick={() => patchJob(job.id, "boost")}
                  disabled={actingId === job.id || needsBoostPlan}
                  className="rounded-full bg-charcoal px-4 py-2 text-sm font-bold text-champagne disabled:cursor-not-allowed disabled:opacity-50"
                  title={needsBoostPlan ? "Đã hết lượt đẩy, cần mua gói" : "Đẩy tin nổi bật"}
                >
                  {needsBoostPlan ? "Hết lượt đẩy" : "Đẩy tin"}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section id="recruitment-plans" className="mt-10">
        <div className="mb-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-goldText">Gói tuyển dụng</p>
          <h2 className="mt-2 text-3xl font-black text-charcoal">Thu phí khi vượt giới hạn</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-mutedLight">
            Giai đoạn này dùng liên hệ thủ công. Khi VPS/payment sẵn sàng, các nút bên dưới sẽ nối checkout thật.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {recruitmentPlanCards.map((plan) => (
            <div key={plan.code} className={`rounded-[2rem] bg-white p-6 text-charcoal shadow-soft ${plan.popular ? "ring-2 ring-[#D6A84F]" : ""}`}>
              {plan.popular && <div className="mb-4 w-fit rounded-full bg-[#D6A84F] px-4 py-1 text-xs font-extrabold text-charcoal">Phù hợp nhất</div>}
              <h3 className="text-2xl font-black text-charcoal">{plan.name}</h3>
              <p className="mt-2 text-sm leading-6 text-mutedLight">{plan.desc}</p>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-mutedLight">
                {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
              </ul>
              <div className="mt-6 text-4xl font-black text-charcoal">{plan.price}</div>
              <div className="mt-1 text-sm text-mutedLight">{plan.unit}</div>
              <button className="mt-6 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-extrabold text-champagne">{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
