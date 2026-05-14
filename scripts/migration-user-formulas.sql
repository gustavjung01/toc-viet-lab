-- Migration: tạo bảng user_formulas
-- Chạy trong Cloudflare D1 Console

CREATE TABLE IF NOT EXISTS `user_formulas` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `title` text NOT NULL,
  `tag` text DEFAULT '',
  `base` text DEFAULT '',
  `developer` text DEFAULT '',
  `ratio` text DEFAULT '',
  `note` text DEFAULT '',
  `created_at` integer DEFAULT (unixepoch()),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade
);
