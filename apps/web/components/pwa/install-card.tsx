"use client";

import { useEffect, useState } from "react";
import { Download, Smartphone, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

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

function isAndroid(userAgent = getUserAgent()) {
  return /Android/i.test(userAgent);
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
      .then(() => alert("Đã copy link. Hãy mở Safari hoặc Chrome rồi dán link này để cài app ổn định hơn."))
      .catch(() => prompt("Copy link này rồi mở bằng Safari hoặc Chrome:", url));
    return;
  }

  prompt("Copy link này rồi mở bằng Safari hoặc Chrome:", url);
}

function buildInstallGuide() {
  const userAgent = getUserAgent();

  if (isInAppBrowser(userAgent)) {
    return isIOS(userAgent)
      ? "Bạn đang mở trong Zalo/Facebook. Hãy copy link, mở Safari, dán link rồi chọn Chia sẻ > Thêm vào Màn hình chính."
      : "Bạn đang mở trong Zalo/Facebook. Hãy mở link bằng Chrome/Edge, rồi chọn Cài ứng dụng hoặc Thêm vào màn hình chính.";
  }

  if (isIOS(userAgent)) {
    return "Trên iPhone: mở bằng Safari, bấm nút Chia sẻ, rồi chọn Thêm vào Màn hình chính.";
  }

  if (isAndroid(userAgent)) {
    return "Trên Android: mở bằng Chrome hoặc Edge, rồi chọn Cài ứng dụng hoặc Thêm vào màn hình chính.";
  }

  return "Mở website bằng Chrome hoặc Edge. Nếu trình duyệt hỗ trợ, dùng nút cài đặt trên thanh địa chỉ.";
}

export function PwaInstallCard() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isStandalone() || getStoredState() === "installed" || getStoredState() === "dismissed") {
      setVisible(false);
      return;
    }

    setVisible(true);

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
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

  if (!visible || installed) return null;

  async function handleInstallClick() {
    if (isStandalone()) {
      setStoredState("installed");
      setVisible(false);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);

      if (choice.outcome === "accepted") {
        setStoredState("installed");
        setVisible(false);
      }
      return;
    }

    if (isInAppBrowser()) {
      copyCurrentLink();
      return;
    }

    alert(buildInstallGuide());
  }

  function dismiss() {
    setStoredState("dismissed");
    setVisible(false);
  }

  return (
    <div className="relative mt-6 max-w-2xl overflow-hidden rounded-3xl border border-gold/25 bg-white/[0.06] p-4 pr-12 shadow-[0_24px_90px_rgba(0,0,0,.25)] backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:gap-5">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Ẩn khung tải app"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-white/55 transition hover:text-white"
      >
        <X size={16} />
      </button>

      <div className="mb-4 text-left sm:mb-0">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
          <Smartphone size={15} />
          Cài nhanh trên điện thoại
        </div>
        <h2 className="mt-2 text-xl font-black text-white">Tải Tóc Việt Lab ra màn hình chính</h2>
        <p className="mt-1 text-sm leading-6 text-white/65">
          Mở nhanh như app, tiện tra công thức màu, case thực tế và tuyển dụng ngay tại salon.
        </p>
      </div>

      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-extrabold text-black shadow-gold transition hover:bg-goldBright sm:w-auto sm:min-w-32"
      >
        <Download size={17} />
        Tải app
      </button>
    </div>
  );
}
