"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseCard, SectionHeader } from "@/components/cards";
import { HairVisual } from "@/components/visual";
import { cases as mockCases } from "@/lib/data";
import { Loader2 } from "lucide-react";

const ALL = "Tất cả loại case";
const PAGE_SIZE = 12;
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

function normalizeCase(c: any) {
  const rawBefore = c.imageKeyBefore ?? c.before_image_key ?? undefined;
  const rawAfter = c.imageKeyAfter ?? c.after_image_key ?? undefined;
  return {
    ...c,
    imageKeyBefore: isRelativeAssetPath(rawBefore) ? undefined : rawBefore,
    imageSrcBefore: isRelativeAssetPath(rawBefore) ? resolveAssetSrc(rawBefore) : undefined,
    imageKeyAfter: isRelativeAssetPath(rawAfter) ? undefined : rawAfter,
    imageSrcAfter: isRelativeAssetPath(rawAfter) ? resolveAssetSrc(rawAfter) : undefined,
    tag: c.tag ?? c.category ?? "",
    condition: c.condition ?? c.description ?? "",
    goal: c.goal ?? c.formula ?? c.analysis ?? "",
    salon: c.salon ?? "Tóc Việt Lab",
    time: c.time ?? "",
  };
}

export default function CasePage() {
  const [activeTag, setActiveTag] = useState(ALL);
  const [cases, setCases] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [categories, setCategories] = useState<string[]>([ALL]);

  const fetchCases = useCallback(async (category: string, offset: number, append: boolean) => {
    if (!append) setLoading(true);
    else setLoadingMore(true);
    try {
      const params = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(offset) });
      if (category !== ALL) params.set("category", category);
      const res = await fetch(`/api/cases?${params}`);
      const d = await res.json();
      const rows: any[] = d.cases ?? [];
      if (rows.length > 0 || d.total != null) {
        setCases((prev) => (append ? [...prev, ...rows] : rows));
        setTotal(d.total ?? rows.length);
        if (!append && offset === 0) {
          // Extract categories from all results on first load (use a separate call)
          const catRes = await fetch("/api/cases?limit=50&offset=0");
          const catData = await catRes.json();
          const allRows: any[] = catData.cases ?? [];
          const cats = [ALL, ...Array.from(new Set(allRows.map((c: any) => c.category).filter(Boolean)))];
          setCategories(cats as string[]);
        }
      } else if (!append) {
        setCases(mockCases as any[]);
        setTotal(mockCases.length);
      }
    } catch {
      if (!append) {
        setCases(mockCases as any[]);
        setTotal(mockCases.length);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => { fetchCases(ALL, 0, false); }, [fetchCases]);

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setCases([]);
    fetchCases(tag, 0, false);
  };

  const handleLoadMore = () => {
    fetchCases(activeTag, cases.length, true);
  };

  const hasMore = cases.length < total;

  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] bg-radial-gold p-8 text-white shadow-soft lg:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">CASE SALON THỰC TẾ</p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">Before / After và hướng xử lý kỹ thuật</h1>
            <p className="mt-5 max-w-2xl leading-8 text-white/65">Tổng hợp tình huống màu, tẩy, phủ bạc, phục hồi và sửa lỗi thường gặp trong salon Việt.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {categories.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleTagChange(chip)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeTag === chip
                      ? "bg-gold text-black"
                      : "border border-white/15 text-white/75 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </section>
          <section className="mt-10 rounded-[2rem] bg-charcoal p-5 sm:p-6 text-white shadow-soft lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
              <div className="grid grid-cols-2 gap-2">
                {(() => {
                  const feat = cases[0] ? normalizeCase(cases[0]) : null;
                  return (
                    <>
                      <HairVisual
                        src={feat?.imageSrcBefore}
                        imageKey={feat?.imageKeyBefore}
                        aspect="aspect-[4/3] sm:aspect-video"
                        alt={feat ? `${feat.title} before` : "Before"}
                        label="Before"
                      />
                      <HairVisual
                        src={feat?.imageSrcAfter}
                        imageKey={feat?.imageKeyAfter}
                        aspect="aspect-[4/3] sm:aspect-video"
                        alt={feat ? `${feat.title} after` : "After"}
                        label="After"
                      />
                    </>
                  );
                })()}
              </div>
              <div className="flex flex-col justify-center">
                <span className="w-fit rounded-full bg-champagne px-4 py-2 text-xs font-extrabold text-charcoal">Case nổi bật</span>
                <h2 className="mt-5 text-3xl font-black md:text-4xl">{cases[0]?.title ?? "Từ nền đen tự nhiên sang Beige Ash ánh khói sang trọng"}</h2>
                <p className="mt-5 line-clamp-3 leading-8 text-white/65">{cases[0]?.description ?? "Tóc đen tự nhiên, sợi to, đã nhuộm màu tối 2 lần. Mục tiêu là nâng lên level 8–9 nhưng vẫn giữ độ bóng và mềm mượt."}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button className="rounded-full bg-champagne px-6 py-3 font-extrabold text-charcoal">Xem phân tích case</button>
                  <button className="rounded-full border border-gold/30 bg-black/30 px-6 py-3 font-extrabold text-gold hover:text-[#F0C76A]">Xem hướng xử lý</button>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <SectionHeader title="Danh sách case" />
              <p className="text-sm text-warmgray">
                <span className="font-extrabold text-charcoal">{total}</span> case
                {activeTag !== ALL && <span> · <span className="text-gold">{activeTag}</span></span>}
              </p>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-[#D6A84F]" />
              </div>
            ) : cases.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 py-20 text-center">
                <p className="text-lg font-extrabold text-charcoal">Chưa có case nào cho loại này</p>
                <p className="mt-2 text-sm text-warmgray">Thử chọn loại case khác</p>
                <button
                  onClick={() => handleTagChange(ALL)}
                  className="mt-4 rounded-full bg-gold px-5 py-2 text-sm font-bold text-black"
                >
                  Xem tất cả
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {cases.map((item, index) => (
                    <CaseCard key={`${item.id ?? item.title}-${index}`} item={normalizeCase(item)} />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-extrabold text-black transition hover:bg-champagne disabled:opacity-60"
                    >
                      {loadingMore ? <><Loader2 size={16} className="animate-spin" /> Đang tải...</> : "Xem thêm case"}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
