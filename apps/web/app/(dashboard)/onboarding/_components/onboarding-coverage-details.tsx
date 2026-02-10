import { useOnboarding } from "@/contexts/onboarding-context";
import { onboardingFormSchema } from "@/types/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import { Checkbox } from "@workspace/ui/components/checkbox";
import RadioCardsGroup from "@workspace/ui/components/customized/radio-group/radio-group-08";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Form } from "@workspace/ui/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

// Enhanced schema with proper validation rules
const onboardingCoverageFormSchema = onboardingFormSchema
  .pick({
    coverage_type: true,
    policy_plan: true,
    policy_start_date: true,
    addons: true,
  })
  .extend({
    // Add specific validation rules
    coverage_type: z.string().min(1, "Coverage type is required"),
    policy_plan: z.string().min(1, "Policy plan is required"),
    policy_start_date: z.date({
      required_error: "Policy start date is required",
      invalid_type_error: "Please select a valid date",
    }),
    addons: z.array(z.string()).optional(),
  });

type OnboardingCoverageFormData = z.infer<typeof onboardingCoverageFormSchema>;

export interface IOnboardingCoverageFormDetailsProps {}

export default function OnboardingCoverageFormDetails(
  props: IOnboardingCoverageFormDetailsProps
) {
  const { currentStep, formData, resetForm, setCurrentStep, updateFormData } =
    useOnboarding();

  const form = useForm<OnboardingCoverageFormData>({
    resolver: zodResolver(onboardingCoverageFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      coverage_type: "",
      policy_plan: "",
      policy_start_date: undefined,
      addons: [],
    },
  });

  // Watch form state to enable/disable submit button
  const isFormValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const formErrors = form.formState.errors;

  async function onSubmit(data: OnboardingCoverageFormData) {
    console.log("Form submitted:", data);

    // Validate the form before proceeding
    const isValid = await form.trigger();

    if (isValid) {
      updateFormData(data);
      setCurrentStep(currentStep + 1);
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 @container flex-1 flex flex-col"
      >
        <div className="grid grid-cols-12 gap-4 flex-1">
          {/* Policy Start Date - Required */}
          <Controller
            control={form.control}
            name="policy_start_date"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Preferred Coverage Start Date{" "}
                  <span className="text-red-500 ml-1">*</span>
                </FieldLabel>

                <div className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`justify-start text-left font-normal w-full ${
                          fieldState.invalid ? "border-red-500" : ""
                        }`}
                        id="policy_start_date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-muted-foreground">
                            Pick a date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()} // Disable past dates
                        fromDate={new Date()} // Only allow dates from today
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Coverage Type - Required */}
          <Controller
            control={form.control}
            name="coverage_type"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Coverage Type <span className="text-red-500 ml-1">*</span>
                </FieldLabel>

                <div className="w-full">
                  <Select
                    key="coverage_type"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className={`w-full ${fieldState.invalid ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select policy coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="individual" value="individual">
                        Individual
                      </SelectItem>
                      <SelectItem key="family" value="family">
                        Family
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Policy Plan - Required */}
          <Controller
            control={form.control}
            name="policy_plan"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Policy Plan <span className="text-red-500 ml-1">*</span>
                </FieldLabel>

                <div className="w-full">
                  <RadioCardsGroup
                    key="policy_plan"
                    options={[
                      {
                        value: "Bronze",
                        label: "Bronze Tier",
                        description: "Basic coverage with essential benefits",
                        iconColor: "text-orange-300",
                      },
                      {
                        value: "Silver",
                        label: "Silver Tier",
                        description:
                          "Enhanced coverage with additional benefits",
                        iconColor: "text-slate-600",
                      },
                      {
                        value: "Gold",
                        label: "Gold Tier",
                        description:
                          "Comprehensive coverage with premium benefits",
                        iconColor: "text-amber-500",
                      },
                      {
                        value: "Platinum",
                        label: "Platinum Tier",
                        description: "Full coverage with maximum benefits",
                        iconColor: "text-zinc-800",
                      },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />

                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Addons - Optional */}
          <Controller
            control={form.control}
            name="addons"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">Addons</FieldLabel>

                <div className="w-full">
                  <div className="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-4 gap-4">
                    {/* Dental Addon */}
                    <Controller
                      name="addons"
                      control={form.control}
                      render={({ field: OptionField }) => {
                        return (
                          <div
                            key="dental"
                            className={`flex items-start space-x-3 p-3 border rounded-lg ${
                              OptionField.value?.includes("dental")
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <Checkbox
                              id="addons-dental"
                              checked={OptionField.value?.includes("dental")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? OptionField.onChange([
                                      ...(OptionField.value || []),
                                      "dental",
                                    ])
                                  : OptionField.onChange(
                                      OptionField.value?.filter(
                                        (value: string) => value !== "dental"
                                      )
                                    );
                              }}
                            />
                            <div className="grid gap-1 leading-none">
                              <FieldLabel
                                className="font-medium cursor-pointer"
                                htmlFor="addons-dental"
                              >
                                Dental
                              </FieldLabel>
                              <p className="text-sm text-muted-foreground">
                                Dental care and checkups
                              </p>
                            </div>
                          </div>
                        );
                      }}
                    />

                    {/* Vision Addon */}
                    <Controller
                      name="addons"
                      control={form.control}
                      render={({ field: OptionField }) => {
                        return (
                          <div
                            key="vision"
                            className={`flex items-start space-x-3 p-3 border rounded-lg ${
                              OptionField.value?.includes("vision")
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <Checkbox
                              id="addons-vision"
                              checked={OptionField.value?.includes("vision")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? OptionField.onChange([
                                      ...(OptionField.value || []),
                                      "vision",
                                    ])
                                  : OptionField.onChange(
                                      OptionField.value?.filter(
                                        (value: string) => value !== "vision"
                                      )
                                    );
                              }}
                            />
                            <div className="grid gap-1 leading-none">
                              <FieldLabel
                                className="font-medium cursor-pointer"
                                htmlFor="addons-vision"
                              >
                                Vision
                              </FieldLabel>
                              <p className="text-sm text-muted-foreground">
                                Eye exams and vision care
                              </p>
                            </div>
                          </div>
                        );
                      }}
                    />

                    {/* Maternity Addon */}
                    <Controller
                      name="addons"
                      control={form.control}
                      render={({ field: OptionField }) => {
                        return (
                          <div
                            key="maternity"
                            className={`flex items-start space-x-3 p-3 border rounded-lg ${
                              OptionField.value?.includes("maternity")
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <Checkbox
                              id="addons-maternity"
                              checked={OptionField.value?.includes("maternity")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? OptionField.onChange([
                                      ...(OptionField.value || []),
                                      "maternity",
                                    ])
                                  : OptionField.onChange(
                                      OptionField.value?.filter(
                                        (value: string) => value !== "maternity"
                                      )
                                    );
                              }}
                            />
                            <div className="grid gap-1 leading-none">
                              <FieldLabel
                                className="font-medium cursor-pointer"
                                htmlFor="addons-maternity"
                              >
                                Maternity
                              </FieldLabel>
                              <p className="text-sm text-muted-foreground">
                                Pregnancy and childbirth care
                              </p>
                            </div>
                          </div>
                        );
                      }}
                    />

                    {/* Critical Illness Addon */}
                    <Controller
                      name="addons"
                      control={form.control}
                      render={({ field: OptionField }) => {
                        return (
                          <div
                            key="critical-illness"
                            className={`flex items-start space-x-3 p-3 border rounded-lg ${
                              OptionField.value?.includes("critical-illness")
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <Checkbox
                              id="addons-critical-illness"
                              checked={OptionField.value?.includes(
                                "critical-illness"
                              )}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? OptionField.onChange([
                                      ...(OptionField.value || []),
                                      "critical-illness",
                                    ])
                                  : OptionField.onChange(
                                      OptionField.value?.filter(
                                        (value: string) =>
                                          value !== "critical-illness"
                                      )
                                    );
                              }}
                            />
                            <div className="grid gap-1 leading-none">
                              <FieldLabel
                                className="font-medium cursor-pointer"
                                htmlFor="addons-critical-illness"
                              >
                                Critical Illness
                              </FieldLabel>
                              <p className="text-sm text-muted-foreground">
                                Coverage for serious illnesses
                              </p>
                            </div>
                          </div>
                        );
                      }}
                    />
                  </div>

                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Form Actions */}
          <div className="w-full col-span-12 mt-auto pt-6">
            <Field orientation="horizontal" className="flex justify-between">
              <Button
                type="button"
                className="font-medium"
                size="sm"
                variant={"outline"}
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                type="submit"
                size="sm"
                className="font-medium"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : currentStep === 2
                    ? "Submit"
                    : "Next"}
              </Button>
            </Field>
          </div>
        </div>
      </form>
    </Form>
  );
}

// import { useOnboarding } from "@/contexts/onboarding-context";
// import { onboardingFormSchema } from "@/types/onboarding";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@workspace/ui/components/button";
// import { Calendar } from "@workspace/ui/components/calendar";
// import { Checkbox } from "@workspace/ui/components/checkbox";
// import RadioCardsGroup from "@workspace/ui/components/customized/radio-group/radio-group-08";
// import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
// import { Form } from "@workspace/ui/components/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@workspace/ui/components/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@workspace/ui/components/select";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Controller, useForm } from "react-hook-form";
// import z from "zod";

// const onboardingNameFormSchema = onboardingFormSchema.pick({
//   coverage_type: true,
//   policy_plan: true,
//   policy_start_date: true,
//   addons: true,
// });

// type OnboardingCoverageFormData = z.infer<typeof onboardingNameFormSchema>;

// export interface IOnboardingCoverageFormDetailsProps {}

// export default function OnboardingCoverageFormDetails(
//   props: IOnboardingCoverageFormDetailsProps
// ) {
//   const { currentStep, formData, resetForm, setCurrentStep, updateFormData } =
//     useOnboarding();

//   const form = useForm<OnboardingCoverageFormData>({
//     resolver: zodResolver(onboardingNameFormSchema),
//     mode: "onChange",
//     reValidateMode: "onBlur",
//     defaultValues: {
//       coverage_type: formData[coverage_type] || "",
//       policy_plan: formData[policy_plan] || "",
//       policy_start_date: formData[policy_start_date] || undefined,
//       addons: formData.addons || [],
//     },
//   });

//   async function onSubmit(data: OnboardingCoverageFormData) {
//     console.log("Form submitted:", data);
//     updateFormData(data);
//     setCurrentStep(currentStep + 1);
//   }

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 @container flex-1 flex flex-col"
//       >
//         <div className="grid grid-cols-12 gap-4 flex-1">
//           <Controller
//             control={form.control}
//             name=policy_start_date
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">
//                   Preferred Coverage Start Date
//                 </FieldLabel>

//                 <div className="w-full">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant={"outline"}
//                         className="justify-start text-left font-normal w-full"
//                         id=policy_start_date
//                         name=""
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {field.value ? (
//                           format(field.value, "PPP")
//                         ) : (
//                           <span className="text-muted-foreground">
//                             Pick a date
//                           </span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         initialFocus
//                         onSelect={field.onChange}
//                       />
//                     </PopoverContent>
//                   </Popover>

//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </div>
//               </Field>
//             )}
//           />
//           <Controller
//             control={form.control}
//             name=coverage_type
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">Coverage Type</FieldLabel>

//                 <div className="w-full">
//                   <Select
//                     key=coverage_type
//                     {...field}
//                     onValueChange={field.onChange}
//                   >
//                     <SelectTrigger className="w-full ">
//                       <SelectValue placeholder="Select policy coverage type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem key="individual" value="individual">
//                         Individual
//                       </SelectItem>

//                       <SelectItem key="family" value="family">
//                         Family
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>

//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </div>
//               </Field>
//             )}
//           />
//           <Controller
//             control={form.control}
//             name=policy_plan
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">Policy plan</FieldLabel>

//                 <div className="w-full">
//                   <RadioCardsGroup
//                     key=policy_plan
//                     options={[
//                       {
//                         value: "Bronze",
//                         label: "Bronze Tier",
//                         // description: "32 GB RAM",
//                         iconColor: "text-orange-300",
//                       },
//                       {
//                         value: "Silver",
//                         label: "Silver Tier",
//                         // description: "32 GB RAM",
//                         iconColor: "text-slate-600",
//                       },
//                       {
//                         value: "Gold",
//                         label: "Gold Tier",
//                         // description: "32 GB RAM",
//                         iconColor: "text-amber-500",
//                       },
//                       {
//                         value: "Platinum",
//                         label: "Platinum Tier",
//                         // description: "32 GB RAM",
//                         iconColor: "text-zinc-800",
//                       },
//                     ]}
//                     {...field}
//                     onChange={field.onChange}
//                   />

//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </div>
//               </Field>
//             )}
//           />
//           <Controller
//             control={form.control}
//             name="addons"
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">Addons</FieldLabel>

//                 <div className="w-full">
//                   <div className="grid grid-cols-4 gap-2">
//                     <Controller
//                       name="addons"
//                       control={form.control}
//                       render={({ field: OptionField }) => {
//                         return (
//                           <div
//                             key="option1"
//                             className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                           >
//                             <Checkbox
//                               id="addons-option1"
//                               checked={OptionField.value?.includes("option1")}
//                               onCheckedChange={(checked) => {
//                                 return checked
//                                   ? OptionField.onChange([
//                                       ...(OptionField.value || []),
//                                       "option1",
//                                     ])
//                                   : OptionField.onChange(
//                                       OptionField.value?.filter(
//                                         (value: string) => value !== "option1"
//                                       )
//                                     );
//                               }}
//                             />
//                             <div className="grid gap-2 leading-none">
//                               <FieldLabel
//                                 className="font-medium"
//                                 htmlFor="addons-option1"
//                               >
//                                 Dental
//                               </FieldLabel>
//                             </div>
//                           </div>
//                         );
//                       }}
//                     />

//                     <Controller
//                       name="addons"
//                       control={form.control}
//                       render={({ field: OptionField }) => {
//                         return (
//                           <div
//                             key="option2"
//                             className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                           >
//                             <Checkbox
//                               id="addons-option2"
//                               checked={OptionField.value?.includes("option2")}
//                               onCheckedChange={(checked) => {
//                                 return checked
//                                   ? OptionField.onChange([
//                                       ...(OptionField.value || []),
//                                       "option2",
//                                     ])
//                                   : OptionField.onChange(
//                                       OptionField.value?.filter(
//                                         (value: string) => value !== "option2"
//                                       )
//                                     );
//                               }}
//                             />
//                             <div className="grid gap-2 leading-none">
//                               <FieldLabel
//                                 className="font-medium"
//                                 htmlFor="addons-option2"
//                               >
//                                 Vision
//                               </FieldLabel>
//                             </div>
//                           </div>
//                         );
//                       }}
//                     />

//                     <Controller
//                       name="addons"
//                       control={form.control}
//                       render={({ field: OptionField }) => {
//                         return (
//                           <div
//                             key="option-3"
//                             className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                           >
//                             <Checkbox
//                               id="addons-option-3"
//                               checked={OptionField.value?.includes("option-3")}
//                               onCheckedChange={(checked) => {
//                                 return checked
//                                   ? OptionField.onChange([
//                                       ...(OptionField.value || []),
//                                       "option-3",
//                                     ])
//                                   : OptionField.onChange(
//                                       OptionField.value?.filter(
//                                         (value: string) => value !== "option-3"
//                                       )
//                                     );
//                               }}
//                             />
//                             <div className="grid gap-2 leading-none">
//                               <FieldLabel
//                                 className="font-medium"
//                                 htmlFor="addons-option-3"
//                               >
//                                 Maternity
//                               </FieldLabel>
//                             </div>
//                           </div>
//                         );
//                       }}
//                     />

//                     <Controller
//                       name="addons"
//                       control={form.control}
//                       render={({ field: OptionField }) => {
//                         return (
//                           <div
//                             key="option-4"
//                             className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                           >
//                             <Checkbox
//                               id="addons-option-4"
//                               checked={OptionField.value?.includes("option-4")}
//                               onCheckedChange={(checked) => {
//                                 return checked
//                                   ? OptionField.onChange([
//                                       ...(OptionField.value || []),
//                                       "option-4",
//                                     ])
//                                   : OptionField.onChange(
//                                       OptionField.value?.filter(
//                                         (value: string) => value !== "option-4"
//                                       )
//                                     );
//                               }}
//                             />
//                             <div className="grid gap-2 leading-none">
//                               <FieldLabel
//                                 className="font-medium"
//                                 htmlFor="addons-option-4"
//                               >
//                                 Critical Illness
//                               </FieldLabel>
//                             </div>
//                           </div>
//                         );
//                       }}
//                     />
//                   </div>

//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </div>
//               </Field>
//             )}
//           />
//           <div className="w-full col-span-12 mt-auto pt-6">
//             <Field orientation="horizontal" className="flex justify-between">
//               <Button
//                 type="button"
//                 className="font-medium"
//                 size="sm"
//                 variant={"outline"}
//                 onClick={handleBack}
//                 disabled={currentStep === (0 as number)}
//               >
//                 Back
//               </Button>
//               <Button type="submit" size="sm" className="font-medium">
//                 {currentStep === (2 as number) ? "Submit" : "Next"}
//               </Button>
//             </Field>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }
