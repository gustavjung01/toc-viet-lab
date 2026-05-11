"use client";

import { AlertTriangle, HelpCircle } from "lucide-react";

const problems = [
  "Nhuộm lên tóc khách không đúng tông",
  "Màu bị rêu, xanh, hoặc loang lổ",
  "Không biết sửa màu khi tóc bị hư",
  "Thiếu tư duy pha màu theo nền tóc"
];

export function ProblemStrip() {
  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-gold/20 bg-card/95 p-5 shadow-lg backdrop-blur-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-3 border-b border-gold/10 pb-4 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10">
              <AlertTriangle className="h-5 w-5 text-gold" />
            </div>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Những vấn đề salon thường gặp
            </h3>
            <HelpCircle className="ml-auto h-5 w-5 text-muted" />
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:border-gold/20 hover:bg-white/10"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-clay/20 text-xs font-bold text-clay">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-white/80">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
