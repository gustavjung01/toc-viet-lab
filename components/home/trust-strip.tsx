"use client";

import { Award, Shield, Star, Users } from "lucide-react";

const trustIndicators = [
  {
    icon: Users,
    value: "15,000+",
    label: "Thành viên tin dùng"
  },
  {
    icon: Award,
    value: "500+",
    label: "Salon đối tác"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Đánh giá từ người dùng"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Nội dung chuyên gia"
  }
];

export function TrustStrip() {
  return (
    <section className="border-y border-gold/10 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <div className="text-xl font-black text-black">{item.value}</div>
                  <div className="text-sm text-muted">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
