ALTER TABLE "user_profile" RENAME COLUMN "created_at" TO "timestamp";--> statement-breakpoint
ALTER TABLE "user_profile" DROP COLUMN "updated_at";