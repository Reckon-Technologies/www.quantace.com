CREATE TABLE "user_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"first_name" text NOT NULL,
	"middle_name" text,
	"last_name" text NOT NULL,
	"dob" text,
	"id_number" text NOT NULL,
	"home_address" text NOT NULL,
	"city" text NOT NULL,
	"county" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"coverage_type" text NOT NULL,
	"policy_plan" text NOT NULL,
	"policy_start_date" text,
	"addons" text,
	"height" text,
	"weight" text,
	"smoker" text DEFAULT 'false' NOT NULL,
	"medical_conditions" text,
	"doctors_name" text,
	"doctors_phone_number" text,
	"status" text DEFAULT 'submitted' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;