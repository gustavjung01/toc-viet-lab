import http from "node:http";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || process.env.API_PORT || 4000);
const SERVICE_NAME = process.env.SERVICE_NAME || "tocviet-api";
const NAMESPACE = process.env.APP_NAMESPACE || "tocviet";
const VERSION = process.env.npm_package_version || process.env.APP_VERSION || "0.1.0";
const STARTED_AT = new Date();

type JsonBody = Record<string, unknown>;

function sendJson(res: http.ServerResponse, statusCode: number, body: JsonBody) {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": process.env.CORS_ORIGIN || "https://tocvietlab.studio",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization,x-tocviet-source",
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

function emptyRecruitmentJobsBody() {
  return {
    ok: true,
    namespace: NAMESPACE,
    source: "vps-skeleton",
    module: "recruitment",
    jobs: [],
    total: 0,
    limit: 30,
    offset: 0,
    status: "empty-until-database-migration",
    message: "Recruitment VPS API skeleton is reachable. Database-backed jobs come in the next deployment batch.",
  };
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
    sendJson(res, 200, emptyRecruitmentJobsBody());
    return;
  }

  if (path === "/recruitment/jobs") {
    sendJson(res, 501, {
      ok: false,
      module: "recruitment",
      status: "not-implemented",
      message: "Write actions for recruitment VPS API are not implemented yet. Data migration comes in the next deployment batch.",
    });
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
