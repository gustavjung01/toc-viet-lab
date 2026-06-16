export type EmployerType = "individual" | "salon" | "academy" | "brand";
export type JobPostStatus = "draft" | "published" | "expired" | "closed" | "rejected";
export type WorkType = "full_time" | "part_time" | "remote" | "freelance";

export type RecruitmentJobPost = {
  id: string;
  title: string;
  position: string;
  employerDisplayName: string;
  employerType: EmployerType;
  city: string;
  district: string;
  address: string;
  location: string;
  salaryText: string;
  workType: WorkType;
  experienceLevel: string;
  benefits: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  status: JobPostStatus;
  planCode: "free" | "starter" | "growth";
  boostUntil: number | null;
  publishedAt: number | null;
  expiresAt: number | null;
  createdAt: number | null;
  featured: boolean;
  postedAt: string;
  tags: string[];
};

const EMPLOYER_TYPE_LABELS: Record<EmployerType, string> = {
  individual: "Individual",
  salon: "Salon",
  academy: "Academy",
  brand: "Brand / Distributor",
};

const WORK_TYPE_LABELS: Record<WorkType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  remote: "Remote",
  freelance: "Freelance",
};

function readText(value: unknown, fallback = "") {
  const text = String(value ?? fallback).trim();
  return text.length > 0 ? text : fallback;
}

function readNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function readArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

export function unixNow() {
  return Math.floor(Date.now() / 1000);
}

function normalizeEmployerType(value: unknown): EmployerType {
  if (value === "salon" || value === "academy" || value === "brand" || value === "individual") return value;
  return "individual";
}

function normalizeWorkType(value: unknown): WorkType {
  if (value === "part_time" || value === "remote" || value === "freelance" || value === "full_time") return value;
  return "full_time";
}

function normalizeStatus(value: unknown): JobPostStatus {
  if (value === "draft" || value === "published" || value === "expired" || value === "closed" || value === "rejected") return value;
  return "published";
}

function formatPostedAt(unixSeconds: number) {
  const diff = Math.max(unixNow() - unixSeconds, 0);
  const days = Math.floor(diff / 86400);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} weeks ago`;
}

function normalizeLocation(row: Record<string, unknown>, city: string, district: string) {
  const locationValue = readText(row.location, "");
  if (district || city) {
    return [district, city].filter(Boolean).join(", ");
  }
  return locationValue || "Remote";
}

export function normalizeRecruitmentJob(row: Record<string, unknown>): RecruitmentJobPost {
  const now = unixNow();
  const employerType = normalizeEmployerType(row.employer_type ?? row.employerType);
  const workType = normalizeWorkType(row.work_type ?? row.workType);
  const status = normalizeStatus(row.status);
  const title = readText(row.title, readText(row.position, "Recruitment job"));
  const position = readText(row.position, title);
  const employerDisplayName = readText(row.employer_display_name ?? row.employerDisplayName, "Employer");
  const city = readText(row.city, "");
  const district = readText(row.district, "");
  const address = readText(row.address, "");
  const salaryText = readText(row.salary_text ?? row.salaryText, "Negotiable");
  const description = readText(row.description, "Recruitment post loaded from PostgreSQL.");
  const contactName = readText(row.contact_name ?? row.contactName, employerDisplayName);
  const contactPhone = readText(row.contact_phone ?? row.contactPhone, "");
  const contactEmail = readText(row.contact_email ?? row.contactEmail, "");
  const planCode = readText(row.plan_code ?? row.planCode, "free") as "free" | "starter" | "growth";
  const boostUntil = readNumber(row.boost_until ?? row.boostUntil);
  const publishedAt = readNumber(row.published_at ?? row.publishedAt);
  const expiresAt = readNumber(row.expires_at ?? row.expiresAt);
  const createdAt = readNumber(row.created_at ?? row.createdAt);
  const tags = readArray(row.tags);
  const fallbackTags = [position, WORK_TYPE_LABELS[workType], EMPLOYER_TYPE_LABELS[employerType]].filter(Boolean);

  return {
    id: readText(row.id, `job-${Date.now().toString(36)}`),
    title,
    position,
    employerDisplayName,
    employerType,
    city,
    district,
    address,
    location: normalizeLocation(row, city, district),
    salaryText,
    workType,
    experienceLevel: readText(row.experience_level ?? row.experienceLevel, ""),
    benefits: readText(row.benefits, ""),
    description,
    contactName,
    contactPhone,
    contactEmail,
    status,
    planCode,
    boostUntil,
    publishedAt,
    expiresAt,
    createdAt,
    featured: Boolean(boostUntil && boostUntil > now),
    postedAt: formatPostedAt(Number(publishedAt ?? createdAt ?? now)),
    tags: tags.length > 0 ? tags : fallbackTags,
  };
}
