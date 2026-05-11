"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

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
            {/* Placeholder gradient for salon image */}
            <div className="absolute inset-0 bg-gradient-to-br from-softblack via-card to-softblack">
              {/* Decorative elements representing salon/hair theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-lightgold/10" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Abstract hair strand graphics */}
              <svg
                className="absolute inset-0 h-full w-full opacity-30"
                viewBox="0 0 400 500"
                fill="none"
              >
                <path
                  d="M50 100 Q100 50 150 100 T250 100 T350 150"
                  stroke="url(#heroGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M30 200 Q80 150 130 200 T230 200 T330 250"
                  stroke="url(#heroGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M70 300 Q120 250 170 300 T270 300 T370 350"
                  stroke="url(#heroGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M20 400 Q70 350 120 400 T220 400 T320 450"
                  stroke="url(#heroGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D6A84F" />
                    <stop offset="50%" stopColor="#F0C76A" />
                    <stop offset="100%" stopColor="#C56A3A" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/10">
                    <Sparkles className="h-10 w-10 text-gold" />
                  </div>
                  <p className="text-sm font-medium text-white/50">Ảnh salon</p>
                  <p className="text-xs text-white/30">hero-salon.jpg</p>
                </div>
              </div>
            </div>
            
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
