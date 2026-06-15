CREATE TABLE `job_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`employer_user_id` text NOT NULL,
	`employer_display_name` text NOT NULL,
	`employer_type` text DEFAULT 'individual' NOT NULL,
	`title` text NOT NULL,
	`position` text NOT NULL,
	`description` text NOT NULL,
	`city` text NOT NULL,
	`district` text,
	`address` text,
	`salary_min` real,
	`salary_max` real,
	`salary_text` text,
	`work_type` text DEFAULT 'full_time' NOT NULL,
	`experience_level` text,
	`benefits` text,
	`contact_name` text NOT NULL,
	`contact_phone` text,
	`contact_email` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`plan_code` text DEFAULT 'free' NOT NULL,
	`boost_until` integer,
	`published_at` integer,
	`expires_at` integer,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`employer_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `job_posts_employer_user_id_idx` ON `job_posts` (`employer_user_id`);
--> statement-breakpoint
CREATE INDEX `job_posts_status_created_at_idx` ON `job_posts` (`status`,`created_at`);
--> statement-breakpoint
CREATE INDEX `job_posts_boost_until_idx` ON `job_posts` (`boost_until`);
--> statement-breakpoint
CREATE TABLE `recruitment_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`order_type` text NOT NULL,
	`package_code` text NOT NULL,
	`quantity_total` integer NOT NULL,
	`quantity_used` integer DEFAULT 0 NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'VND' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`payment_ref` text,
	`paid_at` integer,
	`expires_at` integer,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `recruitment_orders_user_status_idx` ON `recruitment_orders` (`user_id`,`status`);
--> statement-breakpoint
CREATE INDEX `recruitment_orders_package_idx` ON `recruitment_orders` (`package_code`);
