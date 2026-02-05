// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@workspace/ui/components/button";
// import { Calendar } from "@workspace/ui/components/calendar";
// import { Card, CardContent } from "@workspace/ui/components/card";
// import { Checkbox } from "@workspace/ui/components/checkbox";
// import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
// import { Input } from "@workspace/ui/components/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@workspace/ui/components/popover";
// import {
//   RadioGroup,
//   RadioGroupItem,
// } from "@workspace/ui/components/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@workspace/ui/components/select";
// import { Switch } from "@workspace/ui/components/switch";
// import { Textarea } from "@workspace/ui/components/textarea";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";

// // Combined form schema for all steps
// const formSchema = z.object({
//   // Step One fields
//   "select-0": z.string(),
//   "radio-0": z.string(),
//   "date-0": z.date().optional(),
//   "checkbox-group-0": z.array(z.string()).optional(),

//   // Step Three fields
//   "number-input-0": z.coerce.number().optional(),
//   "number-input-1": z.coerce.number().optional(),
//   "switch-0": z.boolean().default(false).optional(),
//   "textarea-0": z.string(),
//   "text-input-1": z.string(),
//   "text-input-0": z.string(),
// });

// type FormData = z.infer<typeof formSchema>;

// export const OnboardingForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       "select-0": "",
//       "radio-0": "",
//       "date-0": new Date("2025-10-28T13:21:37.152Z"),
//       "checkbox-group-0": ["option1"],
//       "number-input-0": 0,
//       "number-input-1": 0,
//       "switch-0": false,
//       "textarea-0": "",
//       "text-input-1": "",
//       "text-input-0": "",
//     },
//   });

//   function onSubmit(values: FormData) {
//     console.log("Form submitted:", values);
//     // Handle form submission here
//   }

//   function onReset() {
//     form.reset();
//     form.clearErrors();
//     setCurrentStep(1);
//   }

//   const nextStep = () => {
//     // Validate current step before proceeding
//     if (currentStep === 1) {
//       // Validate step one fields
//       const stepOneFields = ["select-0", "radio-0"] as const;
//       const stepOneValues = form.getValues();

//       const isValid = stepOneFields.every((field) => {
//         const value = stepOneValues[field];
//         return value && value.toString().trim() !== "";
//       });

//       if (!isValid) {
//         // You can add more specific validation feedback here
//         alert("Please fill in all required fields before proceeding.");
//         return;
//       }
//     }

//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Progress Indicator */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           {[1, 2, 3].map((step) => (
//             <div key={step} className="flex flex-col items-center">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
//                   currentStep >= step
//                     ? "bg-primary text-primary-foreground border-primary"
//                     : "bg-muted border-muted-foreground"
//                 }`}
//               >
//                 {step}
//               </div>
//               <span className="text-sm mt-2">
//                 {step === 1 && "Coverage Details"}
//                 {step === 2 && "Personal Info"}
//                 {step === 3 && "Health Information"}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div className="w-full bg-muted h-2 rounded-full">
//           <div
//             className="bg-primary h-2 rounded-full transition-all duration-300"
//             style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
//           />
//         </div>
//       </div>

//       <Card className="shadow-sm rounded-sm">
//         <CardContent>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             onReset={onReset}
//             className="space-y-8 @container"
//           >
//             {/* Step One - Coverage Details */}
//             {currentStep === 1 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold">Coverage Details</h2>
//                 <div className="grid grid-cols-12 gap-4">
//                   <Controller
//                     control={form.control}
//                     name="select-0"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Coverage Type
//                         </FieldLabel>
//                         <div className="w-full">
//                           <Select
//                             key="select-0"
//                             {...field}
//                             onValueChange={field.onChange}
//                           >
//                             <SelectTrigger id="select-0" className="w-full">
//                               <SelectValue placeholder="" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem key="individual" value="individual">
//                                 Individual
//                               </SelectItem>
//                               <SelectItem key="family" value="family">
//                                 Family
//                               </SelectItem>
//                             </SelectContent>
//                           </Select>
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="radio-0"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Policy plan
//                         </FieldLabel>
//                         <div className="w-full">
//                           <RadioGroup
//                             key="radio-0"
//                             id="radio-0"
//                             className="w-full"
//                             {...field}
//                             onValueChange={field.onChange}
//                           >
//                             <label
//                               key="option1"
//                               className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                               htmlFor="radio-0-option1"
//                             >
//                               <RadioGroupItem
//                                 value="option1"
//                                 id="radio-0-option1"
//                               />
//                               <div className="grid gap-2 leading-none">
//                                 <FieldLabel
//                                   htmlFor="radio-0-option1"
//                                   className="font-medium"
//                                 >
//                                   Bronze
//                                 </FieldLabel>
//                                 <p className="text-sm text-muted-foreground">
//                                   Option 1 Description
//                                 </p>
//                               </div>
//                             </label>

