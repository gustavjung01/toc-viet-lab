import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  image: text("image"),
  passwordHash: text("password_hash"),
  role: text("role", { enum: ["free", "member", "pro"] }).default("free").notNull(),
  aiCredits: integer("ai_credits").default(3).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  sessionState: text("session_state"),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

export const verificationTokens = sqliteTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: text("category"),
  difficulty: text("difficulty", { enum: ["basic", "intermediate", "advanced"] }),
  readTime: integer("read_time"),
  imageKey: text("image_key"),
  published: integer("published", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const cases = sqliteTable("cases", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  beforeImageKey: text("before_image_key"),
  afterImageKey: text("after_image_key"),
  analysis: text("analysis"),
  formula: text("formula"),
  published: integer("published", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const formulas = sqliteTable("formulas", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  tag: text("tag"),
  base: text("base"),
  developer: text("developer"),
  ratio: text("ratio"),
  note: text("note"),
  difficulty: text("difficulty", { enum: ["basic", "intermediate", "advanced"] }).default("intermediate"),
  readTime: integer("read_time"),
  imageKey: text("image_key"),
  published: integer("published", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const savedItems = sqliteTable("saved_items", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: text("item_type", { enum: ["article", "case", "formula"] }).notNull(),
  itemId: text("item_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const userFormulas = sqliteTable("user_formulas", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  tag: text("tag").default(""),
  base: text("base").default(""),
  developer: text("developer").default(""),
  ratio: text("ratio").default(""),
  note: text("note").default(""),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const aiUsageLogs = sqliteTable("ai_usage_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tool: text("tool").notNull(),
  creditsUsed: integer("credits_used").default(1).notNull(),
  prompt: text("prompt"),
  result: text("result"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const jobPosts = sqliteTable("job_posts", {
  id: text("id").primaryKey(),
  employerUserId: text("employer_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  employerDisplayName: text("employer_display_name").notNull(),
  employerType: text("employer_type", { enum: ["individual", "salon", "academy", "brand"] }).default("individual").notNull(),
  title: text("title").notNull(),
  position: text("position").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  district: text("district"),
  address: text("address"),
  salaryMin: real("salary_min"),
  salaryMax: real("salary_max"),
  salaryText: text("salary_text"),
  workType: text("work_type", { enum: ["full_time", "part_time", "remote", "freelance"] }).default("full_time").notNull(),
  experienceLevel: text("experience_level"),
  benefits: text("benefits"),
  contactName: text("contact_name").notNull(),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  status: text("status", { enum: ["draft", "published", "expired", "closed", "rejected"] }).default("draft").notNull(),
  planCode: text("plan_code", { enum: ["free", "starter", "growth"] }).default("free").notNull(),
  boostUntil: integer("boost_until", { mode: "timestamp" }),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const recruitmentOrders = sqliteTable("recruitment_orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  orderType: text("order_type", { enum: ["post_package", "boost_package"] }).notNull(),
  packageCode: text("package_code", { enum: ["starter", "growth", "boost"] }).notNull(),
  quantityTotal: integer("quantity_total").notNull(),
  quantityUsed: integer("quantity_used").default(0).notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").default("VND").notNull(),
  status: text("status", { enum: ["pending", "paid", "failed", "refunded"] }).default("pending").notNull(),
  paymentRef: text("payment_ref"),
  paidAt: integer("paid_at", { mode: "timestamp" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});
