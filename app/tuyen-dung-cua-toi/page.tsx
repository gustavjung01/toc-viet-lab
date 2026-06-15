import Link from "next/link";
import { ArrowUpRight, Briefcase, Crown, Megaphone, Plus, Rocket } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { auth } from "@/auth";
import { getRecruitmentLimits, getRecruitmentRoleLabel, jobPosts, recruitmentPlanCards } from "@/lib/recruitment";

export default async function MyRecruitmentPage() {
  const session = await auth();
  const role = (session?.user as any)?.role ?? "free";
  const limits = getRecruitmentLimits(role);
  const mockUsage = {
    postsThisMonth: role === "free" ? 1 : 2,
    activePosts: 1,
    boostsThisMonth: 0,
  };
  const remainingPosts = Math.max(limits.monthlyPosts - mockUsage.postsThisMonth, 0);
  const remainingActive = Math.max(limits.activePosts - mockUsage.activePosts, 0);
  const remainingBoosts = Math.max(limits.monthlyBoosts - mockUsage.boostsThisMonth, 0);
  const canPost = remainingPosts > 0 && remainingActive > 0;

  return (
    <AppShell>
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
          {[
            { label: "Gói tài khoản", value: getRecruitmentRoleLabel(role), icon: Crown },
            { label: "Tin còn lại", value: String(remainingPosts), icon: Briefcase },
            { label: "Slot đang hoạt động", value: String(remainingActive), icon: Rocket },
            { label: "Lượt đẩy còn lại", value: String(remainingBoosts), icon: Megaphone },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <item.icon className="h-5 w-5 text-champagne" />
              <p className="mt-4 text-sm font-bold text-white/55">{item.label}</p>
              <div className="mt-1 text-2xl font-black text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {!canPost && (
        <section className="mt-6 rounded-[2rem] border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-charcoal">Đã chạm giới hạn miễn phí</h2>
              <p className="mt-2 max-w-3xl leading-7 text-warmgray">
                Luồng đúng là không khóa vì thiếu salon. Thay vào đó, hệ thống mời mua gói đăng thêm hoặc gói tuyển nhiều để tiếp tục tạo tin.
              </p>
            </div>
            <Link href="#recruitment-plans" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-extrabold text-champagne">
              Xem gói <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      )}

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {jobPosts.map((job, index) => (
          <article key={job.id} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-warmgray">{index === 0 ? "Đang hoạt động" : "Tin mẫu"}</span>
              {job.featured && <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-bold text-[#D6A84F]">Đã đẩy</span>}
            </div>
            <h3 className="mt-5 text-xl font-black text-charcoal">{job.title}</h3>
            <p className="mt-2 text-sm font-semibold text-warmgray">{job.location}</p>
            <p className="mt-4 text-sm leading-7 text-warmgray">{job.desc}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button className="rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-charcoal">Sửa tin</button>
              <button className="rounded-full bg-charcoal px-4 py-2 text-sm font-bold text-champagne">Đẩy tin</button>
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
    </AppShell>
  );
}