//                             <label
//                               key="option2"
//                               className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                               htmlFor="radio-0-option2"
//                             >
//                               <RadioGroupItem
//                                 value="option2"
//                                 id="radio-0-option2"
//                               />
//                               <div className="grid gap-2 leading-none">
//                                 <FieldLabel
//                                   htmlFor="radio-0-option2"
//                                   className="font-medium"
//                                 >
//                                   Silver
//                                 </FieldLabel>
//                               </div>
//                             </label>

//                             <label
//                               key="option-3"
//                               className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                               htmlFor="radio-0-option-3"
//                             >
//                               <RadioGroupItem
//                                 value="option-3"
//                                 id="radio-0-option-3"
//                               />
//                               <div className="grid gap-2 leading-none">
//                                 <FieldLabel
//                                   htmlFor="radio-0-option-3"
//                                   className="font-medium"
//                                 >
//                                   Gold
//                                 </FieldLabel>
//                               </div>
//                             </label>

//                             <label
//                               key="option-4"
//                               className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                               htmlFor="radio-0-option-4"
//                             >
//                               <RadioGroupItem
//                                 value="option-4"
//                                 id="radio-0-option-4"
//                               />
//                               <div className="grid gap-2 leading-none">
//                                 <FieldLabel
//                                   htmlFor="radio-0-option-4"
//                                   className="font-medium"
//                                 >
//                                   Platinum
//                                 </FieldLabel>
//                               </div>
//                             </label>
//                           </RadioGroup>
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="date-0"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Coverage Start Date
//                         </FieldLabel>
//                         <div className="w-full">
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 variant={"outline"}
//                                 className="justify-start text-left font-normal w-full"
//                                 id="date-0"
//                                 name=""
//                               >
//                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                 {field.value ? (
//                                   format(field.value, "PPP")
//                                 ) : (
//                                   <span className="text-muted-foreground">
//                                     Pick a date
//                                   </span>
//                                 )}
//                               </Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-auto p-0">
//                               <Calendar
//                                 mode="single"
//                                 initialFocus
//                                 onSelect={field.onChange}
//                               />
//                             </PopoverContent>
//                           </Popover>
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="checkbox-group-0"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Addons
//                         </FieldLabel>
//                         <div className="w-full">
//                           <div className="grid w-full gap-2">
//                             <Controller
//                               name="checkbox-group-0"
//                               control={form.control}
//                               render={({ field: OptionField }) => {
//                                 return (
//                                   <div
//                                     key="option1"
//                                     className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                                   >
//                                     <Checkbox
//                                       id="checkbox-group-0-option1"
//                                       checked={OptionField.value?.includes(
//                                         "option1"
//                                       )}
//                                       onCheckedChange={(checked) => {
//                                         return checked
//                                           ? OptionField.onChange([
//                                               ...(OptionField.value || []),
//                                               "option1",
//                                             ])
//                                           : OptionField.onChange(
//                                               OptionField.value?.filter(
//                                                 (value: string) =>
//                                                   value !== "option1"
//                                               )
//                                             );
//                                       }}
//                                     />
//                                     <div className="grid gap-2 leading-none">
//                                       <FieldLabel
//                                         className="font-medium"
//                                         htmlFor="checkbox-group-0-option1"
//                                       >
//                                         Dental
//                                       </FieldLabel>
//                                       <p className="text-sm text-muted-foreground">
//                                         Option 1 Description
//                                       </p>
//                                     </div>
//                                   </div>
//                                 );
//                               }}
//                             />

