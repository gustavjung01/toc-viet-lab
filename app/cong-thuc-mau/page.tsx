import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { formulas } from "@/lib/data";

export default function FormulaPublicPage() {
  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] bg-radial-gold p-8 text-white shadow-soft lg:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">SỔ TAY CÔNG THỨC</p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">Công thức màu theo nền tóc thực tế</h1>
            <p className="mt-5 max-w-2xl leading-8 text-white/65">Tham khảo công thức, tỷ lệ và ghi chú xử lý theo từng nền tóc. Điều chỉnh theo hãng màu, chất tóc và lịch sử hóa chất.</p>
          </section>
          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            {formulas.map((formula) => (
              <div key={formula.title} className="overflow-hidden rounded-3xl bg-white shadow-soft">
                <HairVisual
                  imageKey={formula.imageKey}
                  alt={formula.title}
                  className="h-56 rounded-[1.5rem] border border-gold/20"
                  label={formula.tag}
                />
                <div className="p-6">
                  <h2 className="text-xl font-black text-charcoal">{formula.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-warmgray">{formula.note}</p>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-2xl bg-cream p-3">
                      <b>Nền</b><br />{formula.base}
                    </div>
                    <div className="rounded-2xl bg-cream p-3">
                      <b>Oxy</b><br />{formula.developer}
                    </div>
                    <div className="rounded-2xl bg-cream p-3">
                      <b>Tỷ lệ</b><br />{formula.ratio}
                    </div>
                  </div>
                  <button className="mt-5 w-full rounded-full bg-charcoal px-5 py-3 font-extrabold text-champagne">Lưu vào sổ tay</button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
