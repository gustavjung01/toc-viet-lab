import { auth } from "@/auth";
import { executeD1, hasD1Env, queryD1 } from "@/lib/d1-http";
import { NextRequest, NextResponse } from "next/server";

type JobSeekerProfile = {
  isLookingForJob: boolean;
  desiredPosition: string;
  experienceLevel: string;
  yearsOfExperience: string;
  skills: string;
  preferredCities: string;
  preferredDistricts: string;
  expectedSalaryText: string;
  workType: string;
  portfolioUrl: string;
  shortIntroduction: string;
  contactPhone: string;
  contactEmail: string;
};

type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  ai_credits: number | null;
  phone?: string | null;
  city?: string | null;
  district?: string | null;
  bio?: string | null;
  job_seeker_profile?: string | null;
};

const defaultJobSeekerProfile: JobSeekerProfile = {
  isLookingForJob: false,
  desiredPosition: "",
  experienceLevel: "",
  yearsOfExperience: "",
  skills: "",
  preferredCities: "",
  preferredDistricts: "",
  expectedSalaryText: "",
  workType: "full_time",
  portfolioUrl: "",
  shortIntroduction: "",
  contactPhone: "",
  contactEmail: "",
};

let profileStorageChecked = false;

function isDuplicateColumnError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.toLowerCase().includes("duplicate column") || message.toLowerCase().includes("already exists");
}

async function addColumnIfMissing(sql: string) {
  try {
    await executeD1(sql);
  } catch (error) {
    if (!isDuplicateColumnError(error)) throw error;
  }
}

async function ensureProfileStorage() {
  if (profileStorageChecked) return;

  await addColumnIfMissing("ALTER TABLE users ADD COLUMN phone TEXT NOT NULL DEFAULT ''");
  await addColumnIfMissing("ALTER TABLE users ADD COLUMN city TEXT NOT NULL DEFAULT ''");
  await addColumnIfMissing("ALTER TABLE users ADD COLUMN district TEXT NOT NULL DEFAULT ''");
  await addColumnIfMissing("ALTER TABLE users ADD COLUMN bio TEXT NOT NULL DEFAULT ''");
  await addColumnIfMissing("ALTER TABLE users ADD COLUMN job_seeker_profile TEXT NOT NULL DEFAULT '{}'");

  profileStorageChecked = true;
}

function text(value: unknown, maxLength = 240) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function parseJobSeekerProfile(raw: unknown): JobSeekerProfile {
  if (!raw || typeof raw !== "object") return defaultJobSeekerProfile;
  const data = raw as Record<string, unknown>;
  return {
    isLookingForJob: Boolean(data.isLookingForJob),
    desiredPosition: text(data.desiredPosition, 120),
    experienceLevel: text(data.experienceLevel, 80),
    yearsOfExperience: text(data.yearsOfExperience, 40),
    skills: text(data.skills, 500),
    preferredCities: text(data.preferredCities, 200),
    preferredDistricts: text(data.preferredDistricts, 200),
    expectedSalaryText: text(data.expectedSalaryText, 120),
    workType: text(data.workType || "full_time", 40),
    portfolioUrl: text(data.portfolioUrl, 240),
    shortIntroduction: text(data.shortIntroduction, 800),
    contactPhone: text(data.contactPhone, 40),
    contactEmail: text(data.contactEmail, 120),
  };
}

function readStoredJobSeekerProfile(value: string | null | undefined): JobSeekerProfile {
  if (!value) return defaultJobSeekerProfile;
  try {
    return parseJobSeekerProfile(JSON.parse(value));
  } catch {
    return defaultJobSeekerProfile;
  }
}

function normalizeUser(row: UserRow) {
  return {
    id: row.id,
    name: row.name ?? "",
    email: row.email ?? "",
    role: row.role ?? "free",
    ai_credits: Number(row.ai_credits ?? 0),
    phone: row.phone ?? "",
    city: row.city ?? "",
    district: row.district ?? "",
    bio: row.bio ?? "",
    jobSeeker: readStoredJobSeekerProfile(row.job_seeker_profile),
  };
}

async function ensureUserRecord(user: any) {
  await executeD1(
    `INSERT OR IGNORE INTO users (id, name, email, role, ai_credits, created_at)
     VALUES (?, ?, ?, 'free', 0, unixepoch())`,
    [
      String(user.id),
      text(user.name || user.email || "Người dùng Tóc Việt", 100),
      text(user.email, 160),
    ]
  );
}

async function getCurrentUserRow(userId: string) {
  const rows = await queryD1<UserRow>(
    `SELECT id, name, email, role, ai_credits, phone, city, district, bio, job_seeker_profile
     FROM users
     WHERE id = ?`,
    [userId]
  );
  return rows[0] ?? null;
}

export async function GET() {
  const session = await auth();
  const sessionUser = session?.user as any;
  if (!sessionUser?.id) {
    return NextResponse.json({ error: "Bạn cần đăng nhập để xem tài khoản." }, { status: 401 });
  }

  if (!hasD1Env()) {
    return NextResponse.json({ error: "D1 env is not configured, chưa thể lưu hồ sơ tài khoản thật." }, { status: 503 });
  }

  try {
    await ensureProfileStorage();
    await ensureUserRecord(sessionUser);
    const row = await getCurrentUserRow(String(sessionUser.id));
    if (!row) {
      return NextResponse.json(
        { error: "Chưa tìm thấy hồ sơ tài khoản trong database.", user: null },
        { status: 404 }
      );
    }
    return NextResponse.json({ user: normalizeUser(row) });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Không thể tải hồ sơ tài khoản." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  const sessionUser = session?.user as any;
  if (!sessionUser?.id) {
    return NextResponse.json({ error: "Bạn cần đăng nhập để cập nhật tài khoản." }, { status: 401 });
  }

  if (!hasD1Env()) {
    return NextResponse.json({ error: "D1 env is not configured, chưa thể lưu hồ sơ tài khoản thật." }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const name = text(body.name, 100);
  if (!name) {
    return NextResponse.json({ error: "Tên hiển thị không được để trống." }, { status: 400 });
  }

  const phone = text(body.phone, 40);
  const city = text(body.city, 120);
  const district = text(body.district, 120);
  const bio = text(body.bio, 800);
  const jobSeeker = parseJobSeekerProfile(body.jobSeeker);

  try {
    await ensureProfileStorage();
    await ensureUserRecord(sessionUser);
    await executeD1(
      `UPDATE users
       SET name = ?, phone = ?, city = ?, district = ?, bio = ?, job_seeker_profile = ?
       WHERE id = ?`,
      [
        name,
        phone,
        city,
        district,
        bio,
        JSON.stringify(jobSeeker),
        String(sessionUser.id),
      ]
    );

    const row = await getCurrentUserRow(String(sessionUser.id));
    if (!row) {
      return NextResponse.json({ error: "Đã lưu nhưng chưa đọc lại được hồ sơ." }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: normalizeUser(row) });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Không thể cập nhật tài khoản." }, { status: 500 });
  }
}
