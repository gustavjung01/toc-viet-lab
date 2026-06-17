"use client";

import { useState } from "react";
import { BookmarkButton } from "@/components/bookmark-button";
import { HairVisual } from "@/components/visual";
import { articles, cases } from "@/lib/data";
import { toAssetUrl } from "@/lib/asset-url";
import { Clock, X } from "lucide-react";

type PreviewItem = {
  type: "article" | "case";
  id: string;
  title: string;
  eyebrow: string;
  meta: string;
  imageSrc?: string;
  imageKey?: string;
  body: string;
  bullets: string[];
  saveId: string;
};

function articlePreview(article: any): PreviewItem {
  return {
    type: "article",
    id: article.slug,
    title: article.title,
    eyebrow: article.category,
    meta: `${article.level} • ${article.minutes} phút`,
    imageSrc: toAssetUrl(article.src ?? article.imageUrl ?? article.image_key ?? article.imageKey),
    body: article.excerpt,
    bullets: [
      `Cấp độ: ${article.level}`,
      `Thời gian đọc: ${article.minutes} phút`,
      "Bấm bookmark để lưu vào sổ tay và đọc lại bằng popup tại trang tài khoản.",
    ],
    saveId: article.slug,
  };
}

function casePreview(item: any): PreviewItem {
  return {
    type: "case",
    id: item.id ?? item.title,
    title: item.title,
    eyebrow: item.tag,
    meta: `${item.salon} • ${item.time}`,
    imageKey: item.imageKeyAfter,
    body: `Tình trạng: ${item.condition}. Mục tiêu: ${item.goal}.`,
    bullets: [
      `Salon: ${item.salon}`,
      `Thời gian xử lý: ${item.time}`,
      `Mục tiêu: ${item.goal}`,
    ],
    saveId: item.id ?? item.title,
  };
}

export function DashboardContentPreview() {
  const [selected, setSelected] = useState<PreviewItem | null>(null);
  const articleItems = articles.slice(0, 3).map(articlePreview);
  const caseItems = cases.map(casePreview);

  return (
    <>
      <section className="mt-10">
        <div className="mb-7">
          <h2 className="text-2xl font-extrabold tracking-tight text-charcoal md:text-4xl">Tiếp tục học</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {articleItems.map((item) => (
            <article key={item.id} className="card-hover overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
              <button type="button" onClick={() => setSelected(item)} className="block w-full text-left">
                <HairVisual
                  src={item.imageSrc}
                  alt={item.title}
                  aspect="aspect-[4/3] sm:aspect-video"
                  className="rounded-none"
                  label={item.eyebrow}
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-champagne/15 px-3 py-1 text-xs font-bold text-charcoal">{item.eyebrow}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-mutedLight"><Clock size={14} /> {item.meta}</span>
                  </div>
                  <h3 className="line-clamp-2 text-lg font-extrabold leading-snug text-charcoal">{item.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-mutedLight">{item.body}</p>
                </div>
              </button>
              <div className="flex items-center justify-between px-5 pb-5">
                <button type="button" onClick={() => setSelected(item)} className="text-sm font-extrabold text-charcoal">Đọc tại đây</button>
                <BookmarkButton itemType="article" itemId={item.saveId} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-7">
          <h2 className="text-2xl font-extrabold tracking-tight text-charcoal md:text-4xl">Case gần đây</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {caseItems.map((item) => (
            <article key={item.id} className="card-hover overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
              <button type="button" onClick={() => setSelected(item)} className="block w-full text-left">
                <HairVisual
                  imageKey={item.imageKey}
                  alt={item.title}
                  aspect="aspect-[4/3] sm:aspect-video"
                  className="rounded-none"
                  label={item.eyebrow}
                />
                <div className="p-5">
                  <span className="rounded-full bg-charcoal px-3 py-1 text-xs font-bold text-champagne">{item.eyebrow}</span>
                  <h3 className="mt-4 line-clamp-2 text-lg font-extrabold leading-snug text-charcoal">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-mutedLight">{item.body}</p>
                </div>
              </button>
              <div className="flex items-center justify-between px-5 pb-5">
                <button type="button" onClick={() => setSelected(item)} className="text-sm font-extrabold text-charcoal">Xem tại đây</button>
                <BookmarkButton itemType="case" itemId={item.saveId} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 text-charcoal shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-goldText">{selected.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-black leading-tight text-charcoal md:text-3xl">{selected.title}</h2>
                <p className="mt-2 text-sm font-semibold text-mutedLight">{selected.meta}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="rounded-full bg-black/5 p-2 text-charcoal transition hover:bg-black/10" title="Đóng">
                <X size={20} />
              </button>
            </div>
            <p className="mt-6 text-sm font-semibold leading-7 text-mutedLight">{selected.body}</p>
            <div className="mt-6 space-y-3 rounded-3xl bg-cream p-5">
              {selected.bullets.map((line) => (
                <p key={line} className="text-sm font-bold leading-6 text-charcoal">• {line}</p>
              ))}
            </div>
            <button type="button" onClick={() => setSelected(null)} className="mt-6 rounded-full bg-charcoal px-6 py-3 text-sm font-extrabold text-champagne">
              Đóng lại
            </button>
          </div>
        </div>
      )}
    </>
  );
}
