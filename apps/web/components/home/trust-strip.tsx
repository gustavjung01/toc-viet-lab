"use client";

import { Award, Shield, Star, Users } from "lucide-react";

const trustIndicators = [
  { icon: Users, value: "15.000+", label: "Người làm nghề đang sử dụng" },
  { icon: Award, value: "500+", label: "Salon đối tác" },
  { icon: Star, value: "4.9/5", label: "Đánh giá từ người dùng" },
  { icon: Shield, value: "100%", label: "Nội dung tham khảo chuyên môn" }
];

export function TrustStrip() {
  return (
    <section className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-gold/15 bg-cream-card p-8 shadow-soft">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Đáng tin cậy trong salon</p>
          <h2 className="mt-4 text-3xl font-black text-charcoal sm:text-4xl">Kết quả được tin tưởng bởi thợ tóc Việt</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-3xl border border-gold/10 bg-white/90 p-6 text-charcoal shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-black">{item.value}</div>
                <div className="mt-1 text-sm text-muted">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
