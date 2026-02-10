import { useOnboarding } from "@/contexts/onboarding-context";
import { onboardingFormSchema } from "@/types/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Form } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

// Enhanced schema with proper validation rules
const onboardingNameFormSchema = onboardingFormSchema
  .pick({
    first_name: true,
    middle_name: true,
    last_name: true,
    dob: true,
    id_number: true,
    home_address: true,
    city: true,
    county: true,
    email: true,
    phone_number: true,
  })
  .extend({
    // Add specific validation rules
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    id_number: z.string().min(1, "ID number is required"),
    home_address: z.string().min(1, "Home address is required"),
    city: z.string().min(1, "City is required"),
    county: z.string().min(1, "County is required"),
    email: z.string().email("Please enter a valid email address"),
    phone_number: z.string().min(1, "Phone number is required"),
  });

type OnboardingNameFormData = z.infer<typeof onboardingNameFormSchema>;

export interface IOnboardingNameFormProps {}

export default function OnboardingNameForm(props: IOnboardingNameFormProps) {
  const { formData, currentStep, resetForm, setCurrentStep, updateFormData } =
    useOnboarding();

  const form = useForm<OnboardingNameFormData>({
    resolver: zodResolver(onboardingNameFormSchema),
    mode: "onChange", // Validates on every change
    reValidateMode: "onChange", // Re-validates on every change
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: undefined,
      id_number: "",
      home_address: "",
      city: "",
      county: "",
      email: "",
      phone_number: "",
    },
  });

  // Watch form state to enable/disable submit button
  const isFormValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: OnboardingNameFormData) {
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

  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <Form {...form}>
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col"
      >
        <div className="grid grid-cols-12 gap-4 flex-1">
          {/* First Name - Required */}
          <Controller
            control={form.control}
            name="first_name"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  The policyholder name{" "}
                  <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="first_name"
                    placeholder="First name"
                    type="text"
                    id="first_name"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Middle Name - Optional */}
          <Controller
            control={form.control}
            name="middle_name"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">Middle name</FieldLabel>
                <div className="w-full">
                  <Input
                    key="middle_name"
                    placeholder="Middle name"
                    type="text"
                    id="middle_name"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Last Name - Required */}
          <Controller
            control={form.control}
            name="last_name"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Last name <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="last_name"
                    placeholder="Last name"
                    type="text"
                    id="last_name"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Date of Birth */}
          <Controller
            control={form.control}
            name="dob"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Date of Birth
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
                        id="dob"
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
                        timeZone={timeZone}
                        captionLayout="dropdown"
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

          {/* ID Number - Required */}
          <Controller
            control={form.control}
            name="id_number"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  ID Number / Passport No{" "}
                  <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="id_number"
                    placeholder="Enter ID or passport number"
                    type="text"
                    id="id_number"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Home Address - Required */}
          <Controller
            control={form.control}
            name="home_address"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Home Address <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="home_address"
                    placeholder="Enter your home address"
                    type="text"
                    id="home_address"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* City - Required */}
          <Controller
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  City / Town <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="city"
                    placeholder="Enter your city"
                    type="text"
                    id="city"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* County - Required */}
          <Controller
            control={form.control}
            name="county"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  County <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="county"
                    placeholder="Enter your county"
                    type="text"
                    id="county"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Email - Required with validation */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Email <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="email"
                    placeholder="user@domain.com"
                    type="email"
                    id="email"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />

          {/* Phone Number - Required */}
          <Controller
            control={form.control}
            name="phone_number"
            render={({ field, fieldState }) => (
              <Field
                className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="flex shrink-0">
                  Phone number <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <div className="w-full">
                  <Input
                    key="phone_number"
                    placeholder="+254700000000"
                    type="tel"
                    id="phone_number"
                    className={fieldState.invalid ? "border-red-500" : ""}
                    {...field}
                  />
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
                {isSubmitting ? "Submitting..." : "Next"}
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
// import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
// import { Form } from "@workspace/ui/components/form";
// import { Input } from "@workspace/ui/components/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@workspace/ui/components/popover";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Controller, useForm } from "react-hook-form";
// import z from "zod";

// const onboardingNameFormSchema = onboardingFormSchema.pick({
//   first_name: true,
//   middle_name: true,
//   last_name: true,
//   dob: true,
//   id_number: true,
//   home_address: true,
//   city: true,
//   county: true,
//   email: true,
//   phone_number: true,
// });

// type OnboardingNameFormData = z.infer<typeof onboardingNameFormSchema>;

// export interface IOnboardingNameFormProps {}

// export default function OnboardingNameForm(props: IOnboardingNameFormProps) {
//   const { formData, currentStep, resetForm, setCurrentStep, updateFormData } =
//     useOnboarding();

//   const form = useForm<OnboardingNameFormData>({
//     resolver: zodResolver(onboardingNameFormSchema),
//     mode: "onChange",
//     reValidateMode: "onBlur",
//     defaultValues: {
//       first_name: "",
//       middle_name: "",
//       last_name: "",
//       dob: undefined,
//       id_number: "",
//       home_address: "",
//       city: "",
//       county: "",
//       email: "",
//       phone_number: "",
//     },
//   });

//   async function onSubmit(data: OnboardingNameFormData) {
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
//         id="form-rhf-demo"
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex-1 flex flex-col"
//       >
//         <div className="grid grid-cols-12 gap-4 flex-1">
//           <Controller
//             control={form.control}
//             name=first_name
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">
//                   The policyholder name
//                 </FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key=first_name
//                     placeholder="First name"
//                     type="text"
//                     id=first_name
//                     className=" "
//                     {...field}
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
//             name=middle_name
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0"></FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key=middle_name
//                     placeholder="Middle name"
//                     type="text"
//                     id=middle_name
//                     className=" "
//                     {...field}
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
//             name=last_name
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0"></FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key=last_name
//                     placeholder="Last name"
//                     type="text"
//                     id=last_name
//                     className=" "
//                     {...field}
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
//             name="dob"
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">DOB</FieldLabel>
//                 <div className="w-full">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant={"outline"}
//                         className="justify-start text-left font-normal w-full"
//                         id="dob"
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
//             name=id_number
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">
//                   ID Number / Passport No
//                 </FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key=id_number
//                     placeholder=""
//                     type="text"
//                     id=id_number
//                     className=" "
//                     {...field}
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
//             name=home_address
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">Home Address</FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key=home_address
//                     placeholder=""
//                     type="text"
//                     id=home_address
//                     className=" "
//                     {...field}
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </div>
//               </Field>
//             )}
//           />

//           {/* City and County on one row */}
//           <Controller
//             control={form.control}
//             name="city"
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">City / Town</FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key="city"
//                     placeholder=""
//                     type="text"
//                     id="city"
//                     className=" "
//                     {...field}
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
//             name="county"
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">County</FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key="county"
//                     placeholder=""
//                     type="text"
//                     id="county"
//                     className=" "
//                     {...field}
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </div>
//               </Field>
//             )}
//           />

//           {/* Email and Phone number on one row */}
//           <Controller
//             control={form.control}
//             name="email"
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">Email</FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key="email"
//                     placeholder="user@domain.com"
//                     type="email"
//                     id="email"
//                     className=" "
//                     {...field}
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
//             name=phone_number
//             render={({ field, fieldState }) => (
//               <Field
//                 className="col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                 data-invalid={fieldState.invalid}
//               >
//                 <FieldLabel className="flex shrink-0">Phone number</FieldLabel>
//                 <div className="w-full">
//                   <Input
//                     key=phone_number
//                     placeholder="+254700000000"
//                     type="text"
//                     id=phone_number
//                     className=" "
//                     {...field}
//                   />
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
