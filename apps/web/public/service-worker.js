const CACHE_VERSION = "toc-viet-lab-static-v1";
const STATIC_CACHE = `${CACHE_VERSION}-assets`;
const STATIC_ASSET_RE = /\.(?:js|css|png|jpg|jpeg|svg|webp|gif|ico|woff2?)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("toc-viet-lab-") && key !== STATIC_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  // Never cache API/auth/version/control files.
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname === "/service-worker.js") return;
  if (url.pathname === "/manifest.webmanifest") return;
  if (url.pathname === "/app-version.json") return;

  // Keep HTML navigation network-owned to avoid stale pages and login/session issues.
  if (request.mode === "navigate") return;

  if (url.pathname.startsWith("/_next/static/") || STATIC_ASSET_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  if (cached) return cached;

  const response = await fetch(request);

  if (response && response.ok) {
    cache.put(request, response.clone());
  }

  return response;
}
