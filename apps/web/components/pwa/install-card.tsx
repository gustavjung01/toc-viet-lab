"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Smartphone, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type InstallMode = "prompt" | "ios" | "in-app";

const CARD_STATE_KEY = "toc_viet_lab_pwa_install_card_state";

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

function isInAppBrowser(userAgent = getUserAgent()) {
  return /FBAN|FBAV|FB_IAB|Instagram|Zalo/i.test(userAgent);
}

function getStoredState() {
  try {
    return window.localStorage.getItem(CARD_STATE_KEY) || "";
  } catch {
    return "";
  }
}

function setStoredState(nextState: "dismissed" | "installed") {
  try {
    window.localStorage.setItem(CARD_STATE_KEY, nextState);
  } catch {}
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

export function PwaInstallCard() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [mode, setMode] = useState<InstallMode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isStandalone() || getStoredState() === "installed" || getStoredState() === "dismissed") {
      setVisible(false);
      return;
    }

    const userAgent = getUserAgent();

    // iPhone/iPad has no Android-style install prompt. Show a calm inline guide only on Safari-like browsers.
    if (isIOS(userAgent) && !isInAppBrowser(userAgent)) {
      setMode("ios");
      setVisible(true);
    }

    // Zalo/Facebook/Instagram browsers need a browser-switch guide, not a fake install prompt.
    if (isInAppBrowser(userAgent)) {
      setMode("in-app");
      setVisible(true);
    }

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setMode("prompt");
      setVisible(true);
    }

    function onInstalled() {
      setInstalled(true);
      setDeferredPrompt(null);
      setStoredState("installed");
      setVisible(false);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!visible || installed || !mode) return null;

  async function handleInstallClick() {
    if (isStandalone()) {
      setStoredState("installed");
      setVisible(false);
      return;
    }

    if (mode === "prompt" && deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);

      if (choice.outcome === "accepted") {
        setStoredState("installed");
        setVisible(false);
      }
      return;
    }

    if (mode === "in-app") {
      copyCurrentLink();
    }
  }

  function dismiss() {
    setStoredState("dismissed");
    setVisible(false);
  }

  const isGuide = mode !== "prompt";

  return (
    <div className="relative mt-6 max-w-2xl overflow-hidden rounded-3xl border border-gold/25 bg-white/[0.06] p-4 shadow-[0_24px_90px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-5">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Ẩn khung tải app"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-white/55 transition hover:text-white"
      >
        <X size={16} />
      </button>

      <div className="pr-9">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
          {mode === "in-app" ? <ExternalLink size={15} /> : <Smartphone size={15} />}
          {mode === "in-app" ? "Mở bằng trình duyệt ngoài" : "Cài nhanh trên điện thoại"}
        </div>
        <h2 className="mt-2 text-xl font-black text-white">
          {mode === "prompt"
            ? "Tải Tóc Việt Lab ra màn hình chính"
            : mode === "ios"
              ? "iPhone: thêm Tóc Việt Lab vào Màn hình chính"
              : "Zalo/Facebook: mở Safari hoặc Chrome trước"}
        </h2>
        <p className="mt-1 text-sm leading-6 text-white/65">
          {mode === "prompt"
            ? "Mở nhanh như app, tiện tra công thức màu, case thực tế và tuyển dụng ngay tại salon."
            : mode === "ios"
              ? "Mở bằng Safari, bấm nút Chia sẻ, rồi chọn Thêm vào Màn hình chính. Bấm X nếu bạn đã thêm rồi."
              : "Trình duyệt nhúng không cài PWA ổn định. Copy link rồi mở bằng Safari hoặc Chrome để cài app."}
        </p>
      </div>

      {isGuide ? (
        <div className="mt-4 rounded-2xl border border-gold/15 bg-black/25 p-3 text-sm leading-6 text-white/70">
          {mode === "ios" ? (
            <ol className="list-decimal space-y-1 pl-5">
              <li>Mở trang bằng Safari.</li>
              <li>Bấm nút Chia sẻ.</li>
              <li>Chọn Thêm vào Màn hình chính.</li>
            </ol>
          ) : (
            <p>Copy link, mở Safari/Chrome, dán link rồi dùng nút cài app của trình duyệt.</p>
          )}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {mode === "prompt" ? (
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-extrabold text-black shadow-gold transition hover:bg-goldBright sm:w-auto sm:min-w-32"
          >
            <Download size={17} />
            Tải app
          </button>
        ) : null}

        {mode === "in-app" ? (
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-extrabold text-black shadow-gold transition hover:bg-goldBright sm:w-auto sm:min-w-32"
          >
            <Download size={17} />
            Copy link
          </button>
        ) : null}
      </div>
    </div>
  );
}
