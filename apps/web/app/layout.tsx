import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tóc Việt Lab",
  description: "Nền tảng kiến thức tóc chuyên sâu, sổ tay công thức và công cụ AI cho salon Việt."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
