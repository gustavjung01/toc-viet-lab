"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Camera, FlaskConical, PenLine, Sparkles } from "lucide-react";
import { assetUrl } from "@/lib/image-assets";

const aiTools = [
  { title: "AI tư vấn màu", description: "Phân tích nền tóc, mục tiêu màu và rủi ro kỹ thuật", icon: BrainCircuit, imageKey: "ai-tu-van-mau" },
  { title: "Gợi ý công thức", description: "Tạo công thức tham khảo theo nền, tông và tình trạng tóc", icon: FlaskConical, imageKey: "ai-goi-y-cong-thuc" },
  { title: "Tạo phiếu tư vấn", description: "Viết nội dung giải thích dễ hiểu cho khách salon", icon: PenLine, imageKey: "ai-tao-phieu-tu-van" },
  { title: "Phân tích ảnh tóc", description: "Đánh giá tình trạng tóc từ ảnh before/after", icon: Camera, imageKey: "ai-phan-tich-anh-toc" }
];

export function AiToolsPreview() {
  return (
    <section className="bg-card-dark px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold">
              <Sparkles className="h-4 w-4 text-gold" />
              Công cụ AI
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">Công cụ hỗ trợ tư vấn salon</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
              Bộ công cụ hỗ trợ phân tích tình huống, công thức màu và nội dung tư vấn khách salon.
            </p>
          </div>
          <Link
            href="/cong-cu-ai"
            className="group inline-flex items-center gap-2 font-bold text-gold transition-colors hover:text-gold-bright"
          >
            Khám phá AI
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            const imageUrl = assetUrl(tool.imageKey as any);
            return (
              <Link
                key={tool.title}
                href="/cong-cu-ai"
                className="group relative overflow-hidden rounded-[2rem] border border-gold/15 bg-black/20 transition-all duration-300 hover:border-gold/30 hover:-translate-y-1"
              >
                <div className="relative h-36 overflow-hidden rounded-t-[1.75rem]">
                  <img
                    src={imageUrl ?? ""}
                    alt={tool.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="relative p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white transition-colors group-hover:text-gold">{tool.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
