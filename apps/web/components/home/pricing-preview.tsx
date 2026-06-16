"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Miễn phí",
    price: "0₫",
    period: "",
    description: "Khởi đầu nhanh",
    features: [
      "Tra cứu 10 nội dung/ngày",
      "Lưu 20 công thức",
      "Sử dụng AI cơ bản",
      "Tham gia cộng đồng"
    ],
    cta: "Đăng ký ngay",
    href: "/login",
    popular: false
  },
  {
    name: "Pro",
    price: "99.000đ",
    period: "/tháng",
    description: "Dành cho thợ chuyên nghiệp",
    features: [
      "Tra cứu không giới hạn",
      "Lưu không giới hạn",
      "AI nâng cao (200 lượt/tháng)",
      "Tải tài liệu PDF",
      "Hỗ trợ ưu tiên"
    ],
    cta: "Nâng cấp Pro",
    href: "/goi-thanh-vien",
    popular: true
  },
  {
    name: "Salon",
    price: "299.000đ",
    period: "/tháng",
    description: "Dành cho salon & team",
    features: [
      "Tất cả tính năng Pro",
      "5 tài khoản thành viên",
      "AI không giới hạn",
      "Tư vấn 1-1",
      "Đào tạo nội bộ"
    ],
    cta: "Liên hệ",
    href: "/goi-thanh-vien",
    popular: false
  }
];

export function PricingPreview() {
  return (
    <section className="bg-softcream px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Gói sử dụng
          </span>
          <h2 className="mb-4 text-2xl font-black text-black sm:text-3xl lg:text-4xl">
            Chọn gói phù hợp
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted">
            Đầu tư vào kiến thức là đầu tư sinh lời nhất. Chọn gói phù hợp với nhu cầu của bạn.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 ${
                plan.popular
                  ? "border-gold bg-white shadow-gold"
                  : "border-gold/10 bg-white hover:border-gold/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-black">
                    <Sparkles className="h-3 w-3" />
                    Phổ biến nhất
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-1 text-lg font-bold text-black">{plan.name}</h3>
                <p className="text-sm text-muted">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-black text-gold">{plan.price}</span>
                <span className="text-sm text-muted">{plan.period}</span>
              </div>

              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={`h-4 w-4 flex-shrink-0 ${plan.popular ? "text-gold" : "text-olive"}`} />
                    <span className="text-black/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  plan.popular
                    ? "bg-gold text-black hover:brightness-110"
                    : "border border-gold/30 text-black hover:bg-gold/10"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
