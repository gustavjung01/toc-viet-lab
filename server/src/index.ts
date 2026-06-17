import http from "node:http";
import { URL } from "node:url";
import { createRecruitmentJob, parseRecruitmentInternalActor, parseRecruitmentPostInput, recruitmentWriteHeaders } from "./recruitment-write";
import { getDatabasePool, getRecruitmentJobsPage, hasDatabaseUrl } from "./db";
import { getRecruitmentUsage } from "./recruitment-quota";

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
    "access-control-allow-headers":
      "content-type,authorization,x-tocviet-source,x-internal-api-secret,x-tocviet-user-id,x-tocviet-user-role,x-tocviet-user-display-name,x-tocviet-user-email",
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

function recruitmentWriteErrorBody(status: string, error: string) {
  return {
    ok: false,
    namespace: NAMESPACE,
    source: "vps-postgres",
    module: "recruitment",
    status,
    error,
  };
}

function parseBoundedInteger(rawValue: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(rawValue || "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function parseJsonBody(req: http.IncomingMessage) {
  return new Promise<unknown>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk) => {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : Buffer.from(chunk));
    });

    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8").trim();
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

async function handleRecruitmentJobs(req: http.IncomingMessage, res: http.ServerResponse, url: URL) {
  const mine = url.searchParams.get("mine") === "1";
  const limit = parseBoundedInteger(url.searchParams.get("limit"), 30, 1, 50);
  const offset = Math.max(parseBoundedInteger(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER), 0);

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

  if (mine) {
    const actor = parseRecruitmentInternalActor(req.headers);
    if ("statusCode" in actor) {
      sendJson(res, actor.statusCode, recruitmentErrorBody(actor.code, actor.message, limit, offset), recruitmentWriteHeaders());
      return;
    }

    try {
      const pool = getDatabasePool();
      const [page, usage] = await Promise.all([
        getRecruitmentJobsPage(limit, offset, { employerUserId: actor.userId }),
        getRecruitmentUsage(pool, actor.userId, actor.role),
      ]);

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
          usage,
          limit: page.limit,
          offset: page.offset,
        },
        { "x-tocviet-api-source": "vps-postgres" }
      );
      return;
    } catch (error: any) {
      sendJson(
        res,
        500,
        recruitmentErrorBody(
          "mine_query_failed",
          error?.message || "Failed to read your recruitment jobs from PostgreSQL.",
          limit,
          offset
        ),
        { "x-tocviet-api-source": "vps-postgres" }
      );
      return;
    }
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

async function handleRecruitmentJobCreate(req: http.IncomingMessage, res: http.ServerResponse) {
  if (!hasDatabaseUrl()) {
    sendJson(
      res,
      503,
      recruitmentWriteErrorBody(
        "database_not_configured",
        "DATABASE_URL is not configured on the Toc Viet VPS backend."
      ),
      recruitmentWriteHeaders()
    );
    return;
  }

  const actor = parseRecruitmentInternalActor(req.headers);
  if ("statusCode" in actor) {
    sendJson(res, actor.statusCode, recruitmentWriteErrorBody(actor.code, actor.message), recruitmentWriteHeaders());
    return;
  }

  let rawBody: unknown;
  try {
    rawBody = await parseJsonBody(req);
  } catch {
    sendJson(
      res,
      400,
      recruitmentWriteErrorBody("invalid_json", "Request body must be valid JSON."),
      recruitmentWriteHeaders()
    );
    return;
  }

  const payload = parseRecruitmentPostInput(rawBody);
  if ("statusCode" in payload) {
    sendJson(res, payload.statusCode, recruitmentWriteErrorBody(payload.code, payload.message), recruitmentWriteHeaders());
    return;
  }

  try {
    const result = await createRecruitmentJob(actor, payload);
    if ("statusCode" in result) {
      sendJson(res, result.statusCode, recruitmentWriteErrorBody(result.code, result.message), recruitmentWriteHeaders());
      return;
    }

    sendJson(
      res,
      201,
      {
        ok: true,
        namespace: NAMESPACE,
        source: "vps-postgres",
        module: "recruitment",
        job: result.job,
        usage: result.usage,
      },
      recruitmentWriteHeaders()
    );
  } catch (error: any) {
    sendJson(
      res,
      500,
      recruitmentWriteErrorBody(
        "write_failed",
        error?.message || "Failed to create recruitment job in PostgreSQL."
      ),
      recruitmentWriteHeaders()
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
      version: VERSION,
    });
    return;
  }

  if (method === "GET" && path === "/health") {
    sendJson(res, 200, healthBody());
    return;
  }

  if (path === "/recruitment/jobs") {
    if (method === "GET") {
      void handleRecruitmentJobs(req, res, url);
      return;
    }

    if (method === "POST") {
      void handleRecruitmentJobCreate(req, res);
      return;
    }

    if (method === "PATCH" || method === "DELETE") {
      sendJson(
        res,
        501,
        recruitmentWriteErrorBody(
          "not_implemented",
          `${method} /recruitment/jobs is not implemented on the Toc Viet VPS backend yet.`
        ),
        recruitmentWriteHeaders()
      );
      return;
    }
  }

  notFound(res, path);
});

server.listen(PORT, () => {
  console.log(`[tocviet-api] ${SERVICE_NAME} listening on :${PORT}`);
});
