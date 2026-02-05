import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { boolean, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import { toZodV4SchemaTyped } from "../lib/zod-utils";

// Insurance Categories
export const insuranceCategories = pgTable('insurance_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: integer('created_at').notNull().default(sql`extract(epoch from now())`),
  updatedAt: integer('updated_at').notNull().default(sql`extract(epoch from now())`).$onUpdate(() => sql`extract(epoch from now())`),
});

// Export schemas with type assertions
export const insertInsuranceCategorySchema = toZodV4SchemaTyped(createInsertSchema(insuranceCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true
}));
export const selectInsuranceCategorySchema = toZodV4SchemaTyped(createSelectSchema(insuranceCategories));

// @ts-expect-error partial exists on zod v4 type
export const patchInsuranceCategorySchema = insertInsuranceCategorySchema.partial();
