"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { assetUrl } from "@/lib/image-assets";

const featuredCases = [
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
    <section className="bg-softcream px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Case thực tế
            </span>
            <h2 className="text-2xl font-black text-black sm:text-3xl lg:text-4xl">
              Học từ tình huống salon thực tế
            </h2>
          </div>
          <Link
            href="/case-thuc-te"
            className="group inline-flex items-center gap-2 font-bold text-gold transition-colors hover:text-clay"
          >
            Xem tất cả case
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((caseItem) => (
            <Link
              key={caseItem.title}
              href="/case-thuc-te"
              className="group relative overflow-hidden rounded-3xl border border-gold/10 bg-white transition-all duration-300 hover:border-gold/30 hover:shadow-gold-sm"
            >
              {/* Before/After images */}
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 flex">
                  {/* Before image */}
                  <div className="relative w-1/2 overflow-hidden">
                    <img
                      src={assetUrl(caseItem.beforeImage as any)}
                      alt="Trước"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs font-bold text-white">
                      TRƯỚC
                    </div>
                  </div>
                  {/* After image */}
                  <div className="relative w-1/2 overflow-hidden">
                    <img
                      src={assetUrl(caseItem.afterImage as any)}
                      alt="Sau"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 rounded bg-gold/90 px-2 py-1 text-xs font-bold text-black">
                      SAU
                    </div>
                  </div>
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  {caseItem.tag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="mb-3 text-lg font-bold leading-tight text-black transition-colors group-hover:text-gold line-clamp-2">
                  {caseItem.title}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-semibold text-muted">Tình trạng:</span>
                    <span className="text-black/80">{caseItem.condition}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-semibold text-muted">Mục tiêu:</span>
                    <span className="text-black/80">{caseItem.goal}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 border-t border-gold/10 pt-4 text-xs">
                  <div className="flex items-center gap-1 text-muted">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{caseItem.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{caseItem.salon}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
