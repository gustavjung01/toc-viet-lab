import { Logo } from "./logo";
import Link from "next/link";

const contentLinks = [
  { label: "Kiến thức tóc", href: "/kien-thuc" },
  { label: "Công thức màu", href: "/cong-thuc-mau" },
  { label: "Case thực tế", href: "/case-thuc-te" },
  { label: "Công cụ AI", href: "/cong-cu-ai" }
];

const accountLinks = [
  { label: "Đăng nhập", href: "/login" },
  { label: "Gói thành viên", href: "/goi-thanh-vien" },
  { label: "Credit AI", href: "/credit-ai" },
  { label: "Hỗ trợ", href: "/ho-tro" }
];

export function Footer() {
  return (
    <footer className="bg-card px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
            Nền tảng kiến thức tóc chuyên sâu, sổ tay công thức và công cụ AI dành cho thợ tóc, 
            salon và người làm nghề tại Việt Nam.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gold">Nội dung</h3>
          <div className="mt-4 space-y-3 text-sm text-white/65">
            {contentLinks.map((link) => (
              <p key={link.href}>
                <Link href={link.href} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gold">Tài khoản</h3>
          <div className="mt-4 space-y-3 text-sm text-white/65">
            {accountLinks.map((link) => (
              <p key={link.href}>
                <Link href={link.href} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-gold/10 pt-6 text-xs text-white/45">
        © 2026 Tóc Việt Lab. All rights reserved.
      </div>
    </footer>
  );
}
