"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Bookmark, FlaskConical, StickyNote } from "lucide-react";
import { assetUrl } from "@/lib/image-assets";

const notebookItems = [
  {
    title: "Lưu bài học & công thức",
    description: "Ghi lại công thức màu đã thử nghiệm và kết quả trên từng loại tóc",
    icon: Bookmark
  },
  {
    title: "Tạo sổ tay cá nhân",
    description: "Tổ chức kiến thức theo cách của bạn, dễ dàng tìm kiếm khi cần",
    icon: StickyNote
  },
  {
    title: "Lưu trữ công thức",
    description: "Lưu công thức pha màu với ghi chú tỷ lệ, thời gian, và đánh giá",
    icon: FlaskConical
  },
  {
    title: "Đọc bài chuyên sâu",
    description: "Truy cập 2.500+ bài viết về kỹ thuật tóc từ cơ bản đến nâng cao",
    icon: BookOpen
  }
];

export function MemberNotebook() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Content */}
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Sổ tay thành viên
            </span>
            <h2 className="mb-4 text-2xl font-black text-black sm:text-3xl lg:text-4xl">
              Ghi chép và lưu trữ kiến thức của riêng bạn
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted">
              Mỗi thợ tóc có cách làm việc và công thức riêng. Tóc Việt Lab giúp bạn 
              lưu lại mọi thứ một cách có tổ chức, dễ dàng tra cứu khi cần.
            </p>
            <Link
              href="/so-tay"
              className="group inline-flex items-center gap-2 font-bold text-gold transition-colors hover:text-clay"
            >
              Khám phá sổ tay
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right - Notebook Preview Image */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/10">
              <img
                src={assetUrl("hero-member-notebook")}
                alt="Sổ tay thành viên"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Right - Feature Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {notebookItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gold/10 bg-softcream p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-gold-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-black">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
