"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";

const DISMISS_KEY = "toc_viet_lab_in_app_browser_tip_dismissed";

function getUserAgent() {
  if (typeof navigator === "undefined") return "";
  return navigator.userAgent || "";
}

function isStandalone() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isIOS(userAgent = getUserAgent()) {
  return /iPhone|iPad|iPod/i.test(userAgent);
}

function isAndroid(userAgent = getUserAgent()) {
  return /Android/i.test(userAgent);
}

function isInAppBrowser(userAgent = getUserAgent()) {
  return /FBAN|FBAV|FB_IAB|Instagram|Zalo/i.test(userAgent);
}

function copyCurrentLink() {
  const url = window.location.href;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Đã copy link. Hãy mở Safari hoặc Chrome rồi dán link này để cài app ổn định hơn."))
      .catch(() => prompt("Copy link này rồi mở bằng Safari hoặc Chrome:", url));
    return;
  }

  prompt("Copy link này rồi mở bằng Safari hoặc Chrome:", url);
}

function openAndroidBrowser(packageName: "com.android.chrome" | "com.microsoft.emmx") {
  const encoded = encodeURIComponent(window.location.href);
  const hostPath = `${window.location.host}${window.location.pathname}${window.location.search}${window.location.hash}`;

  window.location.href = `intent://${hostPath}#Intent;scheme=https;package=${packageName};S.browser_fallback_url=${encoded};end`;
}

export function InAppBrowserTip() {
  const [visible, setVisible] = useState(false);
  const userAgent = getUserAgent();
  const ios = isIOS(userAgent);
  const android = isAndroid(userAgent);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone()) return;
    if (!isInAppBrowser()) return;

    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {}

    setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-3 bottom-[calc(14px+env(safe-area-inset-bottom))] z-[9999] rounded-3xl border border-gold/35 bg-black/95 p-4 text-cream-card shadow-[0_24px_80px_rgba(0,0,0,.55)] backdrop-blur-xl sm:left-auto sm:right-5 sm:max-w-md">
      <button
        type="button"
        aria-label="Đóng hướng dẫn mở trình duyệt"
        onClick={dismiss}
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:text-white"
      >
        <X size={16} />
      </button>

      <div className="pr-9">
        <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] text-gold">
          <ExternalLink size={16} />
          Đang mở trong Zalo/Facebook
        </div>
        <p className="mt-2 text-sm leading-6 text-white/75">
          {ios
            ? "Để cài Tóc Việt Lab ra màn hình chính trên iPhone, hãy mở link bằng Safari rồi chọn Chia sẻ > Thêm vào Màn hình chính."
            : "Để cài app và tránh lỗi cache trong trình duyệt nhúng, hãy mở bằng Chrome hoặc Edge."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {android ? (
          <>
            <button
              type="button"
              onClick={() => openAndroidBrowser("com.android.chrome")}
              className="rounded-full bg-gold px-4 py-2 text-sm font-extrabold text-black transition hover:bg-goldBright"
            >
              Mở Chrome
            </button>
            <button
              type="button"
              onClick={() => openAndroidBrowser("com.microsoft.emmx")}
              className="rounded-full border border-gold/30 px-4 py-2 text-sm font-extrabold text-gold transition hover:border-gold"
            >
              Mở Edge
            </button>
          </>
        ) : null}
        <button
          type="button"
          onClick={copyCurrentLink}
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/80 transition hover:border-white/40 hover:text-white"
        >
          Copy link
        </button>
      </div>
    </div>
  );
}
