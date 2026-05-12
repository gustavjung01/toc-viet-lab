"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { assetUrl, type ImageAssetKey } from "@/lib/image-assets";

type FeaturedCase = {
  title: string;
  tag: string;
  condition: string;
  goal: string;
  time: string;
  salon: string;
  beforeImage: ImageAssetKey;
  afterImage: ImageAssetKey;
};

const featuredCases: FeaturedCase[] = [
  {
    title: "Từ nền đen tự nhiên sang Beige Ash ánh khói",
    tag: "Nâng tông",
    condition: "Tóc đen tự nhiên, sợi to, khô xơ nhẹ",
    goal: "Level 8–9, beige ash trong và bóng",
    time: "240 phút",
    salon: "Salon Tuấn Nguyễn",
    beforeImage: "case-01-before-nen-den-tu-nhien",
    afterImage: "case-01-after-beige-ash"
  },
  {
    title: "Balayage xám khói trên nền nâu tự nhiên",
    tag: "Balayage",
    condition: "Nền nâu tự nhiên, thân tóc khỏe",
    goal: "Hiệu ứng chuyển màu mềm, ít lộ chân",
    time: "180 phút",
    salon: "The Labs Hair",
    beforeImage: "case-02-before-nen-nau-tu-nhien",
    afterImage: "case-02-after-balayage-xam-khoi"
  },
  {
    title: "Phục hồi và nhuộm nâu socola cho tóc tẩy hư tổn",
    tag: "Phục hồi",
    condition: "Tóc tẩy khô, xốp, thiếu bóng",
    goal: "Nâu socola mềm, giảm xơ, dễ chăm sóc",
    time: "150 phút",
    salon: "Linh Black Hair",
    beforeImage: "case-03-before-toc-tay-hu-ton",
    afterImage: "case-03-after-nau-socola-phuc-hoi"
  }
];

export function FeaturedCases() {
  return (
    <section className="bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold">Case thực tế</span>
            <h2 className="text-2xl font-black text-charcoal sm:text-3xl lg:text-4xl">Phân tích case salon thực tế</h2>
          </div>
          <Link
            href="/case-thuc-te"
            className="group inline-flex items-center gap-2 font-bold text-gold transition-colors hover:text-goldBright"
          >
            Xem tất cả case
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((caseItem) => (
            <Link
              key={caseItem.title}
              href="/case-thuc-te"
              className="group overflow-hidden rounded-[2rem] border border-gold/20 bg-cream-card shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="relative w-1/2 overflow-hidden">
                    <img
                      src={assetUrl(caseItem.beforeImage) ?? ""}
                      alt="Before"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                      TRƯỚC
                    </div>
                  </div>
                  <div className="relative w-1/2 overflow-hidden">
                    <img
                      src={assetUrl(caseItem.afterImage) ?? ""}
                      alt="After"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black">
                      SAU
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {caseItem.tag}
                </span>
                <h3 className="mt-4 text-lg font-black text-charcoal line-clamp-2">{caseItem.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-muted">
                  <p><span className="font-semibold text-charcoal">Tình trạng:</span> {caseItem.condition}</p>
                  <p><span className="font-semibold text-charcoal">Mục tiêu:</span> {caseItem.goal}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-gold/10 pt-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{caseItem.time}</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{caseItem.salon}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
