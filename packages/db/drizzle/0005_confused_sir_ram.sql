ALTER TABLE "user_profile" ALTER COLUMN "dob" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "dob" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "policy_start_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "policy_start_date" DROP NOT NULL;