//                             <Controller
//                               name="checkbox-group-0"
//                               control={form.control}
//                               render={({ field: OptionField }) => {
//                                 return (
//                                   <div
//                                     key="option2"
//                                     className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                                   >
//                                     <Checkbox
//                                       id="checkbox-group-0-option2"
//                                       checked={OptionField.value?.includes(
//                                         "option2"
//                                       )}
//                                       onCheckedChange={(checked) => {
//                                         return checked
//                                           ? OptionField.onChange([
//                                               ...(OptionField.value || []),
//                                               "option2",
//                                             ])
//                                           : OptionField.onChange(
//                                               OptionField.value?.filter(
//                                                 (value: string) =>
//                                                   value !== "option2"
//                                               )
//                                             );
//                                       }}
//                                     />
//                                     <div className="grid gap-2 leading-none">
//                                       <FieldLabel
//                                         className="font-medium"
//                                         htmlFor="checkbox-group-0-option2"
//                                       >
//                                         Vision
//                                       </FieldLabel>
//                                     </div>
//                                   </div>
//                                 );
//                               }}
//                             />

//                             <Controller
//                               name="checkbox-group-0"
//                               control={form.control}
//                               render={({ field: OptionField }) => {
//                                 return (
//                                   <div
//                                     key="option-3"
//                                     className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                                   >
//                                     <Checkbox
//                                       id="checkbox-group-0-option-3"
//                                       checked={OptionField.value?.includes(
//                                         "option-3"
//                                       )}
//                                       onCheckedChange={(checked) => {
//                                         return checked
//                                           ? OptionField.onChange([
//                                               ...(OptionField.value || []),
//                                               "option-3",
//                                             ])
//                                           : OptionField.onChange(
//                                               OptionField.value?.filter(
//                                                 (value: string) =>
//                                                   value !== "option-3"
//                                               )
//                                             );
//                                       }}
//                                     />
//                                     <div className="grid gap-2 leading-none">
//                                       <FieldLabel
//                                         className="font-medium"
//                                         htmlFor="checkbox-group-0-option-3"
//                                       >
//                                         Maternity
//                                       </FieldLabel>
//                                     </div>
//                                   </div>
//                                 );
//                               }}
//                             />

//                             <Controller
//                               name="checkbox-group-0"
//                               control={form.control}
//                               render={({ field: OptionField }) => {
//                                 return (
//                                   <div
//                                     key="option-4"
//                                     className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                                   >
//                                     <Checkbox
//                                       id="checkbox-group-0-option-4"
//                                       checked={OptionField.value?.includes(
//                                         "option-4"
//                                       )}
//                                       onCheckedChange={(checked) => {
//                                         return checked
//                                           ? OptionField.onChange([
//                                               ...(OptionField.value || []),
//                                               "option-4",
//                                             ])
//                                           : OptionField.onChange(
//                                               OptionField.value?.filter(
//                                                 (value: string) =>
//                                                   value !== "option-4"
//                                               )
//                                             );
//                                       }}
//                                     />
//                                     <div className="grid gap-2 leading-none">
//                                       <FieldLabel
//                                         className="font-medium"
//                                         htmlFor="checkbox-group-0-option-4"
//                                       >
//                                         Critical Illness
//                                       </FieldLabel>
//                                     </div>
//                                   </div>
//                                 );
//                               }}
//                             />
//                           </div>
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Step Two - Personal Information (You can add fields here) */}
//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold">Personal Information</h2>
//                 <div className="grid grid-cols-12 gap-4">
//                   {/* Add personal information fields here */}
//                   <div className="col-span-12 text-center py-8">
//                     <p className="text-muted-foreground">
//                       Personal information fields would go here (name, address,
//                       contact info, etc.)
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step Three - Health Information */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold">Health Information</h2>
//                 <div className="grid grid-cols-12 gap-4">
//                   <Controller
//                     control={form.control}
//                     name="number-input-0"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Height
//                         </FieldLabel>
//                         <div className="w-full">
//                           <Input
//                             key="number-input-0"
//                             placeholder=""
//                             type="number"
//                             id="number-input-0"
//                             {...field}
//                           />
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="number-input-1"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Weight
//                         </FieldLabel>
//                         <div className="w-full">
//                           <Input
//                             key="number-input-1"
//                             placeholder=""
//                             type="number"
//                             id="number-input-1"
//                             {...field}
//                           />
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="switch-0"
//                     render={({ field, fieldState }) => {
//                       const { value, onChange, ...fieldProps } = field;
//                       return (
//                         <Field
//                           className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                           data-invalid={fieldState.invalid}
//                         >
//                           <FieldLabel className="hidden shrink-0">
//                             Do you smoke?
//                           </FieldLabel>
//                           <div className="w-full">
//                             <FieldLabel
//                               key="switch-0"
//                               className="border-0 p-0 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
//                               htmlFor="switch-0"
//                             >
//                               <div className="grid gap-1.5 leading-none">
//                                 <FieldLabel>Do you smoke?</FieldLabel>
//                                 <p className="text-sm text-muted-foreground">
//                                   Switch Description
//                                 </p>
//                               </div>
//                               <Switch
//                                 id="switch-0"
//                                 checked={field.value}
//                                 onCheckedChange={field.onChange}
//                                 {...fieldProps}
//                               />
//                             </FieldLabel>
//                             {fieldState.invalid && (
//                               <FieldError errors={[fieldState.error]} />
//                             )}
//                           </div>
//                         </Field>
//                       );
//                     }}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="textarea-0"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Existing Medical Condition(s)
//                         </FieldLabel>
//                         <div className="w-full">
//                           <Textarea
//                             key="textarea-0"
//                             id="textarea-0"
//                             placeholder=""
//                             {...field}
//                           />
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="text-input-1"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Primary Doctor's name (optional)
//                         </FieldLabel>
//                         <div className="w-full">
//                           <Input
//                             key="text-input-1"
//                             placeholder=""
//                             type="text"
//                             id="text-input-1"
//                             {...field}
//                           />
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />

