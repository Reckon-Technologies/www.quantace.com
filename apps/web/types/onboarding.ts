import * as z from "zod";

export const onboardingFormSchema = z.object({
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  dob: z.date(),
  id_number: z.string(),
  home_address: z.string(),
  city: z.string(),
  county: z.string(),
  email: z.string(),
  phone_number: z.string(),
  coverage_type: z.string(),
  policy_plan: z.string(),
  policy_start_date: z.date(),
  addons: z.array(z.string()).optional(),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  smoker: z.coerce.boolean().default(false).optional(),
  medical_conditions: z.string(),
  doctors_name: z.string(),
  doctors_phone_number: z.string(),
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
