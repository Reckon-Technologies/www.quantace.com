CREATE TABLE "insurance_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"timestamp" integer DEFAULT extract(epoch from now()) NOT NULL,
	CONSTRAINT "insurance_categories_name_unique" UNIQUE("name")
);