//                   <Controller
//                     control={form.control}
//                     name="text-input-0"
//                     render={({ field, fieldState }) => (
//                       <Field
//                         className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//                         data-invalid={fieldState.invalid}
//                       >
//                         <FieldLabel className="flex shrink-0">
//                           Contact (optional)
//                         </FieldLabel>
//                         <div className="w-full">
//                           <Input
//                             key="text-input-0"
//                             placeholder=""
//                             type="text"
//                             id="text-input-0"
//                             {...field}
//                           />
//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </div>
//                       </Field>
//                     )}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between pt-8">
//               <div>
//                 {currentStep > 1 && (
//                   <Button type="button" variant="outline" onClick={prevStep}>
//                     Previous
//                   </Button>
//                 )}
//               </div>

//               <div className="flex gap-4">
//                 <Button type="reset" variant="outline">
//                   Reset
//                 </Button>

//                 {currentStep < 3 ? (
//                   <Button type="button" onClick={nextStep}>
//                     Next
//                   </Button>
//                 ) : (
//                   <Button type="submit">Submit</Button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// "use client";

// import { Button } from "@workspace/ui/components/button";
// import { Card, CardContent } from "@workspace/ui/components/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@workspace/ui/components/form";
// import { Input } from "@workspace/ui/components/input";
// import { Textarea } from "@workspace/ui/components/textarea";
// import { cn } from "@workspace/ui/lib/utils";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// export const OnboardingForm = () => {
//   const router = useRouter();
//   const [step, setStep] = useState(0);
//   const totalSteps = 3;

//   const form = useForm();

//   const { handleSubmit, control, reset } = form;

//   const onSubmit = async (formData: unknown) => {
//     if (step < totalSteps - 1) {
//       setStep(step + 1);
//     } else {
//       console.log(formData);
//       toast.success("Form successfully submitted");
//       router.push("/dashboard");
//     }
//   };

