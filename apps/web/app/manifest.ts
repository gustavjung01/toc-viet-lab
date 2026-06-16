import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Tóc Việt Lab",
    short_name: "Tóc Việt",
    description:
      "Nền tảng kiến thức tóc chuyên sâu, sổ tay công thức và công cụ AI cho salon Việt.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#11100E",
    orientation: "portrait",
    icons: [
      {
        src: "/logo/toc-viet-lab-logo.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/logo/toc-viet-lab-logo.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Công thức màu",
        short_name: "Công thức",
        description: "Mở thư viện công thức màu mẫu.",
        url: "/cong-thuc-mau",
        icons: [{ src: "/logo/toc-viet-lab-logo.png", sizes: "1254x1254" }]
      },
      {
        name: "Tuyển dụng ngành tóc",
        short_name: "Tuyển dụng",
        description: "Mở trang tin tuyển dụng ngành tóc.",
        url: "/tuyen-dung",
        icons: [{ src: "/logo/toc-viet-lab-logo.png", sizes: "1254x1254" }]
      },
      {
        name: "Gói thành viên",
        short_name: "Thành viên",
        description: "Xem các gói thành viên của Tóc Việt Lab.",
        url: "/goi-thanh-vien",
        icons: [{ src: "/logo/toc-viet-lab-logo.png", sizes: "1254x1254" }]
      }
    ]
  };
}
