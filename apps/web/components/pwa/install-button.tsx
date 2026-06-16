"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Smartphone, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type PwaInstallButtonProps = {
  className?: string;
  label?: string;
  compact?: boolean;
};

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
      .then(() => alert("Đã copy link. Hãy mở Safari hoặc Chrome rồi dán link này để cài app."))
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

export function PwaInstallButton({ className, label = "Tải app", compact = false }: PwaInstallButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStandalone(isStandalone());

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    }

    function onInstalled() {
      setInstalled(true);
      setDeferredPrompt(null);
      setStandalone(true);
      setGuideOpen(false);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (mounted && (standalone || installed)) return null;

  async function handleClick() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);

      if (choice.outcome === "accepted") {
        setInstalled(true);
        setStandalone(true);
      }
      return;
    }

    setGuideOpen(true);
  }

  const userAgent = mounted ? getUserAgent() : "";
  const ios = isIOS(userAgent);
  const android = isAndroid(userAgent);
  const inApp = isInAppBrowser(userAgent);

  return (
    <>
      <button type="button" onClick={handleClick} className={className} aria-label="Tải app Tóc Việt Lab">
        <Download size={compact ? 15 : 17} />
        {label}
      </button>

      {guideOpen ? (
        <div className="fixed inset-0 z-[10000] grid place-items-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-gold/30 bg-[#080706] p-5 text-cream-card shadow-[0_30px_120px_rgba(0,0,0,.65)]">
            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              aria-label="Đóng hướng dẫn tải app"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:text-white"
            >
              <X size={17} />
            </button>

            <div className="pr-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
                {inApp ? <ExternalLink size={14} /> : <Smartphone size={14} />}
                {inApp ? "Mở bằng trình duyệt ngoài" : "Cài Tóc Việt Lab"}
              </div>
              <h2 className="mt-4 text-2xl font-black text-white">
                {inApp ? "Zalo/Facebook không cài app trực tiếp ổn định" : "Cài ra màn hình chính như một app"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {inApp
                  ? "Copy link hoặc mở bằng Chrome/Edge. Trên iPhone, mở Safari rồi chọn Chia sẻ > Thêm vào Màn hình chính."
                  : ios
                    ? "Trên iPhone/iPad: mở bằng Safari, bấm nút Chia sẻ, rồi chọn Thêm vào Màn hình chính."
                    : android
                      ? "Trên Android: mở bằng Chrome hoặc Edge, bấm menu trình duyệt, rồi chọn Cài ứng dụng hoặc Thêm vào màn hình chính."
                      : "Trên Chrome/Edge desktop: bấm biểu tượng cài đặt trên thanh địa chỉ hoặc mở menu trình duyệt rồi chọn Cài đặt Tóc Việt Lab."}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {inApp && android ? (
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
                    className="rounded-full border border-gold/35 px-4 py-2 text-sm font-extrabold text-gold transition hover:border-gold"
                  >
                    Mở Edge
                  </button>
                </>
              ) : null}

              {inApp ? (
                <button
                  type="button"
                  onClick={copyCurrentLink}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Copy link
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/60 transition hover:border-white/30 hover:text-white"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
