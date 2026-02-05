CREATE TABLE "insurance_products" (
	"id" text PRIMARY KEY NOT NULL,
	"category_id" text NOT NULL,
	"product_code" varchar(50) NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"base_premium_amount" numeric(15, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"coverage_min_amount" numeric(15, 2),
	"coverage_max_amount" numeric(15, 2),
	"policy_term_days" integer NOT NULL,
	"min_age" integer,
	"max_age" integer,
	"is_active" boolean DEFAULT true,
	"underwriting_rules" jsonb,
	"timestamp" integer DEFAULT extract(epoch from now()) NOT NULL,
	CONSTRAINT "insurance_products_product_code_unique" UNIQUE("product_code")
);
--> statement-breakpoint
ALTER TABLE "insurance_products" ADD CONSTRAINT "insurance_products_category_id_insurance_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."insurance_categories"("id") ON DELETE no action ON UPDATE no action;