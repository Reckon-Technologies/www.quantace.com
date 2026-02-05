import { useOnboarding } from "@/contexts/onboarding-context";
import { onboardingFormSchema } from "@/types/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Form } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const onboardingNameFormSchema = onboardingFormSchema.pick({
  height: true,
  weight: true,
  smoker: true,
  medicalConditions: true,
  doctorsName: true,
  doctorsPhoneNumber: true,
});

type OnboardingExtrasFormData = z.infer<typeof onboardingNameFormSchema>;

export interface IOnboardingExtrasFormProps {}

export default function OnboardingExtrasForm(
  props: IOnboardingExtrasFormProps
) {
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
      medicalConditions: "",
      doctorsName: "",
      doctorsPhoneNumber: "",
    },
  });

  async function onSubmit(data: OnboardingExtrasFormData) {
    // console.log("Form submitted:", data);
    updateFormData(data);
    setCurrentStep(currentStep + 1);
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
            name="medicalConditions"
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
                    key="medicalConditions"
                    id="medicalConditions"
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
            name="doctorsName"
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
                      key="doctorsName"
                      placeholder=""
                      type="text"
                      id="doctorsName"
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
            name="doctorsPhoneNumber"
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
                      key="doctorsPhoneNumber"
                      placeholder=""
                      type="text"
                      id="doctorsPhoneNumber"
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
            <Field orientation="horizontal" className="flex justify-between">
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
  );
}
