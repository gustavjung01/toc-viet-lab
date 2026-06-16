CREATE SCHEMA IF NOT EXISTS tocviet;

CREATE TABLE IF NOT EXISTS tocviet.job_posts (
  id text PRIMARY KEY,
  employer_user_id text NOT NULL,
  employer_display_name text NOT NULL,
  employer_type text NOT NULL DEFAULT 'individual',
  title text NOT NULL,
  position text NOT NULL,
  description text NOT NULL,
  city text NOT NULL DEFAULT '',
  district text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  salary_min numeric(18,2),
  salary_max numeric(18,2),
  salary_text text NOT NULL DEFAULT 'Negotiable',
  work_type text NOT NULL DEFAULT 'full_time',
  experience_level text NOT NULL DEFAULT '',
  benefits text NOT NULL DEFAULT '',
  contact_name text NOT NULL,
  contact_phone text NOT NULL DEFAULT '',
  contact_email text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft',
  plan_code text NOT NULL DEFAULT 'free',
  boost_until bigint,
  published_at bigint,
  expires_at bigint,
  created_at bigint NOT NULL DEFAULT (extract(epoch from now())::bigint),
  tags text[] NOT NULL DEFAULT '{}',
  CONSTRAINT job_posts_employer_type_check
    CHECK (employer_type IN ('individual', 'salon', 'academy', 'brand')),
  CONSTRAINT job_posts_status_check
    CHECK (status IN ('draft', 'published', 'expired', 'closed', 'rejected')),
  CONSTRAINT job_posts_work_type_check
    CHECK (work_type IN ('full_time', 'part_time', 'remote', 'freelance')),
  CONSTRAINT job_posts_plan_code_check
    CHECK (plan_code IN ('free', 'starter', 'growth'))
);

CREATE INDEX IF NOT EXISTS job_posts_employer_user_id_idx
  ON tocviet.job_posts (employer_user_id);

CREATE INDEX IF NOT EXISTS job_posts_status_created_at_idx
  ON tocviet.job_posts (status, created_at);

CREATE INDEX IF NOT EXISTS job_posts_boost_until_idx
  ON tocviet.job_posts (boost_until);

CREATE INDEX IF NOT EXISTS job_posts_published_expires_idx
  ON tocviet.job_posts (status, expires_at, created_at);
