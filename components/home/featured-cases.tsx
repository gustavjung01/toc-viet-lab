"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";

const featuredCases = [
  {
    title: "Từ nền đen tự nhiên sang Beige Ash ánh khói",
    tag: "Nâng tông",
    condition: "Tóc đen tự nhiên, sợi to, khô xơ nhẹ",
    goal: "Level 8–9, beige ash trong và bóng",
    time: "240 phút",
    salon: "Salon Tuấn Nguyễn",
    gradient: "from-[#171717] via-[#7a6046] to-[#d6c0a0]"
  },
  {
    title: "Balayage xám khói trên nền nâu tự nhiên",
    tag: "Balayage",
    condition: "Nền nâu tự nhiên, thân tóc khỏe",
    goal: "Hiệu ứng chuyển màu mềm, ít lộ chân",
    time: "180 phút",
    salon: "The Labs Hair",
    gradient: "from-[#2b2b2b] via-[#8d8a7f] to-[#f0e6cf]"
  },
  {
    title: "Phục hồi và nhuộm nâu socola cho tóc tẩy hư tổn",
    tag: "Phục hồi",
    condition: "Tóc tẩy khô, xốp, thiếu bóng",
    goal: "Nâu socola mềm, giảm xơ, dễ chăm sóc",
    time: "150 phút",
    salon: "Linh Black Hair",
    gradient: "from-[#3a261d] via-[#7b4f35] to-[#c9a45c]"
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
              {/* Visual gradient header */}
              <div className={`h-32 bg-gradient-to-br ${caseItem.gradient} relative`}>
                <div className="absolute inset-0 bg-black/10" />
                <span className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
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
