"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CreditCard, History, Loader2, Sparkles } from "lucide-react";

const creditPackages = [
  { credits: "100 lượt", price: "39.000đ", note: "Phù hợp test công cụ AI nhẹ." },
  { credits: "250 lượt", price: "89.000đ", note: "Dùng đều cho tư vấn màu và ghi chú." },
  { credits: "500 lượt", price: "159.000đ", note: "Cho thợ/salon dùng hằng tuần." },
  { credits: "1000 lượt", price: "299.000đ", note: "Gói nhiều lượt cho đội nhóm salon." },
];

type UsageLog = {
  id: string;
  tool: string;
  credits_used: number;
  created_at?: string | number;
};

function formatDate(value?: string | number) {
  if (!value) return "—";
  const date = typeof value === "number" ? new Date(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("vi-VN");
}

export function CreditUsageClient() {
  const [credits, setCredits] = useState<number | null>(null);
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/ai-usage")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.error) {
          setError(data.error || "Không thể tải lịch sử sử dụng AI.");
          return;
        }
        setCredits(typeof data.credits === "number" ? data.credits : 0);
        setLogs(Array.isArray(data.logs) ? data.logs : []);
      })
      .catch(() => setError("Không thể kết nối API credit AI."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="rounded-[2rem] bg-radial-gold p-7 text-white shadow-soft md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">Lượt dùng AI</p>
            <h1 className="mt-3 text-4xl font-black">Quản lý lượt dùng AI</h1>
            <p className="mt-4 max-w-2xl leading-8 text-white/75">
              Mỗi công cụ AI sẽ trừ lượt dùng theo mức độ xử lý. Phần thanh toán thật sẽ nối sau khi backend VPS và payment ổn định.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Credit hiện có</p>
            <p className="mt-1 text-3xl font-black text-champagne">{loading ? "..." : credits ?? 0}</p>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-black text-amber-950">Chưa tải được dữ liệu credit AI</p>
            <p className="mt-1 text-sm font-semibold leading-6">{error}</p>
          </div>
        </div>
      )}

      <section className="mt-8">
        <div className="mb-5 flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-goldText" />
          <div>
            <h2 className="text-2xl font-black text-charcoal">Gói credit AI</h2>
            <p className="text-sm text-mutedLight">Các gói dưới đây là cấu trúc hiển thị, chưa mở thanh toán tự động.</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {creditPackages.map((item) => (
            <article key={item.credits} className="rounded-3xl bg-white p-6 text-charcoal shadow-soft">
              <Sparkles className="h-6 w-6 text-goldText" />
              <h3 className="mt-4 text-2xl font-black text-charcoal">{item.credits}</h3>
              <p className="mt-2 text-lg font-extrabold text-goldText">{item.price}</p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-mutedLight">{item.note}</p>
              <button className="mt-6 w-full rounded-full bg-charcoal px-5 py-3 font-extrabold text-champagne transition hover:brightness-110">
                Liên hệ mua gói
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 text-charcoal shadow-soft">
        <div className="flex items-center gap-3">
          <History className="h-6 w-6 text-goldText" />
          <div>
            <h2 className="text-2xl font-black text-charcoal">Lịch sử sử dụng</h2>
            <p className="text-sm text-mutedLight">Dữ liệu lấy từ API credit AI của tài khoản hiện tại.</p>
          </div>
        </div>

        {loading ? (
          <div className="mt-5 flex items-center justify-center rounded-2xl bg-cream p-8">
            <Loader2 className="h-6 w-6 animate-spin text-goldText" />
          </div>
        ) : logs.length === 0 ? (
          <div className="mt-5 rounded-2xl bg-cream p-5 text-sm font-semibold text-mutedLight">
            Chưa có lịch sử sử dụng AI.
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {logs.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-4 text-sm">
                <span className="font-extrabold text-charcoal">{item.tool}</span>
                <div className="text-right">
                  <span className="block font-bold text-goldText">-{item.credits_used} lượt</span>
                  <span className="text-xs text-mutedLight">{formatDate(item.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
