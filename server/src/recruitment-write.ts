import type http from "node:http";
import { randomUUID } from "node:crypto";
import { getDatabasePool } from "./db";
import { normalizeRecruitmentJob, unixNow, type EmployerType, type WorkType } from "./recruitment";
import { claimPaidRecruitmentPostCredit, getRecruitmentLimits, getRecruitmentUsage, type RecruitmentUserRole } from "./recruitment-quota";

export type RecruitmentInternalActor = {
  userId: string;
  role: RecruitmentUserRole;
  displayName: string;
  email: string;
  source: string;
};

export type RecruitmentPostInput = {
  title: string;
  position: string;
  employerDisplayName: string;
  employerType: EmployerType;
  city: string;
  district: string;
  address: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryText: string;
  workType: WorkType;
  experienceLevel: string;
  benefits: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  description: string;
  tags: string[];
};

export type RecruitmentWriteError = {
  statusCode: number;
  code: string;
  message: string;
};

export function recruitmentWriteHeaders() {
  return {
    "x-tocviet-api-source": "vps-postgres",
  };
}

function readHeader(headers: http.IncomingHttpHeaders, keys: string[]) {
  for (const key of keys) {
    const value = headers[key];
    if (Array.isArray(value)) {
      const first = value.find((item) => String(item).trim().length > 0);
      if (first) return String(first).trim();
      continue;
    }

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return "";
}

function normalizeEmployerType(value: unknown): EmployerType {
  if (value === "salon" || value === "academy" || value === "brand" || value === "individual") return value;
  return "individual";
}

function normalizeWorkType(value: unknown): WorkType {
  if (value === "part_time" || value === "remote" || value === "freelance" || value === "full_time") return value;
  return "full_time";
}

function readText(value: unknown, fallback = "") {
  const text = String(value ?? fallback).trim();
  return text.length > 0 ? text : fallback;
}

function readNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function readTags(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function buildFallbackTags(position: string, workType: WorkType, employerType: EmployerType) {
  const workTypeLabels: Record<WorkType, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    remote: "Remote",
    freelance: "Freelance",
  };

  const employerTypeLabels: Record<EmployerType, string> = {
    individual: "Individual",
    salon: "Salon",
    academy: "Academy",
    brand: "Brand / Distributor",
  };

  return [position, workTypeLabels[workType], employerTypeLabels[employerType]].filter(Boolean);
}

function normalizeRole(value: string): RecruitmentUserRole {
  if (value === "free" || value === "member" || value === "pro") return value;
  return "free";
}

export function parseRecruitmentInternalActor(headers: http.IncomingHttpHeaders): RecruitmentInternalActor | RecruitmentWriteError {
  const configuredSecret = process.env.INTERNAL_API_SECRET?.trim() ?? "";
  if (!configuredSecret) {
    return {
      statusCode: 503,
      code: "internal_secret_not_configured",
      message: "INTERNAL_API_SECRET is not configured on the Toc Viet VPS backend.",
    };
  }

  const source = readHeader(headers, ["x-tocviet-source"]);
  if (source && source !== "vercel-next-proxy") {
    return {
      statusCode: 403,
      code: "invalid_source",
      message: "Write requests must come through the Vercel proxy.",
    };
  }

  const suppliedSecret = readHeader(headers, ["x-internal-api-secret"]);
  const authorization = readHeader(headers, ["authorization"]);
  const bearerToken = authorization.replace(/^Bearer\s+/i, "");
  const internalSecret = suppliedSecret || bearerToken;
  if (internalSecret !== configuredSecret) {
    return {
      statusCode: 401,
      code: "invalid_internal_secret",
      message: "Missing or invalid INTERNAL_API_SECRET.",
    };
  }

  const userId = readHeader(headers, ["x-tocviet-user-id", "x-tocviet-userid", "x-user-id"]);
  if (!userId) {
    return {
      statusCode: 401,
      code: "missing_user_context",
      message: "Missing x-tocviet-user-id for the recruitment write request.",
    };
  }

  return {
    userId,
    role: normalizeRole(readHeader(headers, ["x-tocviet-user-role", "x-tocviet-role", "x-user-role"]) || "free"),
    displayName: readHeader(headers, ["x-tocviet-user-display-name", "x-tocviet-display-name", "x-user-name"]),
    email: readHeader(headers, ["x-tocviet-user-email", "x-user-email"]),
    source: source || "direct",
  };
}

export function parseRecruitmentPostInput(raw: unknown): RecruitmentPostInput | RecruitmentWriteError {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      statusCode: 400,
      code: "invalid_body",
      message: "Request body must be a JSON object.",
    };
  }

  const input = raw as Record<string, unknown>;
  const title = readText(input.title);
  const position = readText(input.position, title);
  const employerDisplayName = readText(input.employerDisplayName);
  const employerType = normalizeEmployerType(input.employerType);
  const city = readText(input.city);
  const district = readText(input.district, "");
  const address = readText(input.address, "");
  const salaryText = readText(input.salaryText, "Negotiable");
  const salaryMin = readNumber(input.salaryMin);
  const salaryMax = readNumber(input.salaryMax);
  const workType = normalizeWorkType(input.workType);
  const experienceLevel = readText(input.experienceLevel, "");
  const benefits = readText(input.benefits, "");
  const contactName = readText(input.contactName, employerDisplayName);
  const contactPhone = readText(input.contactPhone, "");
  const contactEmail = readText(input.contactEmail, "");
  const description = readText(input.description);
  const tags = readTags(input.tags);

  if (!title || !position || !employerDisplayName || !city || !description || !contactName) {
    return {
      statusCode: 400,
      code: "missing_required_fields",
      message: "Missing required recruitment fields: title, employerDisplayName, city, description, contactName.",
    };
  }

  return {
    title,
    position,
    employerDisplayName,
    employerType,
    city,
    district,
    address,
    salaryMin,
    salaryMax,
    salaryText,
    workType,
    experienceLevel,
    benefits,
    contactName,
    contactPhone,
    contactEmail,
    description,
    tags,
  };
}

