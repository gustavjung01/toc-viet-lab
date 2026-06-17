"use client";

import Link from "next/link";
import { ArrowRight, Layers, Palette, FlaskConical, Gem, ClipboardCheck, Sparkles, Scissors, Users } from "lucide-react";

const categories = [
  { title: "Nền tóc", count: "128 bài", icon: Layers, href: "/kien-thuc/nen-toc" },
  { title: "Nhuộm màu", count: "842 bài", icon: Palette, href: "/kien-thuc/nhuom-mau" },
  { title: "Tẩy nền", count: "246 bài", icon: FlaskConical, href: "/kien-thuc/tay-nen" },
  { title: "Phủ bạc", count: "118 bài", icon: Gem, href: "/kien-thuc/phu-bac" },
  { title: "Sửa lỗi", count: "164 bài", icon: ClipboardCheck, href: "/kien-thuc/sua-loi" },
  { title: "Phục hồi", count: "204 bài", icon: Sparkles, href: "/kien-thuc/phuc-hoi" },
  { title: "Cắt tóc", count: "312 bài", icon: Scissors, href: "/kien-thuc/cat-toc" },
  { title: "Kinh doanh", count: "132 bài", icon: Users, href: "/kien-thuc/kinh-doanh" }
];

export function CategoryGrid() {
  return (
    <section className="bg-cream px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[0.2em] text-gold">Danh mục kiến thức</span>
            <h2 className="text-2xl font-black text-charcoal sm:text-3xl lg:text-4xl">Khám phá theo chuyên đề</h2>
          </div>
          <Link
            href="/kien-thuc"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-black text-gold transition-colors hover:text-[#F0C76A]"
          >
            Tất cả
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-3xl border border-gold/15 bg-cream-card p-4 transition-all duration-300 hover:border-gold/30 hover:shadow-gold-sm sm:p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-105 sm:mb-5 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mb-1 text-sm font-black leading-tight text-charcoal transition-colors group-hover:text-gold sm:text-lg">{category.title}</h3>
                <p className="text-xs font-semibold text-muted sm:text-sm">{category.count}</p>
                <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:bottom-6 sm:right-6 sm:h-5 sm:w-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
