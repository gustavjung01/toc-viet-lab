"use client";

import Link from "next/link";
import { ArrowRight, Layers, Palette, FlaskConical, Gem, ClipboardCheck, Sparkles, Scissors, Users } from "lucide-react";

const categories = [
  { title: "Nền tóc & level", count: "128 bài", icon: Layers, href: "/kien-thuc/nen-toc" },
  { title: "Nhuộm màu", count: "842 bài", icon: Palette, href: "/kien-thuc/nhuom-mau" },
  { title: "Tẩy & nâng nền", count: "246 bài", icon: FlaskConical, href: "/kien-thuc/tay-nen" },
  { title: "Phủ bạc", count: "118 bài", icon: Gem, href: "/kien-thuc/phu-bac" },
  { title: "Sửa lỗi màu", count: "164 bài", icon: ClipboardCheck, href: "/kien-thuc/sua-loi" },
  { title: "Phục hồi tóc", count: "204 bài", icon: Sparkles, href: "/kien-thuc/phuc-hoi" },
  { title: "Cắt tạo kiểu", count: "312 bài", icon: Scissors, href: "/kien-thuc/cat-toc" },
  { title: "Kinh doanh salon", count: "132 bài", icon: Users, href: "/kien-thuc/kinh-doanh" }
];

export function CategoryGrid() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Danh mục kiến thức
            </span>
            <h2 className="text-2xl font-black text-black sm:text-3xl lg:text-4xl">
              Khám phá theo chuyên đề
            </h2>
          </div>
          <Link
            href="/kien-thuc"
            className="group inline-flex items-center gap-2 font-bold text-gold transition-colors hover:text-clay"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl border border-gold/10 bg-softcream p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-gold-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-clay/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-1 text-base font-bold text-black transition-colors group-hover:text-gold">
                  {category.title}
                </h3>
                <p className="text-sm text-muted">{category.count}</p>
                <ArrowRight className="absolute bottom-5 right-5 h-5 w-5 text-gold opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
