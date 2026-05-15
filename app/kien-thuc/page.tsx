"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleCard, CategoryCard, SectionHeader } from "@/components/cards";
import { articles as mockArticles, categories } from "@/lib/data";
import { Loader2, Search } from "lucide-react";

const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "");

function resolveAssetSrc(path?: string) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\//, "");
  return ASSET_BASE ? `${ASSET_BASE}/${clean}` : `/${clean}`;
}

function isRelativeAssetPath(path?: string) {
  return typeof path === "string" && path.includes("/");
}

export default function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<string[]>(["Tất cả"]);

  const fetchArticles = useCallback((cat: string, q: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (cat !== "Tất cả") params.set("category", cat);
    if (q.trim()) params.set("q", q.trim());
    fetch(`/api/articles?${params}`)
      .then((r) => r.json())
      .then((d) => {
        const data: any[] = d.articles ?? [];
        if (data.length > 0) {
          setArticles(data);
          if (cat === "Tất cả" && !q) {
            const cats = ["Tất cả", ...Array.from(new Set(data.map((a: any) => a.category).filter(Boolean)))];
            setAllCategories(cats as string[]);
          }
        } else if (!q && cat === "Tất cả") {
          setArticles(mockArticles as any[]);
        } else {
          setArticles([]);
        }
      })
      .catch(() => setArticles(mockArticles as any[]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchArticles("Tất cả", ""); }, [fetchArticles]);

  useEffect(() => {
    const timer = setTimeout(() => fetchArticles(activeCategory, query), 400);
    return () => clearTimeout(timer);
  }, [query, activeCategory, fetchArticles]);

  // Normalize DB row (snake_case) → ArticleCard props
  const DIFF_MAP: Record<string, string> = { basic: "Cơ bản", intermediate: "Trung cấp", advanced: "Nâng cao" };
  function normalizeArticle(a: any) {
    const rawImageKey = a.imageKey ?? a.image_key ?? undefined;
    return {
      ...a,
      slug: a.slug ?? a.id,
      imageKey: isRelativeAssetPath(rawImageKey) ? undefined : rawImageKey,
      imageSrc: isRelativeAssetPath(rawImageKey) ? resolveAssetSrc(rawImageKey) : undefined,
      level: a.level ?? DIFF_MAP[a.difficulty] ?? a.difficulty ?? "Cơ bản",
      minutes: a.minutes ?? a.read_time ?? a.readTime ?? 5,
    };
  }

  const filtered = articles;

  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] bg-radial-gold p-7 text-white shadow-soft lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_.75fr]">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">KHO TRI THỨC NGÀNH TÓC</p>
                <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Tra cứu kỹ thuật tóc chuyên sâu</h1>
                <p className="mt-5 max-w-2xl leading-8 text-white/65">Hàng trăm chủ đề được chọn lọc theo tình huống salon Việt: nền tóc, nhuộm màu, phủ bạc, sửa lỗi màu và phục hồi.</p>
                <div className="mt-7 flex max-w-2xl rounded-full bg-white p-2">
                  <Search size={18} className="ml-4 self-center text-warmgray flex-shrink-0" />
                  <input
                    className="min-w-0 flex-1 bg-transparent px-4 text-sm text-charcoal outline-none"
                    placeholder="Tìm kiếm chủ đề, kỹ thuật, công thức..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="mr-2 self-center text-xs text-warmgray hover:text-charcoal"
                    >
                      ✕
                    </button>
                  )}
                  <button className="rounded-full bg-champagne px-5 py-3 text-sm font-extrabold text-charcoal">Tìm kiếm</button>
                </div>
              </div>
              <div className="rounded-3xl border border-champagne/25 bg-black/25 p-4">
                <HairVisual className="h-56" gradient="from-[#15211e] via-[#637a4d] to-[#c9a45c]" label="Chủ đề nổi bật" />
                <h2 className="mt-5 text-xl font-black">Sửa lỗi màu khói bị xanh rêu</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">Phân tích nguyên nhân, hướng xử lý và công thức tham khảo.</p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <SectionHeader title="Chủ đề phổ biến" />
            <div className="mb-6 flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeCategory === cat
                      ? "bg-gold text-black"
                      : "border border-black/10 text-warmgray hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard key={category.title} {...category} />
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="font-extrabold text-charcoal">Bộ lọc</h3>
              {[
                "Danh mục",
                "Độ khó",
                "Thời gian đọc",
                "Loại nội dung",
              ].map((group) => (
                <div key={group} className="mt-6 border-t border-black/5 pt-5">
                  <p className="mb-3 text-sm font-extrabold text-charcoal">{group}</p>
                  {["Tất cả", "Cơ bản", "Trung cấp", "Nâng cao"].map((item) => (
                    <label key={item} className="mb-2 flex items-center gap-2 text-sm text-warmgray">
                      <input type="checkbox" className="accent-champagne" /> {item}
                    </label>
                  ))}
                </div>
              ))}
            </aside>

            <div>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-warmgray">
                  Hiển thị <span className="font-extrabold text-charcoal">{filtered.length}</span> chủ đề
                  {query && <span> cho &ldquo;{query}&rdquo;</span>}
                  {activeCategory !== "Tất cả" && <span> trong <span className="text-gold">{activeCategory}</span></span>}
                </p>
                <button className="rounded-full border border-black/10 px-4 py-2 text-sm font-bold">Mới nhất</button>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={32} className="animate-spin text-[#D6A84F]" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 py-20 text-center">
                  <p className="text-lg font-extrabold text-charcoal">Không tìm thấy kết quả</p>
                  <p className="mt-2 text-sm text-warmgray">Thử từ khoá khác hoặc chọn danh mục khác</p>
                  <button
                    onClick={() => { setQuery(""); setActiveCategory("Tất cả"); }}
                    className="mt-4 rounded-full bg-gold px-5 py-2 text-sm font-bold text-black"
                  >
                    Xoá bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((article, index) => (
                    <ArticleCard key={`${article.slug ?? article.id}-${index}`} article={normalizeArticle(article)} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
