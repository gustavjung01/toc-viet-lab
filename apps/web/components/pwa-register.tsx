"use client";

import { useEffect } from "react";

const VERSION_KEY = "toc_viet_lab_app_version";

function canRegisterServiceWorker() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    (window.location.protocol === "https:" || window.location.hostname === "localhost")
  );
}

function injectToastStyle() {
  if (document.getElementById("tocviet-pwa-update-style")) return;

  const style = document.createElement("style");
  style.id = "tocviet-pwa-update-style";
  style.textContent = [
    ".tocviet-pwa-update{position:fixed;left:50%;bottom:max(18px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9999;width:min(430px,calc(100% - 24px));display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(214,168,79,.42);border-radius:18px;background:rgba(8,7,6,.94);color:#F8F1E7;padding:12px 14px;box-shadow:0 18px 60px rgba(0,0,0,.42);backdrop-filter:blur(14px)}",
    ".tocviet-pwa-update strong{display:block;color:#F0C76A;font-size:14px}",
    ".tocviet-pwa-update span{display:block;color:#B9AEA1;font-size:12px;line-height:1.35}",
    ".tocviet-pwa-update button{border:0;border-radius:999px;background:linear-gradient(180deg,#F0C76A,#D6A84F);color:#080706;font-weight:800;padding:9px 13px;cursor:pointer;white-space:nowrap}"
  ].join("");

  document.head.appendChild(style);
}

function showUpdateToast() {
  if (document.getElementById("tocviet-pwa-update")) return;

  injectToastStyle();

  const box = document.createElement("div");
  box.id = "tocviet-pwa-update";
  box.className = "tocviet-pwa-update";
  box.innerHTML =
    "<div><strong>Có bản mới</strong><span>Bấm cập nhật để dùng phiên bản mới nhất.</span></div>" +
    "<button type='button'>Cập nhật</button>";

  box.querySelector("button")?.addEventListener("click", () => {
    window.location.reload();
  });

  document.body.appendChild(box);
}

export function PwaRegister() {
  useEffect(() => {
    if (!canRegisterServiceWorker()) return;

    let busy = false;
    let updateReady = false;
    let alive = true;

    const registrationPromise = navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((registration) => {
        registration.update().catch(() => undefined);
        return registration;
      })
      .catch(() => null);

    async function checkVersion() {
      if (busy || updateReady || !alive) return;
      busy = true;

      try {
        const response = await fetch(`/app-version.json?t=${Date.now()}`, {
          cache: "no-store",
          headers: { Accept: "application/json" }
        });

        if (!response.ok) return;

        const data = (await response.json()) as { version?: string; builtAt?: string };
        const next = String(data.version || data.builtAt || "");

        if (!next) return;

        const current = window.localStorage.getItem(VERSION_KEY);

        if (!current) {
          window.localStorage.setItem(VERSION_KEY, next);
          return;
        }

        if (current !== next) {
          window.localStorage.setItem(VERSION_KEY, next);
          updateReady = true;

          const registration = await registrationPromise;
          await registration?.update?.();

          if (alive) showUpdateToast();
        }
      } catch {
        // PWA update checks should never interrupt the main app.
      } finally {
        busy = false;
      }
    }

    function checkWhenVisible() {
      if (document.visibilityState === "visible") {
        void checkVersion();
      }
    }

    window.addEventListener("pageshow", checkVersion);
    window.addEventListener("focus", checkVersion);
    document.addEventListener("visibilitychange", checkWhenVisible);

    const intervalId = window.setInterval(checkWhenVisible, 60_000);
    void checkVersion();

    return () => {
      alive = false;
      window.removeEventListener("pageshow", checkVersion);
      window.removeEventListener("focus", checkVersion);
      document.removeEventListener("visibilitychange", checkWhenVisible);
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
}