//   const handleBack = () => {
//     if (step > 0) {
//       setStep(step - 1);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-center">
//         {Array.from({ length: totalSteps }).map((_, index) => (
//           <div key={index} className="flex items-center">
//             <div
//               className={cn(
//                 "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
//                 index === step
//                   ? "bg-primary"
//                   : index < step
//                     ? "bg-primary"
//                     : "bg-primary/30"
//               )}
//             />
//             {index < totalSteps - 1 && (
//               <div
//                 className={cn(
//                   "w-8 h-0.5",
//                   index < step ? "bg-primary" : "bg-primary/30"
//                 )}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="font-semibold">
//         Information of the Insurance policyholder
//       </div>
//       <Card className="shadow-sm rounded-sm">
//         <CardContent>
//           {step === 0 && (
//             <Form {...form}>
//               <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
//                 <FormField
//                   key="VAOWPtpX"
//                   control={control}
//                   name="VAOWPtpX"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>The policyholder name</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="First Name"
//                           autoComplete="off"
//                         />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   key="Uiw4fHb8"
//                   control={control}
//                   name="Uiw4fHb8"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Birthdate</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="01/01/2025"
//                           autoComplete="off"
//                         />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   key="IvHtYRZ8"
//                   control={control}
//                   name="IvHtYRZ8"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Address</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="Street name"
//                           autoComplete="off"
//                         />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   key="1du0z8en"
//                   control={control}
//                   name="1du0z8en"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="(+254)700000000"
//                           autoComplete="off"
//                         />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 {/* <FormField
//                   key="cR9eTeDP"
//                   control={control}
//                   name="cR9eTeDP"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-base">
//                           Other benefeciaries?
//                         </FormLabel>
//                         <FormDescription></FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 /> */}

//                 <div className="flex justify-between">
//                   <Button
//                     type="button"
//                     className="font-medium"
//                     size="sm"
//                     onClick={handleBack}
//                     disabled={step === 0}
//                   >
//                     Back
//                   </Button>
//                   <Button type="submit" size="sm" className="font-medium">
//                     {step === (2 as number) ? "Submit" : "Next"}
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           )}

//           {step === 1 && (
//             <Form {...form}>
//               <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
//                 <FormField
//                   key="ZLrgLYRm"
//                   control={control}
//                   name="ZLrgLYRm"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Beneficiary image</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="(+254)700000000"
//                           autoComplete="off"
//                         />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   key="UmEzccGY"
//                   control={control}
//                   name="UmEzccGY"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Name of hospital</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="" autoComplete="off" />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <div className="flex justify-between">
//                   <Button
//                     type="button"
//                     className="font-medium"
//                     size="sm"
//                     onClick={handleBack}
//                     disabled={step === (0 as number)}
//                   >
//                     Back
//                   </Button>
//                   <Button type="submit" size="sm" className="font-medium">
//                     {step === totalSteps - 1 ? "Submit" : "Next"}
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           )}

//           {step === 2 && (
//             <Form {...form}>
//               <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
//                 <FormField
//                   key="gyovECd9"
//                   control={control}
//                   name="gyovECd9"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Add other beneficiaries</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="" autoComplete="off" />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   key="3YC5qCys"
//                   control={control}
//                   name="3YC5qCys"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Input 2</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="(+254)700000000"
//                           autoComplete="off"
//                         />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   key="9gRqK0xA"
//                   control={control}
//                   name="9gRqK0xA"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Input 3</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           {...field}
//                           placeholder=""
//                           className="resize-none"
//                           rows={5}
//                         />
//                       </FormControl>
//                       <FormDescription></FormDescription>
//                     </FormItem>
//                   )}
//                 />

//                 <div className="flex justify-between">
//                   <Button
//                     type="button"
//                     className="font-medium"
//                     size="sm"
//                     onClick={handleBack}
//                     disabled={step === (0 as number)}
//                   >
//                     Back
//                   </Button>
//                   <Button type="submit" size="sm" className="font-medium">
//                     {step === 2 ? "Submit" : "Next"}
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // // Step One
// "use client";
// import {
//   Field,
//   FieldDescription,
//   FieldLabel,
//   FieldError,
// } from "@/components/ui/field";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useForm, Controller } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";

// export default function UntitledForm() {
//   const formSchema = z.object({
//     "text-input-0": z.string(),
//     "text-input-1": z.string(),
//     "text-input-2": z.string(),
//     "text-input-3": z.string(),
//     "number-input-0": z.coerce.number().optional(),
//     "text-input-4": z.string(),
//     "text-input-5": z.string(),
//     "text-input-6": z.string(),
//     "email-input-0": z.string(),
//     "tel-input-0": z.string(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       "text-input-0": "",
//       "text-input-1": "",
//       "text-input-2": "",
//       "text-input-3": "",
//       "number-input-0": 0,
//       "text-input-4": "",
//       "text-input-5": "",
//       "text-input-6": "",
//       "email-input-0": "",
//       "tel-input-0": "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }

//   function onReset() {
//     form.reset();
//     form.clearErrors();
//   }

