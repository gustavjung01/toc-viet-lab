"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { assetUrl } from "@/lib/image-assets";

interface HeroStats {
  value: string;
  label: string;
}

const stats: HeroStats[] = [
  { value: "2.500+", label: "Bài học" },
  { value: "1.200+", label: "Công thức" },
  { value: "15.000+", label: "Thành viên" }
];

export function HeroSection() {
  return (
    <section className="luxury-hero-bg relative min-h-[calc(100vh-80px)] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      {/* Background overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Left column - Content */}
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/5 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
            <Sparkles size={14} />
            Nền tảng tri thức & công cụ ngành tóc
          </div>
          
          <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl">
            Học kỹ thuật tóc chuyên sâu.{" "}
            <span className="text-gold">Lưu công thức màu.</span>{" "}
            <span className="text-lightgold">Hỏi AI theo tình huống salon thực tế.</span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Tóc Việt Lab giúp thợ tóc và salon Việt hệ thống hóa kiến thức, lưu lại công thức nhuộm, 
            phân tích case màu và tạo nội dung tư vấn khách hàng.
          </p>
          
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-extrabold text-black shadow-gold transition-all hover:brightness-110 hover:shadow-gold-lg"
            >
              Đăng ký miễn phí
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/kien-thuc"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-extrabold text-white transition-all hover:border-gold/50 hover:bg-white/5"
            >
              Khám phá kiến thức
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:border-gold/30 sm:rounded-3xl sm:p-4"
              >
                <div className="text-xl font-black text-gold sm:text-2xl">{value}</div>
                <div className="text-xs font-semibold text-white/55 sm:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Hero Image */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl">
            {/* Hero salon image */}
            <img
              src={assetUrl("hero-salon-desktop")}
              alt="Salon tóc chuyên nghiệp"
              className="absolute inset-0 h-full w-full object-cover"
            />
            
            {/* Gradient overlay for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Gold border effect */}
            <div className="absolute inset-0 rounded-3xl border border-gold/20" />
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-gold/30 bg-card/95 p-4 shadow-gold backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
                <CheckCircle2 className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Được tin dùng</div>
                <div className="text-xs text-white/60">bởi 500+ salon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
