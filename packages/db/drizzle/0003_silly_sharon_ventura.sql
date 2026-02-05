ALTER TABLE "user_profile" RENAME COLUMN "policy_start_date" TO "policyStartDate";--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "dob" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "addons" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "height" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "weight" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_profile" ALTER COLUMN "smoker" SET DATA TYPE boolean;