//   return (
//     <form
//       onSubmit={form.handleSubmit(onSubmit)}
//       onReset={onReset}
//       className="space-y-8 @container"
//     >
//       <div className="grid grid-cols-12 gap-4">
//         <Controller
//           control={form.control}
//           name="text-input-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">
//                 The policyholder name
//               </FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-0"
//                     placeholder="First name"
//                     type="text"
//                     id="text-input-0"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-1"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0"></FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-1"
//                     placeholder="Middle name"
//                     type="text"
//                     id="text-input-1"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-2"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0"></FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-2"
//                     placeholder="Third name"
//                     type="text"
//                     id="text-input-2"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-3"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Date</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-3"
//                     placeholder=""
//                     type="text"
//                     id="text-input-3"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="number-input-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">ID Number</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="number-input-0"
//                     placeholder="+254 1000000"
//                     type="number"
//                     id="number-input-0"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-4"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Home Address</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-4"
//                     placeholder=""
//                     type="text"
//                     id="text-input-4"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-5"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">City</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-5"
//                     placeholder=""
//                     type="text"
//                     id="text-input-5"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-6"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">County</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-6"
//                     placeholder=""
//                     type="text"
//                     id="text-input-6"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="email-input-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Email</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="email-input-0"
//                     placeholder=""
//                     type="email"
//                     id="email-input-0"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="tel-input-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Telephone</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="tel-input-0"
//                     placeholder=""
//                     type="tel"
//                     id="tel-input-0"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//       </div>
//     </form>
//   );
// }

// // Step Two

// "use client";
// import {
//   Field,
//   FieldDescription,
//   FieldLabel,
//   FieldError,
// } from "@/components/ui/field";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useForm, Controller } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";

// export default function UntitledForm() {
//   const formSchema = z.object({
//     "select-0": z.string(),
//     "radio-0": z.string(),
//     "date-0": z.date().optional(),
//     "checkbox-group-0": z.array(z.string()).optional(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       "select-0": "",
//       "radio-0": "",
//       "date-0": new Date("2025-10-28T13:21:37.152Z"),
//       "checkbox-group-0": ["option1"],
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }

//   function onReset() {
//     form.reset();
//     form.clearErrors();
//   }

//   return (
//     <form
//       onSubmit={form.handleSubmit(onSubmit)}
//       onReset={onReset}
//       className="space-y-8 @container"
//     >
//       <div className="grid grid-cols-12 gap-4">
//         <Controller
//           control={form.control}
//           name="select-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Coverage Type</FieldLabel>

//               <div className="w-full">
//                 <Select
//                   key="select-0"
//                   id="select-0"
//                   className=""
//                   {...field}
//                   onValueChange={field.onChange}
//                 >
//                   <SelectTrigger className="w-full ">
//                     <SelectValue placeholder="" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem key="individual" value="individual">
//                       Individual
//                     </SelectItem>

//                     <SelectItem key="family" value="family">
//                       Family
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="radio-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Policy plan</FieldLabel>

//               <div className="w-full">
//                 <RadioGroup
//                   key="radio-0"
//                   id="radio-0"
//                   className="w-full"
//                   {...field}
//                   onValueChange={field.onChange}
//                 >
//                   <div
//                     key="option1"
//                     className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                     htmlFor="radio-0-option1"
//                   >
//                     <RadioGroupItem value="option1" id="radio-0-option1" />
//                     <div className="grid gap-2 leading-none">
//                       <FieldLabel
//                         htmlFor="radio-0-option1"
//                         className="font-medium"
//                       >
//                         Bronze
//                       </FieldLabel>
//                       <p className="text-sm text-muted-foreground">
//                         Option 1 Description
//                       </p>
//                     </div>
//                   </div>

//                   <div
//                     key="option2"
//                     className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                     htmlFor="radio-0-option2"
//                   >
//                     <RadioGroupItem value="option2" id="radio-0-option2" />
//                     <div className="grid gap-2 leading-none">
//                       <FieldLabel
//                         htmlFor="radio-0-option2"
//                         className="font-medium"
//                       >
//                         Silver
//                       </FieldLabel>
//                     </div>
//                   </div>

