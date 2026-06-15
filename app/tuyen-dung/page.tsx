import Link from "next/link";
import { Briefcase, MapPin, Megaphone, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { jobPosts, recruitmentPlanCards } from "@/lib/recruitment";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-black text-cream-card">
      <Header />
      <main className="pb-20 lg:pb-0">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-[2rem] bg-radial-gold p-8 shadow-soft lg:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-black/20 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-champagne">
              <Briefcase size={15} /> Việc làm ngành tóc
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
                  Tuyển thợ, tìm việc và đẩy tin trong một luồng rõ ràng.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
                  Trang tuyển dụng là khu chính của Tóc Việt Lab. Người tuyển không bắt buộc phải có salon, chỉ cần có tài khoản để đăng tin và quản lý quota. Khi vượt giới hạn miễn phí, hệ thống mở gói đăng thêm hoặc đẩy tin nổi bật.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/tuyen-dung/dang-tin" className="rounded-full bg-champagne px-6 py-3 text-sm font-extrabold text-charcoal shadow-gold transition hover:brightness-110">
                    Đăng tin tuyển dụng
                  </Link>
                  <Link href="/tuyen-dung-cua-toi" className="rounded-full border border-white/20 px-6 py-3 text-sm font-extrabold text-white transition hover:border-champagne hover:text-champagne">
                    Quản lý tin của tôi
                  </Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { icon: ShieldCheck, title: "Không khóa theo salon", desc: "Cá nhân, salon, học viện hoặc brand đều đăng được." },
                  { icon: Megaphone, title: "Quota trước, thu phí sau", desc: "Hết lượt miễn phí thì mua gói đăng thêm." },
                  { icon: Sparkles, title: "Đẩy tin nổi bật", desc: "Tin cần tuyển gấp có thể mua lượt push riêng." },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                    <item.icon className="h-5 w-5 text-champagne" />
                    <h3 className="mt-3 font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">Danh sách tin</p>
              <h2 className="mt-2 text-3xl font-black text-white">Tin tuyển mới nhất</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/60">
              Mock data, sẵn để nối D1
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {jobPosts.map((job) => (
              <article key={job.id} className="rounded-[2rem] border border-gold/10 bg-white/[0.04] p-6 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">{job.postedAt}</span>
                  {job.featured && <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70">Nổi bật</span>}
                </div>
                <h3 className="mt-5 text-2xl font-black text-white">{job.title}</h3>
                <p className="mt-2 text-sm font-bold text-gold">{job.employer}</p>
                <div className="mt-4 space-y-2 text-sm text-white/65">
                  <p className="flex items-center gap-2"><MapPin size={16} /> {job.location}</p>
                  <p className="flex items-center gap-2"><Briefcase size={16} /> {job.salary}</p>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/60">{job.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">Monetize tuyển dụng</p>
            <h2 className="mt-2 text-3xl font-black text-white">Gói đăng vượt và đẩy tin</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {recruitmentPlanCards.map((plan) => (
              <div key={plan.code} className={`rounded-[2rem] border bg-white/[0.04] p-6 shadow-soft ${plan.popular ? "border-gold ring-1 ring-gold/30" : "border-white/10"}`}>
                {plan.popular && <div className="mb-4 w-fit rounded-full bg-gold px-4 py-1 text-xs font-extrabold text-black">Nên dùng</div>}
                <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{plan.desc}</p>
                <div className="mt-6 text-4xl font-black text-gold">{plan.price}</div>
                <div className="mt-1 text-sm text-white/50">{plan.unit}</div>
                <ul className="mt-6 space-y-3 text-sm text-white/65">
                  {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
