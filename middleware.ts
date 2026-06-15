import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/tuyen-dung-cua-toi",
  "/tuyen-dung/dang-tin",
  "/so-tay",
  "/cong-thuc-cua-toi",
  "/ai-tu-van-mau",
  "/credit-ai",
  "/settings",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.webp).*)"],
};
