import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { toAssetUrl } from "@/lib/asset-url";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import type { ImageAssetKey } from "@/lib/image-assets";
import { CheckCircle, AlertTriangle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

type AIToolCard = {
  title: string;
  imageKey: ImageAssetKey;
  desc: string;
  bullets: string[];
  status: "Dùng thử" | "Sắp ra mắt";
};

const aiToolCards: AIToolCard[] = [
  {
    title: "AI tư vấn màu",
    imageKey: "ai-tu-van-mau",
    desc: "Phân tích nền tóc, mục tiêu màu và rủi ro kỹ thuật.",
    bullets: ["Đề xuất hướng xử lý", "Gợi ý công thức tham khảo", "Tạo phiếu tư vấn dễ hiểu"],
    status: "Dùng thử"
  },
  {
    title: "AI gợi ý công thức",
    imageKey: "ai-goi-y-cong-thuc",
    desc: "Tạo công thức tham khảo theo nền, tông và tình trạng tóc.",
    bullets: ["Tối ưu tỷ lệ màu", "Giảm rủi ro kỹ thuật", "Đề xuất sản phẩm phù hợp"],
    status: "Dùng thử"
  },
  {
    title: "AI tạo phiếu tư vấn",
    imageKey: "ai-tao-phieu-tu-van",
    desc: "Viết nội dung tư vấn khách hàng chuyên nghiệp, dễ hiểu.",
    bullets: ["Nội dung tư vấn rõ ràng", "Tối ưu trải nghiệm khách", "Tiết kiệm thời gian"],
    status: "Dùng thử"
  }
];

const heroStats = ["Phân tích tình huống", "Gợi ý công thức", "Tạo phiếu tư vấn"];

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-black text-cream-card">
      <Header />
      <main className="pb-24 lg:pb-0">
        <section className="relative overflow-hidden bg-black px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top_left,rgba(214,168,79,.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(214,168,79,.1),transparent_40%)]" />
          <div className="relative mx-auto max-w-[1240px]">
            <div className="grid gap-10 lg:grid-cols-[48%_52%] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur">
                  <Sparkles size={15} />
                  Công cụ hỗ trợ chuyên môn
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Công cụ hỗ trợ tư vấn màu và xử lý case
                  </h1>
                  <p className="max-w-xl text-base font-semibold leading-8 text-white/75 sm:text-xl">
                    Công cụ chỉ dùng để tham khảo chuyên môn, giúp bạn phân tích tình huống và chuẩn bị bước xử lý chính xác.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/ai-tu-van-mau"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D6A84F] px-7 py-4 text-base font-extrabold text-[#030303] shadow-gold transition hover:bg-[#F0C76A] sm:w-auto"
                  >
                    Thử AI tư vấn màu
                    <ArrowRight size={19} />
                  </Link>
                  <Link
                    href="#tools"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 bg-[#171410] px-7 py-4 text-base font-bold text-white transition hover:bg-[#201A13] sm:w-auto"
                  >
                    Xem bộ công cụ
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {heroStats.map((stat) => (
                    <div key={stat} className="rounded-2xl border border-gold/20 bg-[#171410] p-3 text-xs font-bold text-white shadow-sm sm:rounded-[1.75rem] sm:p-4 sm:text-sm">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden sm:block">
                <HairVisual
                  className="w-full rounded-[2rem] border border-gold/30 shadow-2xl"
                  src={toAssetUrl("ai-tu-van-mau")}
                  alt="AI tư vấn màu tóc"
                  aspect="aspect-[4/3] sm:aspect-video"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold sm:text-sm">Bộ công cụ AI</p>
              <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Hệ thống công cụ AI dành cho salon</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/70 sm:text-base">
                Các công cụ AI dùng giao diện dark cao cấp, giúp chuyên môn của bạn rõ ràng hơn.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {aiToolCards.map((tool) => (
                <div key={tool.title} className="group overflow-hidden rounded-[2rem] border border-gold/20 bg-[#171410] shadow-soft transition hover:border-gold/50 hover:bg-[#201A13]">
                  <div className="relative">
                    <HairVisual
                      className="rounded-[1.5rem] border-b border-gold/10"
                      src={toAssetUrl(tool.imageKey)}
                      alt={tool.title}
                      aspect="aspect-[4/3] sm:aspect-video"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                      {tool.status}
                    </div>
                  </div>
                  <div className="space-y-4 p-5 sm:p-7">
                    <div>
                      <h3 className="text-xl font-black text-white">{tool.title}</h3>
                      <p className="mt-3 text-sm font-semibold leading-6 text-white/70">{tool.desc}</p>
                    </div>
                    <ul className="space-y-3 text-sm font-semibold text-white/70">
                      {tool.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/ai-tu-van-mau"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D6A84F] px-5 py-3 text-sm font-bold text-[#030303] shadow-gold transition hover:bg-[#F0C76A]"
                    >
                      Mở công cụ
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Nhập tình trạng tóc", desc: "Mô tả nền tóc, hư tổn và mong muốn khách hàng." },
                { title: "Chọn mục tiêu màu", desc: "Xác định tông màu, độ sáng và hiệu ứng mong muốn." },
                { title: "AI gợi ý xử lý", desc: "Nhận phân tích rủi ro, công thức và bước thi công." },
                { title: "Lưu vào sổ tay", desc: "Ghi chú kết quả và chuẩn bị cho lần sau." }
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-gold/20 bg-cream-card p-5 text-charcoal shadow-soft sm:p-6">
                  <h3 className="text-lg font-black">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-charcoal/75">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#171410] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1240px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-bold text-gold backdrop-blur">
              <AlertTriangle size={14} />
              Giới hạn an toàn
            </div>
            <h2 className="mt-6 text-3xl font-black text-cream-card md:text-5xl">Công cụ chỉ dùng để tham khảo chuyên môn</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { icon: AlertTriangle, title: "Không cam kết tuyệt đối", desc: "Kết quả thực tế phụ thuộc kỹ thuật, nền tóc và điều kiện salon." },
                { icon: ShieldCheck, title: "Case yếu phải test lọn", desc: "Kiểm tra lọn test trước khi thực hiện trên toàn đầu." },
                { icon: CheckCircle, title: "Công thức là tham khảo", desc: "Điều chỉnh theo nền tóc, sản phẩm và kinh nghiệm của thợ." }
              ].map((item) => (
                <div key={item.title} className="rounded-[2rem] bg-[#201A13] p-6 text-center sm:p-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <item.icon size={24} />
                  </div>
                  <h3 className="mt-6 text-lg font-black text-cream-card">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/65">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
