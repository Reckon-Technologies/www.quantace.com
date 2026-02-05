import { boolean, decimal, integer, jsonb, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { insuranceCategories } from "./insurance-category-schema";
import { sql } from "drizzle-orm";
import { toZodV4SchemaTyped } from "../lib/zod-utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Insurance Products
export const insuranceProducts = pgTable('insurance_products', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').notNull().references(() => insuranceCategories.id),
  productCode: varchar('product_code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  basePremiumAmount: decimal('base_premium_amount', { precision: 15, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  coverageMinAmount: decimal('coverage_min_amount', { precision: 15, scale: 2 }),
  coverageMaxAmount: decimal('coverage_max_amount', { precision: 15, scale: 2 }),
  policyTermDays: integer('policy_term_days').notNull(),
  minAge: integer('min_age'),
  maxAge: integer('max_age'),
  isActive: boolean('is_active').default(true),
  underwritingRules: jsonb('underwriting_rules'),
  createdAt: integer('created_at').notNull().default(sql`extract(epoch from now())`),
  updatedAt: integer('updated_at').notNull().default(sql`extract(epoch from now())`).$onUpdate(() => sql`extract(epoch from now())`)
});


// Export schemas with type assertions
export const insertInsuranceProductSchema = toZodV4SchemaTyped(createInsertSchema(insuranceProducts).omit({
    id: true,
    createdAt: true,
    updatedAt: true
}))
export const selectInsuranceProductSchema = toZodV4SchemaTyped(createSelectSchema(insuranceProducts))

// @ts-expect-error partial exists on zod v4 type
export const patchInsuranceProductSchema = insertInsuranceProductSchema.partial()