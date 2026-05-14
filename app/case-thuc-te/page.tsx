"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseCard, SectionHeader } from "@/components/cards";
import { HairVisual } from "@/components/visual";
import { cases } from "@/lib/data";

const FILTER_CHIPS = ["Tất cả loại case", "Nâng tông", "Màu khói", "Phục hồi", "Phủ bạc", "Balayage"];

export default function CasePage() {
  const [activeTag, setActiveTag] = useState("Tất cả loại case");

  const filtered = useMemo(() => {
    if (activeTag === "Tất cả loại case") return cases;
    return cases.filter((c) => c.tag === activeTag);
  }, [activeTag]);

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
              {FILTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setActiveTag(chip)}
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
          <section className="mt-10 rounded-[2rem] bg-charcoal p-6 text-white shadow-soft lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
              <div className="grid grid-cols-2 gap-2">
                <HairVisual className="h-80" imageKey={cases[0].imageKeyBefore} alt={`${cases[0].title} before`} label="Before" />
                <HairVisual className="h-80" imageKey={cases[0].imageKeyAfter} alt={`${cases[0].title} after`} label="After" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="w-fit rounded-full bg-champagne px-4 py-2 text-xs font-extrabold text-charcoal">Case nổi bật</span>
                <h2 className="mt-5 text-3xl font-black md:text-4xl">Từ nền đen tự nhiên sang Beige Ash ánh khói sang trọng</h2>
                <p className="mt-5 leading-8 text-white/65">Tóc đen tự nhiên, sợi to, đã nhuộm màu tối 2 lần. Mục tiêu là nâng lên level 8–9 nhưng vẫn giữ độ bóng và mềm mượt.</p>
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
                <span className="font-extrabold text-charcoal">{filtered.length}</span> case
                {activeTag !== "Tất cả loại case" && <span> · <span className="text-gold">{activeTag}</span></span>}
              </p>
            </div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 py-20 text-center">
                <p className="text-lg font-extrabold text-charcoal">Chưa có case nào cho loại này</p>
                <p className="mt-2 text-sm text-warmgray">Thử chọn loại case khác</p>
                <button
                  onClick={() => setActiveTag("Tất cả loại case")}
                  className="mt-4 rounded-full bg-gold px-5 py-2 text-sm font-bold text-black"
                >
                  Xem tất cả
                </button>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-3">
                {filtered.map((item, index) => (
                  <CaseCard key={`${item.title}-${index}`} item={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
