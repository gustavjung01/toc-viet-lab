import { jobPosts } from "./recruitment";

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

export type RecruitmentUsage = {
  postsThisMonth: number;
  activePosts: number;
  boostsThisMonth: number;
  paidPostCredits: number;
  paidBoostCredits: number;
  remainingPosts: number;
  remainingActive: number;
  remainingBoosts: number;
  canPost: boolean;
};

export const employerTypeLabels: Record<EmployerType, string> = {
  individual: "Cá nhân",
  salon: "Salon",
  academy: "Học viện",
  brand: "Brand / nhà phân phối",
};

export const workTypeLabels: Record<WorkType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  remote: "Remote",
  freelance: "Freelance",
};

export function randomRecruitmentId() {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

export function unixNow() {
  return Math.floor(Date.now() / 1000);
}

export function normalizeLocation(row: any) {
  return [row?.district, row?.city].filter(Boolean).join(", ") || String(row?.location ?? "Linh hoạt");
}

export function normalizeJobPost(row: any): RecruitmentJobPost {
  const now = unixNow();
  const boostUntil = row?.boostUntil ?? row?.boost_until ?? null;
  const publishedAt = row?.publishedAt ?? row?.published_at ?? null;
  const createdAt = row?.createdAt ?? row?.created_at ?? null;
  const expiresAt = row?.expiresAt ?? row?.expires_at ?? null;
  const employerDisplayName = String(row?.employerDisplayName ?? row?.employer_display_name ?? row?.employer ?? "Người tuyển dụng");
  const city = String(row?.city ?? "");
  const district = String(row?.district ?? "");
  const salaryText = String(row?.salaryText ?? row?.salary_text ?? row?.salary ?? "Thỏa thuận");
  const position = String(row?.position ?? row?.title ?? "Vị trí tuyển dụng");
  const description = String(row?.description ?? row?.desc ?? "Tin tuyển dụng đang được cập nhật mô tả.");
  const employerType = String(row?.employerType ?? row?.employer_type ?? "individual") as EmployerType;
  const workType = String(row?.workType ?? row?.work_type ?? "full_time") as WorkType;
  const status = String(row?.status ?? "published") as JobPostStatus;

  return {
    id: String(row?.id ?? randomRecruitmentId()),
    title: String(row?.title ?? position),
    position,
    employerDisplayName,
    employerType,
    city,
    district,
    address: String(row?.address ?? ""),
    location: normalizeLocation({ district, city, location: row?.location }),
    salaryText,
    workType,
    experienceLevel: String(row?.experienceLevel ?? row?.experience_level ?? ""),
    benefits: String(row?.benefits ?? ""),
    description,
    contactName: String(row?.contactName ?? row?.contact_name ?? employerDisplayName),
    contactPhone: String(row?.contactPhone ?? row?.contact_phone ?? ""),
    contactEmail: String(row?.contactEmail ?? row?.contact_email ?? ""),
    status,
    planCode: String(row?.planCode ?? row?.plan_code ?? "free") as "free" | "starter" | "growth",
    boostUntil: boostUntil ? Number(boostUntil) : null,
    publishedAt: publishedAt ? Number(publishedAt) : null,
    expiresAt: expiresAt ? Number(expiresAt) : null,
    createdAt: createdAt ? Number(createdAt) : null,
    featured: Boolean(row?.featured ?? (boostUntil ? Number(boostUntil) > now : false)),
    postedAt: String(row?.postedAt ?? formatPostedAt(Number(publishedAt ?? createdAt ?? now))),
    tags: Array.isArray(row?.tags)
      ? row.tags
      : [position, workTypeLabels[workType], employerTypeLabels[employerType]].filter(Boolean),
  };
}

export function getFallbackJobs() {
  return jobPosts.map(normalizeJobPost);
}

export function formatPostedAt(unixSeconds: number) {
  const diff = Math.max(unixNow() - unixSeconds, 0);
  const days = Math.floor(diff / 86400);
  if (days <= 0) return "Hôm nay";
  if (days === 1) return "Hôm qua";
  if (days < 7) return `${days} ngày trước`;
  const weeks = Math.floor(days / 7);
  return `${weeks} tuần trước`;
}

export function sanitizeText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

export function parseEmployerType(value: unknown): EmployerType {
  if (value === "salon" || value === "academy" || value === "brand" || value === "individual") return value;
  return "individual";
}

export function parseWorkType(value: unknown): WorkType {
  if (value === "part_time" || value === "remote" || value === "freelance" || value === "full_time") return value;
  return "full_time";
}
