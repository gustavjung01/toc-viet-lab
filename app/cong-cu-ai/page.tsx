import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { assetUrl, type ImageAssetKey } from "@/lib/image-assets";
import { BrainCircuit, FlaskConical, PenLine, BookOpen, Camera, Layers, CheckCircle, AlertTriangle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

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
  },
  {
    title: "AI viết bài Facebook",
    imageKey: "ai-viet-bai-facebook",
    desc: "Tạo caption và nội dung chăm sóc để gây ấn tượng khách hàng.",
    bullets: ["Bài viết thu hút", "Gợi ý nội dung chăm sóc", "Tối ưu kênh salon"],
    status: "Sắp ra mắt"
  },
  {
    title: "AI phân tích ảnh tóc",
    imageKey: "ai-phan-tich-anh-toc",
    desc: "Đánh giá hình ảnh before/after và gợi ý xử lý chính xác.",
    bullets: ["Phân tích tình trạng tóc", "So sánh before/after", "Định hướng xử lý"],
    status: "Sắp ra mắt"
  },
  {
    title: "Dashboard lượt dùng AI",
    imageKey: "ai-credit-dashboard",
    desc: "Theo dõi lượt dùng AI và quản lý workflow salon.",
    bullets: ["Xem lịch sử sử dụng", "Quản lý công cụ AI", "Giữ quyền kiểm soát"],
    status: "Sắp ra mắt"
  }
];

const heroStats = [
  "Phân tích tình huống",
  "Gợi ý công thức",
  "Tạo phiếu tư vấn"
];

