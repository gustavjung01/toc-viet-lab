import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Providers } from "@/components/providers";
import { InAppBrowserTip } from "@/components/pwa/in-app-browser-tip";
import { PwaRegister } from "@/components/pwa-register";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tóc Việt Lab",
    template: "%s | Tóc Việt Lab"
  },
  description: "Nền tảng kiến thức tóc chuyên sâu, sổ tay công thức và công cụ AI cho salon Việt.",
  applicationName: "Tóc Việt Lab",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Tóc Việt Lab",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: [
      { url: "/logo/toc-viet-lab-logo.png", type: "image/png" },
      { url: "/logo/toc-viet-lab-logo.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/logo/toc-viet-lab-logo.png" }]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#030303",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <PwaRegister />
        <InAppBrowserTip />
      </body>
    </html>
  );
}
