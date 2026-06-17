"use client";

import { Award, Shield, Star, Users } from "lucide-react";

const trustIndicators = [
  { icon: Users, value: "15.000+", label: "Người dùng" },
  { icon: Award, value: "500+", label: "Salon" },
  { icon: Star, value: "4.9/5", label: "Đánh giá" },
  { icon: Shield, value: "Chuyên môn", label: "Tham khảo" }
];

export function TrustStrip() {
  return (
    <section className="bg-cream px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-gold/15 bg-cream-card p-5 shadow-soft sm:p-8">
        <div className="mb-5 text-center sm:mb-8">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gold sm:text-sm">Đáng tin cậy trong salon</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-black leading-tight text-charcoal sm:text-4xl">
            Kết quả được tin tưởng bởi thợ tóc Việt
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {trustIndicators.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-3xl border border-gold/10 bg-white/90 p-4 text-charcoal shadow-sm sm:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold sm:mb-4 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-2xl font-black sm:text-3xl">{item.value}</div>
                <div className="mt-1 text-xs font-semibold text-muted sm:text-sm">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