export default function AIToolsPage() {
  return (
    <div className="bg-black text-cream-card">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(214,168,79,.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(214,168,79,.1),transparent_40%)]" />
          <div className="relative mx-auto max-w-[1240px]">
            <div className="grid gap-12 lg:grid-cols-[48%_52%] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-gold backdrop-blur">
                  <Sparkles size={16} />
                  CÔNG CỤ AI CHO NGƯỜI LÀM TÓC
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Công cụ AI cho thợ tóc & salon
                  </h1>
                  <p className="max-w-xl text-lg leading-8 text-muted sm:text-xl">
                    Phân tích tình huống, gợi ý hướng xử lý, tạo phiếu tư vấn và nội dung chăm sóc khách hàng — thiết kế cho thực tế salon Việt.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/ai-tu-van-mau"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-8 py-4 text-lg font-extrabold text-black shadow-gold transition hover:brightness-110 sm:w-auto"
                  >
                    Thử AI tư vấn màu
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="#tools"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 bg-card-dark px-8 py-4 text-lg font-bold text-cream-card transition hover:bg-card-dark-2 sm:w-auto"
                  >
                    Xem bộ công cụ
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat} className="rounded-[1.75rem] border border-gold/20 bg-card-dark p-4 text-sm text-white shadow-sm">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <HairVisual
                  className="min-h-[320px] md:min-h-[520px] w-full rounded-[2rem] border border-gold/30 shadow-2xl"
                  imageKey="ai-tu-van-mau"
                  alt="AI tư vấn màu tóc"
                />
                <div className="absolute left-5 top-5 rounded-[1.75rem] border border-gold/20 bg-black/85 p-5 text-sm text-cream-card shadow-2xl backdrop-blur">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-gold">AI phân tích</div>
                  <div className="mt-4 space-y-3 text-sm text-cream-card">
                    <div className="flex items-center justify-between rounded-2xl bg-black/40 px-3 py-2">
                      <span>Nền tóc</span>
                      <span className="font-bold text-gold">Level 6</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-black/40 px-3 py-2">
                      <span>Mục tiêu</span>
                      <span className="font-bold text-gold">Beige Ash</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-black/40 px-3 py-2">
                      <span>Độ an toàn</span>
                      <span className="font-bold text-gold">Cao</span>
                    </div>
                    <div className="rounded-2xl bg-gold/10 px-3 py-2 text-sm font-semibold text-gold">
                      Test lọn: Bắt buộc
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-gold">Bộ công cụ AI</p>
              <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Hệ thống công cụ AI dành cho salon</h2>
              <p className="mt-6 max-w-2xl mx-auto text-muted">
                Các công cụ AI đều dùng ảnh thật và giao diện dark cao cấp, giúp chuyên môn của bạn rõ ràng hơn.
              </p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {aiToolCards.map((tool) => (
                <div key={tool.title} className="group overflow-hidden rounded-[2rem] border border-gold/20 bg-card-dark shadow-soft transition hover:border-gold/50 hover:bg-card-dark-2">
                  <div className="relative">
                    <HairVisual
                      className="h-56 rounded-[1.5rem] border-b border-gold/10"
                      imageKey={tool.imageKey}
                      alt={tool.title}
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                      {tool.status}
                    </div>
                  </div>
                  <div className="space-y-4 p-7">
                    <div>
                      <h3 className="text-xl font-black text-white">{tool.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{tool.desc}</p>
                    </div>
                    <ul className="space-y-3 text-sm text-muted">
                      {tool.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={tool.status === "Dùng thử" ? "/ai-tu-van-mau" : "#"}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                        tool.status === "Dùng thử"
                          ? "bg-gradient-to-r from-gold-bright to-gold text-black shadow-gold hover:brightness-110"
                          : "border border-gold/25 bg-black/40 text-cream-card hover:border-gold/40"
                      }`}
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

        <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-10 lg:grid-cols-4">
              {[
                {
                  title: "Nhập tình trạng tóc",
                  desc: "Mô tả nền tóc, hư tổn và mong muốn khách hàng."
                },
                {
                  title: "Chọn mục tiêu khách muốn",
                  desc: "Xác định tông màu, độ sáng và hiệu ứng mong muốn."
                },
                {
                  title: "AI gợi ý hướng xử lý",
                  desc: "Nhận phân tích rủi ro, công thức và bước thi công."
                },
                {
                  title: "Lưu vào sổ tay / tạo phiếu tư vấn",
                  desc: "Ghi chú kết quả, lưu lịch sử và chuẩn bị cho lần sau."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-gold/20 bg-cream-card p-6 text-charcoal shadow-soft">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                    <span className="font-black">{item.title.split(" ")[0]}</span>
                  </div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px] rounded-[2rem] border border-gold/20 bg-card-dark p-8 shadow-soft">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Mô phỏng tư vấn màu
                </span>
                <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Giao diện tư vấn màu</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                  Mô phỏng UI giúp bạn hình dung quy trình chọn nền, mục tiêu màu và kết quả AI trong salon.
                </p>
                <div className="mt-8 space-y-5 rounded-[2rem] border border-gold/20 bg-black/50 p-6">
                  <div className="rounded-3xl bg-card-dark-2 p-5">
                    <div className="mb-4 flex items-center justify-between text-sm text-white/70">
                      <span>Cấp độ nền tóc</span>
                      <span className="font-semibold text-gold">Level 6</span>
                    </div>
                    <div className="grid grid-cols-5 gap-3 text-sm sm:grid-cols-10">
                      {Array.from({ length: 10 }, (_, index) => {
                        const level = index + 1;
                        const isActive = level === 6;
                        return (
                          <button
                            key={level}
                            className={`rounded-2xl px-2 py-3 text-xs font-bold transition ${
                              isActive ? "bg-gold text-black" : "bg-black/30 text-white/70"
                            }`}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-card-dark-2 p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Tình trạng tóc</div>
                      <p className="mt-3 text-sm text-white/80">Tóc tự nhiên, ít hư tổn, cần giữ độ mượt.</p>
                    </div>
                    <div className="rounded-3xl bg-card-dark-2 p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Mục tiêu màu</div>
                      <p className="mt-3 text-sm text-white/80">Beige Ash bóng mượt, ấm áp.</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-black/30 p-5">
                    <div className="mb-4 text-sm uppercase tracking-[0.2em] text-gold">Kết quả AI</div>
                    <div className="space-y-3 text-sm text-cream-card">
                      <p><strong className="text-gold">Phân tích:</strong> Nền vàng cam, tóc khỏe nhẹ.</p>
                      <p><strong className="text-gold">Gợi ý:</strong> Beige Ash 6.3 + 7.3, Oxy 6%.</p>
                      <p><strong className="text-gold">Lưu ý:</strong> Test lọn trước khi xử lý toàn đầu.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 inline-flex w-full max-w-sm items-center justify-between rounded-3xl bg-gold px-5 py-4 text-black shadow-gold sm:max-w-none">
                  <span className="font-bold">Lưu kết quả tư vấn</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
              <div className="rounded-[2rem] border border-gold/20 bg-black/80 p-6 text-white shadow-xl">
                <div className="rounded-[1.75rem] border border-gold/15 bg-[#11100E] p-6">
                  <div className="mb-6 flex items-center justify-between text-sm text-white/60">
                    <span>Công cụ tư vấn màu</span>
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">Mock UI</span>
                  </div>
                  <div className="space-y-5 text-sm">
                    <div className="rounded-2xl bg-black/40 p-4">
                      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">Tình trạng tóc</div>
                      <p className="text-white/80">Mềm, ít xơ, nền vàng cam</p>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-4">
                      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">Mục tiêu màu</div>
                      <p className="text-white/80">Beige Ash bóng mượt</p>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-4">
                      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">Kết quả gợi ý</div>
                      <p className="text-white/80">Nâu be 6.3 + 7.3 + Oxy 6%</p>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-4">
                      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">Lưu trữ</div>
                      <p className="text-white/80">Ghi ngay công thức và ghi chú khách.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card-dark px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-bold text-gold backdrop-blur">
              <AlertTriangle size={14} />
              Giới hạn an toàn
            </div>
            <h2 className="mt-6 text-3xl font-black text-cream-card md:text-5xl">AI không thay thế thợ kỹ thuật</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: AlertTriangle,
                  title: "Không cam kết kết quả tuyệt đối",
                  desc: "AI chỉ đưa ra gợi ý dựa trên dữ liệu, kết quả thực tế phụ thuộc vào kỹ thuật và điều kiện salon."
                },
                {
                  icon: ShieldCheck,
                  title: "Case tẩy, sửa lỗi, tóc yếu phải test lọn",
                  desc: "Kiểm tra bằng lọn test trước khi thực hiện trên toàn đầu."
                },
                {
                  icon: CheckCircle,
                  title: "Công thức chỉ là tham khảo",
                  desc: "Điều chỉnh theo nền tóc thực tế, sản phẩm và kinh nghiệm của thợ."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-[2rem] bg-card-dark-2 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <item.icon size={24} />
                  </div>
                  <h3 className="mt-6 text-lg font-black text-cream-card">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
