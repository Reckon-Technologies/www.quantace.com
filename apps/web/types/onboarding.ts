import * as z from "zod";

export const onboardingFormSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dob: z.date(),
  idNumber: z.string(),
  homeAddress: z.string(),
  city: z.string(),
  county: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  coverageType: z.string(),
  policyPlan: z.string(),
  policyStartDate: z.date().optional(),
  addons: z.array(z.string()).optional(),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  smoker: z.coerce.boolean().default(false).optional(),
  medicalConditions: z.string(),
  doctorsName: z.string(),
  doctorsPhoneNumber: z.string(),
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
