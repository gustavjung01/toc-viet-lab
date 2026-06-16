import { AppShell } from "@/components/app-shell";
import { CreditCard, History, Sparkles } from "lucide-react";

const creditPackages = [
  { credits: "100 lượt", price: "39.000đ", note: "Phù hợp test công cụ AI nhẹ." },
  { credits: "250 lượt", price: "89.000đ", note: "Dùng đều cho tư vấn màu và ghi chú." },
  { credits: "500 lượt", price: "159.000đ", note: "Cho thợ/salon dùng hằng tuần." },
  { credits: "1000 lượt", price: "299.000đ", note: "Gói nhiều lượt cho đội nhóm salon." },
];

const mockHistory = [
  { title: "AI tư vấn màu", used: "-3 lượt", date: "11/05/2026" },
  { title: "Tạo phiếu tư vấn", used: "-2 lượt", date: "11/05/2026" },
  { title: "Viết bài Facebook", used: "-1 lượt", date: "11/05/2026" },
];

export default function CreditAIPage() {
  return (
    <AppShell>
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Trạng thái</p>
            <p className="mt-1 text-sm font-extrabold text-champagne">UI chuẩn bị thanh toán</p>
          </div>
        </div>
      </section>

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
            <p className="text-sm text-mutedLight">Dữ liệu mẫu để kiểm tra bố cục. Đợt sau sẽ nối GET /api/ai-usage thật.</p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {mockHistory.map((item) => (
            <div key={`${item.title}-${item.used}`} className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-4 text-sm">
              <span className="font-extrabold text-charcoal">{item.title}</span>
              <div className="text-right">
                <span className="block font-bold text-goldText">{item.used}</span>
                <span className="text-xs text-mutedLight">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
