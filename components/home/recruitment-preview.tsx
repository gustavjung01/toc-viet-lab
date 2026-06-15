import Link from "next/link";
import { Briefcase, Crown, Rocket } from "lucide-react";
import { jobPosts } from "@/lib/recruitment";

export function RecruitmentPreview() {
  const featuredJobs = jobPosts.filter((job) => job.featured).slice(0, 2);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-gold/15 bg-white/[0.04] shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
              <Briefcase size={15} /> Tuyển dụng tóc
            </div>
            <h2 className="mt-6 text-3xl font-black leading-tight text-white md:text-5xl">
              Khu tuyển dụng riêng cho ngành tóc Việt.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
              Bất cứ tài khoản nào cũng có thể đăng tuyển, không bắt buộc phải là salon. Hệ thống chỉ giới hạn số tin miễn phí để mở đường cho gói đăng thêm và đẩy tin nổi bật.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Rocket, label: "Đăng nhanh", value: "Không cần hồ sơ salon" },
                { icon: Crown, label: "Có quota", value: "Giới hạn theo tài khoản" },
                { icon: Briefcase, label: "Thu phí", value: "Gói đăng & đẩy tin" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                  <item.icon className="h-5 w-5 text-gold" />
                  <div className="mt-3 text-sm font-black text-white">{item.label}</div>
                  <p className="mt-1 text-xs leading-5 text-white/55">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tuyen-dung" className="rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-black shadow-gold transition hover:brightness-110">
                Xem tuyển dụng
              </Link>
              <Link href="/tuyen-dung/dang-tin" className="rounded-full border border-white/15 px-6 py-3 text-sm font-extrabold text-white transition hover:border-gold hover:text-gold">
                Đăng tin tuyển
              </Link>
            </div>
          </div>
          <div className="border-t border-gold/10 bg-black/35 p-6 lg:border-l lg:border-t-0 lg:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-white">Tin nổi bật</h3>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">Đẩy tin</span>
            </div>
            <div className="space-y-4">
              {featuredJobs.map((job) => (
                <article key={job.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-black text-white">{job.title}</h4>
                      <p className="mt-1 text-sm font-semibold text-gold">{job.employer}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white/70">{job.type}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/60">{job.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/65">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
