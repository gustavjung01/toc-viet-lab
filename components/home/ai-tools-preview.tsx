"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Camera, FlaskConical, PenLine, Sparkles } from "lucide-react";
import { assetUrl } from "@/lib/image-assets";

const aiTools = [
  {
    title: "AI tư vấn màu",
    description: "Phân tích nền tóc, mục tiêu màu và rủi ro kỹ thuật",
    icon: BrainCircuit,
    color: "from-gold/20 to-lightgold/20",
    imageKey: "ai-tu-van-mau"
  },
  {
    title: "Gợi ý công thức",
    description: "Tạo công thức tham khảo theo nền, tông và tình trạng tóc",
    icon: FlaskConical,
    color: "from-olive/20 to-gold/20",
    imageKey: "ai-goi-y-cong-thuc"
  },
  {
    title: "Tạo phiếu tư vấn",
    description: "Viết nội dung giải thích dễ hiểu cho khách salon",
    icon: PenLine,
    color: "from-clay/20 to-gold/20",
    imageKey: "ai-tao-phieu-tu-van"
  },
  {
    title: "Phân tích ảnh tóc",
    description: "Đánh giá tình trạng tóc từ ảnh before/after",
    icon: Camera,
    color: "from-gold/20 to-clay/20",
    imageKey: "ai-phan-tich-anh-toc"
  }
];

export function AiToolsPreview() {
  return (
    <section className="bg-card px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                Công cụ AI
              </span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              Trợ lý AI cho salon tóc
            </h2>
          </div>
          <Link
            href="/cong-cu-ai"
            className="group inline-flex items-center gap-2 font-bold text-gold transition-colors hover:text-lightgold"
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
                className="group relative overflow-hidden rounded-2xl border border-gold/10 bg-softblack transition-all duration-300 hover:border-gold/30"
              >
                {/* AI Tool Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={tool.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-softblack via-softblack/50 to-transparent" />
                </div>
                
                <div className="relative p-5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                  <div className="relative">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 transition-colors group-hover:bg-gold/20">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-white transition-colors group-hover:text-gold">
                      {tool.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">{tool.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-10 rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/10 to-transparent p-6 sm:rounded-3xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="mb-1 text-lg font-bold text-white">Thử AI ngay</h3>
              <p className="text-sm text-white/70">Đăng ký miễn phí và nhận 50 credit AI đầu tiên</p>
            </div>
            <Link
              href="/cong-cu-ai"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-black transition-all hover:brightness-110"
            >
              Trải nghiệm AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
