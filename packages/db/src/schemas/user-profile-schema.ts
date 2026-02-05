import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { toZodV4SchemaTyped } from "../lib/zod-utils";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import z from "zod";

export const userProfile = pgTable("user_profile", {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }), // Reference to your Better-auth users
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  dob: text("dob").notNull(),
  idNumber: text("id_number").notNull(),
  homeAddress: text("home_address").notNull(),
  city: text("city").notNull(),
  county: text("county").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  coverageType: text("coverage_type").notNull(),
  policyPlan: text("policy_plan").notNull(),
  policyStartDate: text("policy_start_date"),
  addons: text("addons").array(), // Consider using an array type if supported
  height: integer("height"), // in cm
  weight: integer("weight"), // in kg
  smoker: boolean("smoker").default(false).notNull(),
  medicalConditions: text("medical_conditions"),
  doctorsName: text("doctors_name"),
  doctorsPhoneNumber: text("doctors_phone_number"),
  status: text("status").default("submitted").notNull(),
  createdAt: integer('created_at').notNull().default(sql`extract(epoch from now())`),
  updatedAt: integer('updated_at').notNull().default(sql`extract(epoch from now())`).$onUpdate(() => sql`extract(epoch from now())`)
});

// Export schemas with type assertions
export const insertUserProfileSchema = toZodV4SchemaTyped(createInsertSchema(userProfile).omit({
  id: true,
  createdAt: true,
  updatedAt: true
}));
export const selectUserProfileSchema = toZodV4SchemaTyped(createSelectSchema(userProfile));

// @ts-expect-error partial exists on zod v4 type
export const patchUserProfileSchema = insertUserProfileSchema.partial();

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

// export const userProfiles = pgTable('user_profiles', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
//   firstName: varchar('first_name', { length: 100 }).notNull(),
//   lastName: varchar('last_name', { length: 100 }).notNull(),
//   dateOfBirth: date('date_of_birth').notNull(),
//   gender: varchar('gender', { length: 10 }).$type<'male' | 'female' | 'other'>(),
//   nationalId: varchar('national_id', { length: 50 }),
//   addressLine1: text('address_line_1'),
//   addressLine2: text('address_line_2'),
//   city: varchar('city', { length: 100 }),
//   state: varchar('state', { length: 100 }),
//   postalCode: varchar('postal_code', { length: 20 }),
//   country: varchar('country', { length: 2 }).default('US'),
//   marketingOptIn: boolean('marketing_opt_in').default(false),
//   createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
//   updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
// }, (table) => ({
//   unqUser: uniqueIndex('unq_user_profiles_user_id').on(table.userId),
// }));