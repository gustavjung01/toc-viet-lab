import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseCard, SectionHeader } from "@/components/cards";
import { HairVisual } from "@/components/visual";
import { cases } from "@/lib/data";

export default function CasePage() {
  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] bg-radial-gold p-8 text-white shadow-soft lg:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">CASE SALON THỰC TẾ</p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">Before / After và hướng xử lý kỹ thuật</h1>
            <p className="mt-5 max-w-2xl leading-8 text-white/65">Tổng hợp tình huống màu, tẩy, phủ bạc, phục hồi và sửa lỗi thường gặp trong salon Việt.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["Tất cả loại case", "Nâng tông", "Màu khói", "Phục hồi", "Phủ bạc", "Balayage"].map((chip) => (
                <button key={chip} className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/75">{chip}</button>
              ))}
            </div>
          </section>
          <section className="mt-10 rounded-[2rem] bg-charcoal p-6 text-white shadow-soft lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
              <div className="grid grid-cols-2 gap-2">
                <HairVisual className="h-80" imageKey={cases[0].imageKeyBefore} alt={`${cases[0].title} before`} label="Before" />
                <HairVisual className="h-80" imageKey={cases[0].imageKeyAfter} alt={`${cases[0].title} after`} label="After" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="w-fit rounded-full bg-champagne px-4 py-2 text-xs font-extrabold text-charcoal">Case nổi bật</span>
                <h2 className="mt-5 text-3xl font-black md:text-4xl">Từ nền đen tự nhiên sang Beige Ash ánh khói sang trọng</h2>
                <p className="mt-5 leading-8 text-white/65">Tóc đen tự nhiên, sợi to, đã nhuộm màu tối 2 lần. Mục tiêu là nâng lên level 8–9 nhưng vẫn giữ độ bóng và mềm mượt.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button className="rounded-full bg-champagne px-6 py-3 font-extrabold text-charcoal">Xem phân tích case</button>
                  <button className="rounded-full border border-gold/30 bg-black/30 px-6 py-3 font-extrabold text-gold hover:text-goldBright">Xem hướng xử lý</button>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-12">
            <SectionHeader title="Danh sách case" />
            <div className="grid gap-6 lg:grid-cols-3">
              {cases.map((item, index) => (
                <CaseCard key={`${item.title}-${index}`} item={item} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