//                   <div
//                     key="option-3"
//                     className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                     htmlFor="radio-0-option-3"
//                   >
//                     <RadioGroupItem value="option-3" id="radio-0-option-3" />
//                     <div className="grid gap-2 leading-none">
//                       <FieldLabel
//                         htmlFor="radio-0-option-3"
//                         className="font-medium"
//                       >
//                         Gold
//                       </FieldLabel>
//                     </div>
//                   </div>

//                   <div
//                     key="option-4"
//                     className="flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                     htmlFor="radio-0-option-4"
//                   >
//                     <RadioGroupItem value="option-4" id="radio-0-option-4" />
//                     <div className="grid gap-2 leading-none">
//                       <FieldLabel
//                         htmlFor="radio-0-option-4"
//                         className="font-medium"
//                       >
//                         Platinum
//                       </FieldLabel>
//                     </div>
//                   </div>
//                 </RadioGroup>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="date-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">
//                 Coverage Start Date
//               </FieldLabel>

//               <div className="w-full">
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant={"outline"}
//                       className="justify-start text-left font-normal w-full"
//                       id="date-0"
//                       name=""
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {field.value ? (
//                         format(field.value, "PPP")
//                       ) : (
//                         <span className="text-muted-foreground">
//                           Pick a date
//                         </span>
//                       )}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       initialFocus
//                       onSelect={field.onChange}
//                     />
//                   </PopoverContent>
//                 </Popover>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="checkbox-group-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Addons</FieldLabel>

//               <div className="w-full">
//                 <div className="grid w-full gap-2">
//                   <Controller
//                     name="checkbox-group-0"
//                     control={form.control}
//                     render={({ field: OptionField }) => {
//                       return (
//                         <div
//                           key="option1"
//                           className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                         >
//                           <Checkbox
//                             id="checkbox-group-0-option1"
//                             checked={OptionField.value?.includes("option1")}
//                             onCheckedChange={(checked) => {
//                               return checked
//                                 ? OptionField.onChange([
//                                     ...(OptionField.value || []),
//                                     "option1",
//                                   ])
//                                 : OptionField.onChange(
//                                     OptionField.value?.filter(
//                                       (value: string) => value !== "option1",
//                                     ),
//                                   );
//                             }}
//                           />
//                           <div className="grid gap-2 leading-none">
//                             <FieldLabel
//                               className="font-medium"
//                               htmlFor="checkbox-group-0-option1"
//                             >
//                               Dental
//                             </FieldLabel>
//                             <p className="text-sm text-muted-foreground">
//                               Option 1 Description
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     }}
//                   />

//                   <Controller
//                     name="checkbox-group-0"
//                     control={form.control}
//                     render={({ field: OptionField }) => {
//                       return (
//                         <div
//                           key="option2"
//                           className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                         >
//                           <Checkbox
//                             id="checkbox-group-0-option2"
//                             checked={OptionField.value?.includes("option2")}
//                             onCheckedChange={(checked) => {
//                               return checked
//                                 ? OptionField.onChange([
//                                     ...(OptionField.value || []),
//                                     "option2",
//                                   ])
//                                 : OptionField.onChange(
//                                     OptionField.value?.filter(
//                                       (value: string) => value !== "option2",
//                                     ),
//                                   );
//                             }}
//                           />
//                           <div className="grid gap-2 leading-none">
//                             <FieldLabel
//                               className="font-medium"
//                               htmlFor="checkbox-group-0-option2"
//                             >
//                               Vision
//                             </FieldLabel>
//                           </div>
//                         </div>
//                       );
//                     }}
//                   />

//                   <Controller
//                     name="checkbox-group-0"
//                     control={form.control}
//                     render={({ field: OptionField }) => {
//                       return (
//                         <div
//                           key="option-3"
//                           className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                         >
//                           <Checkbox
//                             id="checkbox-group-0-option-3"
//                             checked={OptionField.value?.includes("option-3")}
//                             onCheckedChange={(checked) => {
//                               return checked
//                                 ? OptionField.onChange([
//                                     ...(OptionField.value || []),
//                                     "option-3",
//                                   ])
//                                 : OptionField.onChange(
//                                     OptionField.value?.filter(
//                                       (value: string) => value !== "option-3",
//                                     ),
//                                   );
//                             }}
//                           />
//                           <div className="grid gap-2 leading-none">
//                             <FieldLabel
//                               className="font-medium"
//                               htmlFor="checkbox-group-0-option-3"
//                             >
//                               Maternity
//                             </FieldLabel>
//                           </div>
//                         </div>
//                       );
//                     }}
//                   />

