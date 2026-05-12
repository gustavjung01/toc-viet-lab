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
    <section className="relative px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-gold/20 bg-card-dark p-6 shadow-gold/10 backdrop-blur-sm">
        <div className="flex flex-col gap-3 border-b border-gold/10 pb-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
              <AlertTriangle className="h-5 w-5" />
            </span>
            Những vấn đề salon thường gặp
          </div>
          <HelpCircle className="h-5 w-5 text-tvl-gold" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div key={problem} className="rounded-3xl border border-gold/10 bg-black/20 p-4 text-cream-card">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-2xl bg-gold/15 text-sm font-bold text-gold">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-white/80">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
