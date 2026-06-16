import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { toAssetUrl } from "@/lib/asset-url";
import { absoluteSiteUrl } from "@/lib/site-url";
import { getFallbackFormulas, type PublicFormula } from "@/lib/formulas";

async function fetchFormulas(): Promise<PublicFormula[]> {
  try {
    const res = await fetch(absoluteSiteUrl("/api/formulas?limit=50"), { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Formula API unavailable");
    const data = await res.json();
    return data.formulas?.length ? data.formulas : getFallbackFormulas();
  } catch {
    return getFallbackFormulas();
  }
}

const DIFFICULTY_LABEL: Record<string, string> = {
  basic: "Cơ bản",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
};

export default async function FormulaPublicPage() {
  const formulas = await fetchFormulas();
  const tags = Array.from(new Set(formulas.map((formula) => formula.tag).filter(Boolean)));

  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-6 rounded-[2rem] bg-radial-gold p-8 text-white shadow-soft lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">SỔ TAY CÔNG THỨC</p>
              <h1 className="mt-4 text-4xl font-black md:text-6xl">Công thức màu theo nền tóc thực tế</h1>
              <p className="mt-5 max-w-2xl leading-8 text-white/65">
                Thư viện công thức có bài chi tiết, tỷ lệ pha, nền tóc phù hợp và lưu ý xử lý. Data ưu tiên đọc từ DB, nếu DB chưa sẵn sẽ tự dùng bộ fallback trong code.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-gold p-3 text-black">
                  <FlaskConical size={22} />
                </div>
                <div>
                  <p className="text-sm text-white/55">Hiện có</p>
                  <p className="text-3xl font-black text-champagne">{formulas.length} công thức</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Mỗi công thức có slug riêng để SEO, chia sẻ và lưu vào tài khoản. Đây là nền để sau này mở admin/CMS nhập công thức thật.
              </p>
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            {formulas.map((formula) => {
              const imageUrl = toAssetUrl(formula.imageKey);
              return (
                <article key={formula.slug} className="overflow-hidden rounded-3xl bg-white shadow-soft">
                  <Link href={`/cong-thuc-mau/${formula.slug}`} className="block">
                    <HairVisual
                      src={imageUrl}
                      alt={formula.title}
                      className="rounded-[1.5rem] border border-gold/20"
                      aspect="aspect-[4/3] sm:aspect-video"
                      label={formula.tag}
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-charcoal">{formula.tag}</span>
                      <span className="rounded-full bg-cream px-3 py-1 text-warmgray">
                        {DIFFICULTY_LABEL[formula.difficulty] ?? "Trung cấp"}
                      </span>
                      <span className="rounded-full bg-cream px-3 py-1 text-warmgray">{formula.readTime} phút đọc</span>
                    </div>
                    <h2 className="mt-4 text-xl font-black text-charcoal">{formula.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-warmgray">{formula.excerpt || formula.note}</p>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                      <div className="rounded-2xl bg-cream p-3">
                        <b>Nền</b><br />{formula.base}
                      </div>
                      <div className="rounded-2xl bg-cream p-3">
                        <b>Oxy</b><br />{formula.developer}
                      </div>
                      <div className="rounded-2xl bg-cream p-3">
                        <b>Tỷ lệ</b><br />{formula.ratio}
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <Link href={`/cong-thuc-mau/${formula.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171410] px-5 py-3 font-extrabold text-[#D6A84F] transition hover:bg-[#201A13]">
                        Xem chi tiết <ArrowRight size={16} />
                      </Link>
                      <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 font-extrabold text-charcoal transition hover:bg-cream">
                        <BookOpen size={16} /> Lưu
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
