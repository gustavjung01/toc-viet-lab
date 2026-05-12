"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { assetUrl } from "@/lib/image-assets";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,168,79,.16),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(214,168,79,.1),transparent_30%),linear-gradient(180deg,#030303 0%,#080706 48%,#11100E 100%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/5 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
              <Sparkles size={14} />
              NỀN TẢNG TRI THỨC NGÀNH TÓC
            </div>
            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.5rem]">
              Tra cứu kỹ thuật tóc.
              <span className="text-gold"> Lưu công thức màu.</span>
              <span className="text-gold-bright"> Xử lý case salon thực tế.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Không gian dành cho thợ tóc và salon Việt hệ thống hóa công thức, phân tích tình huống màu và chuẩn hóa tư vấn khách hàng.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kien-thuc"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-7 py-4 font-extrabold text-black shadow-gold transition-all hover:brightness-110"
              >
                Khám phá nội dung
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/case-thuc-te"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-black/40 px-7 py-4 font-extrabold text-gold transition-all hover:border-gold/40 hover:text-gold-bright"
              >
                Xem case thực tế
              </Link>
            </div>
          </div>

          <div className="relative flex justify-end">
            <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-gold/20 bg-black/30">
              <picture>
                <source srcSet={assetUrl("hero-salon-mobile") ?? ""} media="(max-width: 1023px)" />
                <img
                  src={assetUrl("hero-salon-desktop") ?? ""}
                  alt="Salon tóc chuyên nghiệp"
                  className="h-full w-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute left-5 bottom-5 rounded-full bg-black/70 px-4 py-3 text-sm font-semibold text-cream-card">
                Thiết kế cho salon Việt
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