export type RecruitmentWriteResult = {
  job: ReturnType<typeof normalizeRecruitmentJob>;
  usage: Awaited<ReturnType<typeof getRecruitmentUsage>>;
};

export async function createRecruitmentJob(
  actor: RecruitmentInternalActor,
  input: RecruitmentPostInput
): Promise<RecruitmentWriteResult | RecruitmentWriteError> {
  const pool = getDatabasePool();
  const client = await pool.connect();
  const now = unixNow();
  const expiresAt = now + 30 * 24 * 60 * 60;

  try {
    await client.query("BEGIN");

    const usage = await getRecruitmentUsage(client, actor.userId, actor.role);
    if (!usage.canPost) {
      await client.query("ROLLBACK");
      return {
        statusCode: 402,
        code: "quota_exhausted",
        message: "Đã hết quota đăng tin. Vui lòng mua gói đăng thêm hoặc gói tuyển nhiều.",
      };
    }

    const limits = getRecruitmentLimits(actor.role);
    const usingPaidPostCredit = usage.postsThisMonth >= limits.monthlyPosts;
    const claimedCredit = usingPaidPostCredit ? await claimPaidRecruitmentPostCredit(client, actor.userId) : null;
    if (usingPaidPostCredit && !claimedCredit) {
      await client.query("ROLLBACK");
      return {
        statusCode: 402,
        code: "post_credit_unavailable",
        message: "Không còn credit đăng tin trả phí khả dụng cho tài khoản này.",
      };
    }

    const planCode: "free" | "starter" | "growth" = claimedCredit ? claimedCredit.package_code : "free";
    const id = `vps-job-${randomUUID().replace(/-/g, "").slice(0, 16)}`;
    const tags = input.tags.length > 0 ? input.tags : buildFallbackTags(input.position, input.workType, input.employerType);
    const publishedAt = now;

    const inserted = await client.query<Record<string, unknown>>(
      `INSERT INTO tocviet.job_posts (
        id,
        employer_user_id,
        employer_display_name,
        employer_type,
        title,
        position,
        description,
        city,
        district,
        address,
        salary_min,
        salary_max,
        salary_text,
        work_type,
        experience_level,
        benefits,
        contact_name,
        contact_phone,
        contact_email,
        status,
        plan_code,
        published_at,
        expires_at,
        created_at,
        tags
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, 'published',
        $20, $21, $22, $23, $24
      )
      RETURNING *`,
      [
        id,
        actor.userId,
        input.employerDisplayName,
        input.employerType,
        input.title,
        input.position,
        input.description,
        input.city,
        input.district,
        input.address,
        input.salaryMin,
        input.salaryMax,
        input.salaryText,
        input.workType,
        input.experienceLevel,
        input.benefits,
        input.contactName,
        input.contactPhone,
        input.contactEmail,
        planCode,
        publishedAt,
        expiresAt,
        now,
        tags,
      ]
    );

    const nextUsage = await getRecruitmentUsage(client, actor.userId, actor.role);
    await client.query("COMMIT");

    return {
      job: normalizeRecruitmentJob(inserted.rows[0] ?? {}),
      usage: nextUsage,
    };
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {}
    throw error;
  } finally {
    client.release();
  }
}
