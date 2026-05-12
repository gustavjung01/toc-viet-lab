import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { aiTools } from "@/lib/data";
import { BrainCircuit, FlaskConical, PenLine, BookOpen, Camera, Layers, CheckCircle, AlertTriangle, ArrowRight, Star } from "lucide-react";

export default function AIToolsPage() {
  return (
    <div>
      <Header />
      <main className="bg-black text-cream-card">
        <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,168,79,.16),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(99,122,77,.1),transparent_35%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-xs font-bold text-gold backdrop-blur">
                  <AlertTriangle size={14} />
                  AI chỉ hỗ trợ tham khảo · Quyết định cuối cùng thuộc về kỹ thuật viên
                </div>
                <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
                  Công cụ AI cho thợ tóc & salon
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                  Phân tích tình huống, gợi ý hướng xử lý, tạo phiếu tư vấn và nội dung chăm sóc khách hàng — thiết kế cho thực tế salon Việt.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/ai-tu-van-mau"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-8 py-4 text-lg font-extrabold text-black shadow-gold transition hover:brightness-110"
                  >
                    Thử AI tư vấn màu
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="#tools"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/32 bg-card-dark px-8 py-4 text-lg font-bold text-cream-card transition hover:bg-card-dark-2"
                  >
                    Xem bộ công cụ
                  </Link>
                </div>
              </div>
              <div className="lg:flex lg:justify-end">
                <HairVisual
                  className="h-96 w-full max-w-md"
                  imageKey="ai-tu-van-mau"
                  alt="AI tư vấn màu tóc"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-gold">Bộ công cụ AI</p>
              <h2 className="mt-4 text-3xl font-black md:text-5xl">Công cụ hỗ trợ chuyên nghiệp</h2>
              <p className="mt-6 max-w-2xl mx-auto text-muted">
                Các công cụ AI được thiết kế để hỗ trợ phân tích và tư vấn, không thay thế kinh nghiệm của thợ kỹ thuật.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {aiTools.map((tool, index) => {
                const status = index < 3 ? "Dùng thử" : index < 5 ? "Sắp ra mắt" : "Pro";
                const isAvailable = index < 3;
                return (
                  <div key={tool.title} className="group rounded-[2rem] border border-gold/20 bg-card-dark p-8 text-cream-card shadow-soft transition hover:-translate-y-1">
                    <div className="relative overflow-hidden rounded-3xl">
                      <HairVisual
                        className="aspect-video w-full"
                        imageKey={tool.imageKey}
                        alt={tool.title}
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                        Công cụ AI
                      </div>
                      <div className="absolute right-4 top-4 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                        {status}
                      </div>
                    </div>
                    <h3 className="mt-6 text-xl font-black text-white">{tool.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{tool.desc}</p>
                    <ul className="mt-6 space-y-2 text-sm text-muted">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-gold" />
                        Phân tích chuyên sâu
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-gold" />
                        Gợi ý thực tế salon
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-gold" />
                        Lưu vào sổ tay
                      </li>
                    </ul>
                    <Link
                      href={isAvailable ? "/ai-tu-van-mau" : "#"}
                      className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition ${
                        isAvailable
                          ? "bg-gradient-to-r from-gold-bright to-gold text-black shadow-gold hover:brightness-110"
                          : "border border-gold/32 bg-card-dark-2 text-cream-card hover:bg-card-dark"
                      }`}
                    >
                      {isAvailable ? "Mở công cụ" : "Sắp ra mắt"}
                      {isAvailable && <ArrowRight size={16} />}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-black text-charcoal md:text-5xl">Quy trình dùng AI trong salon</h2>
              <p className="mt-6 max-w-2xl mx-auto text-muted">
                Cách tích hợp công cụ AI vào quy trình làm việc hàng ngày của salon một cách hiệu quả và an toàn.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Nhập tình trạng tóc",
                  desc: "Mô tả chi tiết về nền tóc, tình trạng hư tổn, mục tiêu khách hàng muốn đạt được."
                },
                {
                  step: "02",
                  title: "Chọn mục tiêu khách muốn",
                  desc: "Xác định rõ ràng kết quả mong muốn: tông màu, độ sáng, hiệu ứng đặc biệt."
                },
                {
                  step: "03",
                  title: "AI gợi ý hướng xử lý",
                  desc: "Nhận phân tích rủi ro, công thức tham khảo và các bước thực hiện chi tiết."
                },
                {
                  step: "04",
                  title: "Lưu vào sổ tay / tạo phiếu tư vấn",
                  desc: "Ghi chú kết quả, tạo nội dung tư vấn khách hàng và lưu trữ cho lần sau."
                }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-bright text-2xl font-black text-black">
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-xl font-black text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card-dark px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
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
                  icon: CheckCircle,
                  title: "Luôn test lọn trước khi làm khách",
                  desc: "Đặc biệt với case tẩy, sửa lỗi màu, tóc yếu hoặc nhuộm lại trên nền phức tạp."
                },
                {
                  icon: Star,
                  title: "Công thức chỉ là tham khảo",
                  desc: "Điều chỉnh tỷ lệ oxy, thời gian và sản phẩm theo kinh nghiệm và nền tóc thực tế."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-card-dark-2 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                    <item.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="mt-6 text-lg font-black text-cream-card">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-gold">Công cụ nổi bật</p>
              <h2 className="mt-4 text-3xl font-black md:text-5xl">AI tư vấn màu</h2>
              <p className="mt-6 max-w-2xl mx-auto text-muted">
                Công cụ AI tiên tiến nhất, phân tích toàn diện để đưa ra hướng xử lý phù hợp nhất cho từng khách hàng.
              </p>
            </div>
            <div className="mt-16 rounded-3xl border border-gold/32 bg-card-dark p-8 md:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h3 className="text-2xl font-black text-cream-card">Phân tích chuyên sâu</h3>
                  <p className="mt-4 text-muted">
                    Nhập thông tin chi tiết về tóc khách hàng, AI sẽ phân tích và gợi ý công thức màu phù hợp nhất.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="rounded-2xl bg-card-dark-2 p-4">
                      <label className="block text-sm font-bold text-gold">Cấp độ nền tóc</label>
                      <div className="mt-2 rounded-lg bg-black/30 px-4 py-2 text-cream-card">Level 6 - Nền vàng cam</div>
                    </div>
                    <div className="rounded-2xl bg-card-dark-2 p-4">
                      <label className="block text-sm font-bold text-gold">Tình trạng tóc</label>
                      <div className="mt-2 rounded-lg bg-black/30 px-4 py-2 text-cream-card">Tóc khỏe, ít hư tổn</div>
                    </div>
                    <div className="rounded-2xl bg-card-dark-2 p-4">
                      <label className="block text-sm font-bold text-gold">Mục tiêu màu</label>
                      <div className="mt-2 rounded-lg bg-black/30 px-4 py-2 text-cream-card">Nâu socola ấm</div>
                    </div>
                    <div className="rounded-2xl bg-card-dark-2 p-4">
                      <label className="block text-sm font-bold text-gold">Lịch sử hóa chất</label>
                      <div className="mt-2 rounded-lg bg-black/30 px-4 py-2 text-cream-card">Chưa từng nhuộm</div>
                    </div>
                  </div>
                  <Link
                    href="/ai-tu-van-mau"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-8 py-4 font-extrabold text-black shadow-gold transition hover:brightness-110"
                  >
                    Thử ngay
                    <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="rounded-2xl bg-card-dark-2 p-6">
                  <div className="rounded-xl bg-gradient-to-r from-gold/20 to-gold-bright/20 p-4">
                    <h4 className="font-black text-gold">Kết quả gợi ý</h4>
                    <div className="mt-4 space-y-3 text-sm text-cream-card">
                      <p><strong className="text-gold">Công thức chính:</strong> Nâu socola 5.3 + 6.3 (1:1) + Oxy 6%</p>
                      <p><strong className="text-gold">Thời gian xử lý:</strong> 35-40 phút</p>
                      <p><strong className="text-gold">Lưu ý:</strong> Test lọn trước, theo dõi quá trình oxy hóa</p>
                      <p><strong className="text-gold">Rủi ro:</strong> Thấp - nền tự nhiên, ít phức tạp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
