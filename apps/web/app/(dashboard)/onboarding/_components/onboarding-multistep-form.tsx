"use client";

import { schema } from "@workspace/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useOnboarding } from "@/contexts/onboarding-context";
import { client } from "@/lib/api";
import { onboardingFormSchema } from "@/types/onboarding";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Form } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import OnboardingCoverageFormDetails from "./onboarding-coverage-details";
import OnboardingNameForm from "./onboarding-name-form";
import { authClient } from "@/lib/auth/auth-client";

const TOTAL_STEPS = 3;

const onboardingNameFormSchema = onboardingFormSchema.pick({
  height: true,
  weight: true,
  smoker: true,
  medical_conditions: true,
  doctors_name: true,
  doctors_phone_number: true,
});

type OnboardingExtrasFormData = z.infer<typeof onboardingNameFormSchema>;

export function OnboardingMultistepForm() {
  const { data: session } = authClient.useSession();

  const router = useRouter();

  const { currentStep, formData, resetForm, setCurrentStep, updateFormData } =
    useOnboarding();

  const form = useForm<OnboardingExtrasFormData>({
    resolver: zodResolver(onboardingNameFormSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      height: 0,
      weight: 0,
      smoker: false,
      medical_conditions: "",
      doctors_name: "",
      doctors_phone_number: "",
    },
  });

  async function onSubmit(data: Partial<z.infer<typeof onboardingFormSchema>>) {
  const combinedData = {
    ...formData,
    ...data,
  };

  const finalFormData: schema.InsertUserProfile  = { 
    ...combinedData,
    user_id: session?.user.id ?? "",
    dob: combinedData.dob instanceof Date ? combinedData.dob.toISOString() : "",
    policy_start_date: combinedData.policy_start_date instanceof Date 
      ? combinedData.policy_start_date?.toISOString() 
      : undefined,
  };
    try {
      const f = schema.insertUserProfileSchema.parse(finalFormData)
      const result = await client["user-profile"].$post({
        json: f,
      });

      console.log("SUCCESS", result.json());
    } catch (error) {
      console.error("Internal server error", error);
      if (error instanceof z.ZodError) {
      // Handle validation errors
      toast.error("Please check your form data", {
        description: error.errors.map(e => `${e.path}: ${e.message}`).join(', '),
      });
    }
    }
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(finalFormData, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });

    router.push("/dashboard");
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="shadow-sm rounded-sm min-h-[480px] flex flex-col">
      <CardContent className="flex-1 flex flex-col">
        {currentStep === 0 && <OnboardingNameForm />}

        {currentStep === 1 && <OnboardingCoverageFormDetails />}

        {currentStep === 2 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 @container flex-1 flex flex-col"
            >
              <div className="grid grid-cols-12 gap-4 flex-1">
                <Controller
                  control={form.control}
                  name="height"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex shrink-0">Height</FieldLabel>

                      <div className="w-full">
                        <>
                          <Input
                            key="height"
                            placeholder=""
                            type="number"
                            id="height"
                            className=" "
                            {...field}
                          />
                        </>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="weight"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex shrink-0">Weight</FieldLabel>

                      <div className="w-full">
                        <>
                          <Input
                            key="weight"
                            placeholder=""
                            type="number"
                            id="weight"
                            className=" "
                            {...field}
                          />
                        </>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="smoker"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="hidden shrink-0">
                        Do you smoke?
                      </FieldLabel>

                      <div className="w-full">
                        <FieldLabel
                          key="smoker"
                          className="border-0 p-0 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
                          htmlFor="smoker"
                        >
                          <div className="grid gap-1.5 leading-none">
                            <FieldLabel>Do you smoke?</FieldLabel>
                            <p className="text-sm text-muted-foreground">
                              Switch Description
                            </p>
                          </div>
                          <Switch
                            id="smoker"
                            // {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FieldLabel>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="medical_conditions"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex shrink-0">
                        Existing Medical Condition(s)
                      </FieldLabel>

                      <div className="w-full">
                        <Textarea
                          key="medical_conditions"
                          id="medical_conditions"
                          placeholder=""
                          className=""
                          {...field}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="doctors_name"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex shrink-0">
                        Primary Doctor's name (optional)
                      </FieldLabel>

                      <div className="w-full">
                        <>
                          <Input
                            key="doctors_name"
                            placeholder=""
                            type="text"
                            id="doctors_name"
                            className=" "
                            {...field}
                          />
                        </>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="doctors_phone_number"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex shrink-0">
                        Doctor's Contact (optional)
                      </FieldLabel>

                      <div className="w-full">
                        <>
                          <Input
                            key="doctors_phone_number"
                            placeholder=""
                            type="text"
                            id="doctors_phone_number"
                            className=" "
                            {...field}
                          />
                        </>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />
                <div className="w-full col-span-12 mt-auto pt-6">
                  <Field
                    orientation="horizontal"
                    className="flex justify-between"
                  >
                    <Button
                      type="button"
                      className="font-medium"
                      size="sm"
                      variant={"outline"}
                      onClick={handleBack}
                      disabled={currentStep === (0 as number)}
                    >
                      Back
                    </Button>
                    <Button type="submit" size="sm" className="font-medium">
                      {currentStep === (2 as number) ? "Submit" : "Next"}
                    </Button>
                  </Field>
                </div>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
