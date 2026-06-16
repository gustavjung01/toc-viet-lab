"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";

const LEVELS = Array.from({ length: 10 }, (_, i) => i + 1);
const inputClass = "mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-mutedLight/70 focus:border-[#D6A84F]";

type AnalysisResult = {
  nenToc: string;
  ruiRo: string;
  congThuc: string;
  luuY: string;
};

function generateAnalysis(form: Record<string, string>): AnalysisResult {
  const level = form.level || "6";
  const tong = form.tong || "chưa xác định";
  return {
    nenToc: `Nền ${level}, phân tích theo tông ${tong}. Tình trạng: ${form.tinhTrang || "bình thường"}. Lịch sử: ${form.lichSu || "không có"}.`,
    ruiRo: Number(level) <= 4
      ? "Nền tối — cần tẩy ít nhất 1 lần trước khi nhuộm. Rủi ro cao nếu bỏ qua bước tẩy."
      : Number(level) <= 6
      ? "Nền trung bình — có thể nhuộm trực tiếp tông tối/tự nhiên. Tông sáng cần tẩy nhẹ."
      : "Nền sáng — thuận lợi cho hầu hết tông màu. Cần giữ ẩm tốt sau nhuộm.",
    congThuc: `Gợi ý: Dùng oxy ${Number(level) <= 5 ? "9%" : "6%"} / ${Number(level) <= 5 ? "30 vol" : "20 vol"}, tỷ lệ 1:1.5. Tông ${tong}. Thời gian để màu 35–45 phút.`,
    luuY: `Bạch phần trăm bạc ${form.bachBac || "0"}%. ${form.thuongHieu ? `Sản phẩm đang dùng: ${form.thuongHieu}.` : ""} Luôn test lọn trước 48 giờ.`,
  };
}

export function AIColorClient() {
  const [level, setLevel] = useState("6");
  const [form, setForm] = useState({ tong: "", lichSu: "", bachBac: "", tinhTrang: "", thuongHieu: "" });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const analysis = generateAnalysis({ ...form, level });

    const res = await fetch("/api/ai-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: "ai-tu-van-mau",
        creditsUsed: 1,
        prompt: JSON.stringify({ level, ...form }),
        result: JSON.stringify(analysis),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setResult(analysis);
      setCredits(data.remainingCredits);
    }
  }

  return (
    <>
      <div className="mb-8 rounded-[2rem] bg-charcoal p-7 text-white shadow-soft">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">AI tư vấn màu</p>
        <h1 className="mt-3 text-4xl font-black">Tư vấn màu chuẩn salon bằng AI</h1>
        <p className="mt-4 max-w-2xl leading-8 text-white/75">
          Nhập thông tin nền tóc, lịch sử tóc và mục tiêu màu để nhận phân tích kỹ thuật.
        </p>
        {credits !== null && (
          <p className="mt-3 text-sm text-champagne">
            <Sparkles size={14} className="mr-1 inline" />
            Credit còn lại: <b>{credits}</b>
          </p>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-charcoal shadow-soft">
          <h2 className="text-xl font-black text-charcoal">1. Thông tin tóc hiện tại</h2>

          <label className="mt-6 block text-sm font-extrabold text-charcoal">Cấp độ nền tóc</label>
          <div className="mt-3 grid grid-cols-10 gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(String(l))}
                className={`aspect-square rounded-xl text-xs font-black transition ${
                  level === String(l)
                    ? "bg-[#D6A84F] text-black"
                    : "bg-cream text-mutedLight hover:bg-[#D6A84F]/20"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {([
            { key: "tong", label: "Tông màu mong muốn", placeholder: "VD: Beige ash, nâu khói..." },
            { key: "lichSu", label: "Lịch sử tóc", placeholder: "VD: Đã tẩy 2 lần, nhuộm 3 tháng trước..." },
            { key: "bachBac", label: "Tỷ lệ tóc bạc (%)", placeholder: "VD: 20" },
            { key: "tinhTrang", label: "Tình trạng tóc", placeholder: "VD: Khô xơ, bình thường, khỏe..." },
            { key: "thuongHieu", label: "Thương hiệu / sản phẩm đang dùng", placeholder: "VD: Wella, Schwarzkopf..." },
          ] as const).map(({ key, label, placeholder }) => (
            <div key={key} className="mt-5">
              <label className="text-sm font-extrabold text-charcoal">{label}</label>
              <input
                className={inputClass}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              />
            </div>
          ))}

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#D6A84F] px-5 py-4 font-extrabold text-black transition hover:bg-[#F0C76A] disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? "Đang phân tích..." : "Phân tích tình huống (1 credit)"}
          </button>
        </form>

        <section className="rounded-3xl bg-charcoal p-6 text-white shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-champagne">2. Kết quả từ AI</h2>
            {result && (
              <span className="rounded-full bg-[#D6A84F]/20 px-3 py-1 text-xs font-bold text-champagne">
                Đã phân tích
              </span>
            )}
          </div>

          {!result ? (
            <div className="mt-10 flex flex-col items-center py-10 text-center">
              <Sparkles size={36} className="text-white/25" />
              <p className="mt-4 text-sm text-white/60">
                Điền thông tin bên trái và bấm phân tích để nhận kết quả
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {[
                { label: "Đánh giá nền tóc", value: result.nenToc },
                { label: "Rủi ro kỹ thuật", value: result.ruiRo },
                { label: "Gợi ý công thức", value: result.congThuc },
                { label: "Lưu ý quan trọng", value: result.luuY },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl bg-white/5 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-champagne">{label}</p>
                  <p className="mt-2 text-sm leading-7 text-white/85">{value}</p>
                </div>
              ))}
              <p className="pt-2 text-xs text-white/45">
                * Kết quả chỉ mang tính tham khảo. Luôn test lọn trước khi xử lý thực tế.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
