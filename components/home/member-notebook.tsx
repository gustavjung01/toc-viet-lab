"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Bookmark, FlaskConical, StickyNote } from "lucide-react";
import { assetUrl } from "@/lib/image-assets";

const notebookItems = [
  { title: "Lưu công thức & ghi chú", description: "Ghi lại công thức màu đã thử nghiệm và kết quả trên từng loại tóc", icon: Bookmark },
  { title: "Tạo sổ tay kỹ thuật", description: "Tổ chức ghi chú và công thức theo phong cách salon chuyên nghiệp", icon: StickyNote },
  { title: "Lưu trữ công thức", description: "Ghi nhớ tỷ lệ pha màu, thời gian xử lý và chú ý quan trọng", icon: FlaskConical },
  { title: "Tra cứu chủ đề chuyên sâu", description: "Tìm nhanh nội dung tham khảo kỹ thuật và case salon", icon: BookOpen }
];

export function MemberNotebook() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold">Sổ tay nghề tóc</span>
            <h2 className="mb-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">Ghi chép và lưu trữ kỹ thuật riêng của bạn</h2>
            <p className="mb-6 text-base leading-relaxed text-muted">
              Mỗi thợ tóc có cách làm việc và công thức riêng. Tóc Việt Lab giúp bạn lưu lại mọi thứ một cách có tổ chức, dễ dàng tra cứu khi cần.
            </p>
            <Link
              href="/so-tay"
              className="group inline-flex items-center gap-2 font-bold text-gold transition-colors hover:text-goldBright"
            >
              Khám phá sổ tay
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative hidden overflow-hidden rounded-[2rem] border border-gold/20 bg-cardDark p-4 shadow-gold/10 lg:block">
            <img
              src={assetUrl("hero-member-notebook") ?? ""}
              alt="Sổ tay thành viên"
              className="h-full w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {notebookItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.75rem] border border-gold/15 bg-cardDark p-5 text-white shadow-soft">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
