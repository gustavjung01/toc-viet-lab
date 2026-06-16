import http from "node:http";
import { URL } from "node:url";
import { getRecruitmentJobsPage, hasDatabaseUrl } from "./db";

const PORT = Number(process.env.PORT || process.env.API_PORT || 4000);
const SERVICE_NAME = process.env.SERVICE_NAME || "tocviet-api";
const NAMESPACE = process.env.APP_NAMESPACE || "tocviet";
const VERSION = process.env.npm_package_version || process.env.APP_VERSION || "0.1.0";
const STARTED_AT = new Date();

type JsonBody = Record<string, unknown>;

function sendJson(res: http.ServerResponse, statusCode: number, body: JsonBody, extraHeaders: Record<string, string> = {}) {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": process.env.CORS_ORIGIN || "https://tocvietlab.studio",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization,x-tocviet-source",
    ...extraHeaders,
  });
  res.end(payload);
}

function notFound(res: http.ServerResponse, path: string) {
  sendJson(res, 404, {
    ok: false,
    error: "Not found",
    path,
  });
}

function healthBody() {
  return {
    ok: true,
    namespace: NAMESPACE,
    service: SERVICE_NAME,
    version: VERSION,
    runtime: "node",
    environment: process.env.NODE_ENV || "development",
    startedAt: STARTED_AT.toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}

function recruitmentErrorBody(status: string, error: string, limit: number, offset: number) {
  return {
    ok: false,
    namespace: NAMESPACE,
    source: "vps-postgres",
    module: "recruitment",
    status,
    error,
    limit,
    offset,
  };
}

function parseBoundedInteger(rawValue: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(rawValue || "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

async function handleRecruitmentJobs(req: http.IncomingMessage, res: http.ServerResponse, url: URL) {
  const mine = url.searchParams.get("mine") === "1";
  const limit = parseBoundedInteger(url.searchParams.get("limit"), 30, 1, 50);
  const offset = Math.max(parseBoundedInteger(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER), 0);

  if (mine) {
    sendJson(
      res,
      501,
      recruitmentErrorBody(
        "mine_not_implemented",
        "GET /recruitment/jobs?mine=1 is not implemented on the Toc Viet VPS backend yet.",
        limit,
        offset
      ),
      { "x-tocviet-api-source": "vps-postgres" }
    );
    return;
  }

  if (!hasDatabaseUrl()) {
    sendJson(
      res,
      503,
      recruitmentErrorBody(
        "database_not_configured",
        "DATABASE_URL is not configured on the Toc Viet VPS backend.",
        limit,
        offset
      ),
      { "x-tocviet-api-source": "vps-postgres" }
    );
    return;
  }

  try {
    const page = await getRecruitmentJobsPage(limit, offset);
    sendJson(
      res,
      200,
      {
        ok: true,
        namespace: NAMESPACE,
        source: "vps-postgres",
        module: "recruitment",
        jobs: page.jobs,
        total: page.total,
        limit: page.limit,
        offset: page.offset,
      },
      { "x-tocviet-api-source": "vps-postgres" }
    );
  } catch (error: any) {
    sendJson(
      res,
      500,
      recruitmentErrorBody(
        "query_failed",
        error?.message || "Failed to read recruitment jobs from PostgreSQL.",
        limit,
        offset
      ),
      { "x-tocviet-api-source": "vps-postgres" }
    );
  }
}

const server = http.createServer((req, res) => {
  const method = req.method || "GET";
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const path = url.pathname.replace(/\/$/, "") || "/";

  if (method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (method === "GET" && path === "/") {
    sendJson(res, 200, {
      ok: true,
      namespace: NAMESPACE,
      service: SERVICE_NAME,
      message: "Toc Viet Lab backend API is running.",
      health: "/health",
    });
    return;
  }

  if (method === "GET" && path === "/health") {
    sendJson(res, 200, healthBody());
    return;
  }

  if (method === "GET" && path === "/recruitment/jobs") {
    void handleRecruitmentJobs(req, res, url);
    return;
  }

  if (path === "/recruitment/jobs") {
    sendJson(
      res,
      501,
      {
        ok: false,
        namespace: NAMESPACE,
        source: "vps-postgres",
        module: "recruitment",
        status: "not-implemented",
        error: "Write actions for recruitment VPS API are not implemented yet.",
      },
      { "x-tocviet-api-source": "vps-postgres" }
    );
    return;
  }

  notFound(res, path);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`${SERVICE_NAME} listening on 0.0.0.0:${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing HTTP server...");
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Closing HTTP server...");
  server.close(() => process.exit(0));
});