//                   <Controller
//                     name="checkbox-group-0"
//                     control={form.control}
//                     render={({ field: OptionField }) => {
//                       return (
//                         <div
//                           key="option-4"
//                           className="flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3 border-0 p-0"
//                         >
//                           <Checkbox
//                             id="checkbox-group-0-option-4"
//                             checked={OptionField.value?.includes("option-4")}
//                             onCheckedChange={(checked) => {
//                               return checked
//                                 ? OptionField.onChange([
//                                     ...(OptionField.value || []),
//                                     "option-4",
//                                   ])
//                                 : OptionField.onChange(
//                                     OptionField.value?.filter(
//                                       (value: string) => value !== "option-4",
//                                     ),
//                                   );
//                             }}
//                           />
//                           <div className="grid gap-2 leading-none">
//                             <FieldLabel
//                               className="font-medium"
//                               htmlFor="checkbox-group-0-option-4"
//                             >
//                               Critical Illness
//                             </FieldLabel>
//                           </div>
//                         </div>
//                       );
//                     }}
//                   />
//                 </div>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//       </div>
//     </form>
//   );
// }

// // Step Three

// "use client";
// import {
//   Field,
//   FieldDescription,
//   FieldLabel,
//   FieldError,
// } from "@/components/ui/field";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useForm, Controller } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";

// export default function UntitledForm() {
//   const formSchema = z.object({
//     "number-input-0": z.coerce.number().optional(),
//     "number-input-1": z.coerce.number().optional(),
//     "switch-0": z.boolean().default(false).optional(),
//     "textarea-0": z.string(),
//     "text-input-1": z.string(),
//     "text-input-0": z.string(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       "number-input-0": 0,
//       "number-input-1": 0,
//       "switch-0": false,
//       "textarea-0": "",
//       "text-input-1": "",
//       "text-input-0": "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }

//   function onReset() {
//     form.reset();
//     form.clearErrors();
//   }

//   return (
//     <form
//       onSubmit={form.handleSubmit(onSubmit)}
//       onReset={onReset}
//       className="space-y-8 @container"
//     >
//       <div className="grid grid-cols-12 gap-4">
//         <Controller
//           control={form.control}
//           name="number-input-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Height</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="number-input-0"
//                     placeholder=""
//                     type="number"
//                     id="number-input-0"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="number-input-1"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">Weight</FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="number-input-1"
//                     placeholder=""
//                     type="number"
//                     id="number-input-1"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="switch-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="hidden shrink-0">Do you smoke?</FieldLabel>

//               <div className="w-full">
//                 <FieldLabel
//                   key="switch-0"
//                   className="border-0 p-0 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
//                   htmlFor="switch-0"
//                 >
//                   <div className="grid gap-1.5 leading-none">
//                     <FieldLabel>Do you smoke?</FieldLabel>
//                     <p className="text-sm text-muted-foreground">
//                       Switch Description
//                     </p>
//                   </div>
//                   <Switch
//                     id="switch-0"
//                     {...field}
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FieldLabel>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="textarea-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">
//                 Existing Medical Condition(s)
//               </FieldLabel>

//               <div className="w-full">
//                 <Textarea
//                   key="textarea-0"
//                   id="textarea-0"
//                   placeholder=""
//                   className=""
//                   {...field}
//                 />

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-1"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">
//                 Primary Doctor's name (optional)
//               </FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-1"
//                     placeholder=""
//                     type="text"
//                     id="text-input-1"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//         <Controller
//           control={form.control}
//           name="text-input-0"
//           render={({ field, fieldState }) => (
//             <Field
//               className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
//               data-invalid={fieldState.invalid}
//             >
//               <FieldLabel className="flex shrink-0">
//                 Contact (optional)
//               </FieldLabel>

//               <div className="w-full">
//                 <>
//                   <Input
//                     key="text-input-0"
//                     placeholder=""
//                     type="text"
//                     id="text-input-0"
//                     className=" "
//                     {...field}
//                   />
//                 </>

//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </div>
//             </Field>
//           )}
//         />
//       </div>
//     </form>
//   );
// }
