"use client";

import { 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Bookmark,
  Star,
  Clock
} from "lucide-react";

export default function UiKitPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-gold/10 bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-black text-white sm:text-3xl">UI Kit</h1>
          <p className="mt-2 text-sm text-white/60">Design system cho Tóc Việt Lab</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
        {/* Color Palette */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Color Palette</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "black", hex: "#050505", text: "white" },
              { name: "card", hex: "#0E0D0B", text: "white" },
              { name: "softblack", hex: "#171410", text: "white" },
              { name: "gold", hex: "#D6A84F", text: "black" },
              { name: "lightgold", hex: "#F0C76A", text: "black" },
              { name: "cream", hex: "#F8F1E7", text: "black" },
              { name: "softcream", hex: "#FFF8EE", text: "black" },
              { name: "muted", hex: "#B9AEA1", text: "black" },
              { name: "olive", hex: "#637A4D", text: "white" },
              { name: "clay", hex: "#C56A3A", text: "white" }
            ].map((color) => (
              <div key={color.name} className="overflow-hidden rounded-xl border border-gold/10">
                <div className="h-20" style={{ backgroundColor: color.hex }} />
                <div className="bg-white p-3">
                  <p className="font-bold text-black">{color.name}</p>
                  <p className="text-xs text-muted">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Typography</h2>
          <div className="space-y-4 rounded-2xl border border-gold/10 bg-white p-6">
            <h1 className="text-4xl font-black text-black">Heading 1 - Tóc Việt Lab</h1>
            <h2 className="text-3xl font-black text-black">Heading 2 - Khám phá kiến thức</h2>
            <h3 className="text-2xl font-bold text-black">Heading 3 - Công thức màu</h3>
            <p className="text-base leading-relaxed text-black">
              Body text - Tóc Việt Lab giúp thợ tóc và salon Việt hệ thống hóa kiến thức, 
              lưu lại công thức nhuộm, phân tích case màu và tạo nội dung tư vấn khách hàng.
            </p>
            <p className="text-sm text-muted">Small text / Caption - Đọc 8 phút</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Label / Tag</p>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Buttons</h2>
          <div className="space-y-4 rounded-2xl border border-gold/10 bg-white p-6">
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-black shadow-gold transition-all hover:brightness-110">
                Primary Button
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 px-6 py-3 font-bold text-black transition-all hover:bg-gold/10">
                Secondary Button
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-card px-6 py-3 font-bold text-white transition-all hover:bg-softblack">
                Dark Button
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 font-bold text-white transition-all hover:border-gold/50 hover:bg-white/5">
                Ghost Button
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-black">
                Small
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black">
                Medium
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-bold text-black">
                Large
              </button>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Badges</h2>
          <div className="flex flex-wrap gap-3 rounded-2xl border border-gold/10 bg-white p-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-black">
              <Sparkles className="h-3 w-3" />
              Popular
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-olive px-3 py-1 text-xs font-bold text-white">
              <CheckCircle className="h-3 w-3" />
              Verified
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-clay px-3 py-1 text-xs font-bold text-white">
              Hot
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-softblack px-3 py-1 text-xs font-bold text-white">
              New
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-transparent px-3 py-1 text-xs font-bold text-gold">
              Premium
            </span>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Article Card */}
            <div className="overflow-hidden rounded-2xl border border-gold/10 bg-white transition-all hover:border-gold/30 hover:shadow-gold-sm">
              <div className="h-32 bg-gradient-to-br from-[#2d1d14] via-[#85613b] to-[#d7bd83]" />
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-gold">Kỹ thuật nhuộm</span>
                  <span className="text-xs text-muted">• 8 phút đọc</span>
                </div>
                <h3 className="mb-2 font-bold text-black line-clamp-2">
                  Vì sao tóc nền 5 nhuộm nâu lạnh dễ bị ánh cam?
                </h3>
                <p className="text-sm text-muted line-clamp-2">
                  Phân tích sắc tố nền, ánh cam và nguyên tắc kiểm soát màu lạnh.
                </p>
              </div>
            </div>

            {/* Case Card */}
            <div className="overflow-hidden rounded-2xl border border-gold/10 bg-white transition-all hover:border-gold/30 hover:shadow-gold-sm">
              <div className="h-32 bg-gradient-to-br from-[#171717] via-[#7a6046] to-[#d6c0a0] relative">
                <span className="absolute left-3 top-3 rounded-full bg-black/30 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  Nâng tông
                </span>
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-bold text-black line-clamp-2">
                  Từ nền đen tự nhiên sang Beige Ash
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-muted">Tình trạng:</span>
                    <span className="text-black/80">Tóc đen tự nhiên</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted">Mục tiêu:</span>
                    <span className="text-black/80">Level 8–9, beige ash</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Card */}
            <div className="overflow-hidden rounded-2xl border border-gold/10 bg-softcream p-4 transition-all hover:border-gold/30 hover:shadow-gold-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-gold/10 px-2 py-1 text-xs font-bold text-gold">
                  Balayage
                </span>
              </div>
              <h3 className="mb-3 font-bold text-black">Lạnh khói ánh rêu</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Nền:</span>
                  <span className="font-medium text-black">Level 6 - vàng cam</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Oxy:</span>
                  <span className="font-medium text-black">6% / 20 vol</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Tỷ lệ:</span>
                  <span className="font-medium text-black">1 : 1.5</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Card */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Pricing Card</h2>
          <div className="max-w-sm rounded-3xl border border-gold bg-white p-6 shadow-gold">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-black">
                <Sparkles className="h-3 w-3" />
                Phổ biến nhất
              </span>
            </div>
            <div className="mb-4">
              <h3 className="mb-1 text-lg font-bold text-black">Pro</h3>
              <p className="text-sm text-muted">Dành cho thợ chuyên nghiệp</p>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-gold">99K</span>
              <span className="text-sm text-muted">/tháng</span>
            </div>
            <ul className="mb-6 space-y-3">
              {["Đọc không giới hạn", "AI 200 credit/tháng", "Tải tài liệu PDF"].map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-gold" />
                  <span className="text-black/80">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full rounded-full bg-gold px-6 py-3 font-bold text-black transition-all hover:brightness-110">
              Nâng cấp Pro
            </button>
          </div>
        </section>

        {/* Input / Search */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Input & Search</h2>
          <div className="space-y-4 rounded-2xl border border-gold/10 bg-white p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, công thức..."
                className="w-full rounded-full border border-gold/20 bg-softcream py-3 pl-10 pr-4 text-sm text-black placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 rounded-xl border border-gold/20 bg-softcream px-4 py-3 text-sm text-black placeholder:text-muted focus:border-gold focus:outline-none"
              />
              <button className="rounded-xl bg-gold px-6 py-3 font-bold text-black transition-all hover:brightness-110">
                Đăng ký
              </button>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section>
          <h2 className="mb-6 text-lg font-bold text-black">Icons</h2>
          <div className="flex flex-wrap gap-4 rounded-2xl border border-gold/10 bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-olive/20">
              <CheckCircle className="h-5 w-5 text-olive" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-clay/20">
              <Star className="h-5 w-5 text-clay" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-softblack">
              <Bookmark className="h-5 w-5 text-gold" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30">
              <Clock className="h-5 w-5 text-gold" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
