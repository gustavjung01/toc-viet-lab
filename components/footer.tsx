import { Logo } from "./logo";
export function Footer() {
  return (
    <footer className="bg-charcoal px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div><Logo /><p className="mt-5 max-w-xl text-sm leading-7 text-white/62">Nền tảng kiến thức tóc chuyên sâu, sổ tay công thức và công cụ AI dành cho thợ tóc, salon và người làm nghề tại Việt Nam.</p></div>
        <div><h3 className="font-bold text-champagne">Nội dung</h3><div className="mt-4 space-y-3 text-sm text-white/65"><p>Kiến thức tóc</p><p>Công thức màu</p><p>Case thực tế</p><p>Công cụ AI</p></div></div>
        <div><h3 className="font-bold text-champagne">Tài khoản</h3><div className="mt-4 space-y-3 text-sm text-white/65"><p>Đăng nhập</p><p>Gói thành viên</p><p>Credit AI</p><p>Hỗ trợ</p></div></div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/45">© 2026 Tóc Việt Lab. Starter UI mockup.</div>
    </footer>
  );
}
