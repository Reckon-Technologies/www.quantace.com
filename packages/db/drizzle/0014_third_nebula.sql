ALTER TABLE "user_profile" RENAME COLUMN "timestamp" TO "created_at";--> statement-breakpoint
ALTER TABLE "insurance_categories" RENAME COLUMN "timestamp" TO "created_at";--> statement-breakpoint
ALTER TABLE "insurance_products" RENAME COLUMN "timestamp" TO "created_at";--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "updated_at" integer DEFAULT extract(epoch from now()) NOT NULL;--> statement-breakpoint
ALTER TABLE "insurance_categories" ADD COLUMN "updated_at" integer DEFAULT extract(epoch from now()) NOT NULL;--> statement-breakpoint
ALTER TABLE "insurance_products" ADD COLUMN "updated_at" integer DEFAULT extract(epoch from now()) NOT NULL;