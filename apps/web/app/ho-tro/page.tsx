import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function SupportPage() {
  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] border border-black/5 bg-white p-10 shadow-soft">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">HỖ TRỢ</p>
            <h1 className="mt-4 text-4xl font-black text-charcoal">Hỗ trợ Tóc Việt Lab</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-warmgray">Trang hỗ trợ hiện tại được giữ đơn giản để tránh lỗi 404 và đảm bảo đường dẫn hoạt động.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
