import { NextRequest, NextResponse } from "next/server";

export function getServerApiBaseUrl() {
  const raw = process.env.SERVER_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return raw.replace(/\/$/, "");
}

export function hasServerApiBaseUrl() {
  return getServerApiBaseUrl().length > 0;
}

export function buildServerApiUrl(path: string) {
  const baseUrl = getServerApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function getForwardHeaders(req: NextRequest) {
  const headers = new Headers();
  const cookie = req.headers.get("cookie");
  const authorization = req.headers.get("authorization");
  const contentType = req.headers.get("content-type");
  const internalSecret = process.env.INTERNAL_API_SECRET;

  if (cookie) headers.set("cookie", cookie);
  if (authorization) headers.set("authorization", authorization);
  if (contentType) headers.set("content-type", contentType);
  if (internalSecret) headers.set("x-internal-api-secret", internalSecret);
  for (const headerName of [
    "x-tocviet-user-id",
    "x-tocviet-user-role",
    "x-tocviet-user-display-name",
    "x-tocviet-user-email",
  ]) {
    const value = req.headers.get(headerName);
    if (value) headers.set(headerName, value);
  }
  headers.set("x-tocviet-source", "vercel-next-proxy");

  return headers;
}

function mergeHeaders(baseHeaders: Headers, extraHeaders: HeadersInit | undefined) {
  if (!extraHeaders) return baseHeaders;

  const nextHeaders = new Headers(extraHeaders);
  nextHeaders.forEach((value, key) => {
    baseHeaders.set(key, value);
  });

  return baseHeaders;
}

export async function proxyToServerApi(req: NextRequest, path: string, init?: RequestInit) {
  if (!hasServerApiBaseUrl()) return null;

  const sourceUrl = new URL(req.url);
  const targetUrl = new URL(buildServerApiUrl(path));
  sourceUrl.searchParams.forEach((value, key) => targetUrl.searchParams.set(key, value));

  const headers = mergeHeaders(getForwardHeaders(req), init?.headers);
  const method = init?.method || req.method;
  const shouldForwardBody = !["GET", "HEAD"].includes(method.toUpperCase());

  const response = await fetch(targetUrl.toString(), {
    ...init,
    method,
    headers,
    body: shouldForwardBody ? await req.text() : undefined,
    cache: "no-store",
  });

  const text = await response.text();
  const contentType = response.headers.get("content-type") || "application/json";

  return new NextResponse(text, {
    status: response.status,
    headers: {
      "content-type": contentType,
      "x-tocviet-api-source": "vps",
    },
  });
}
