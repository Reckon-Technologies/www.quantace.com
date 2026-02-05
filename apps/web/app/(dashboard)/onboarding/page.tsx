"use client";

import { useOnboarding } from "@/contexts/onboarding-context";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card, CardFooter, CardHeader } from "@workspace/ui/components/card";
import { Phone } from "lucide-react";
import { OnboardingMultistepForm } from "./_components/onboarding-multistep-form";

export interface IOnboardingPageProps {}

export default function OnboardingPage(props: IOnboardingPageProps) {
  const { currentStep, setCurrentStep } = useOnboarding();

  const TOTAL_STEPS = 3;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Define step configurations
  const steps = [
    { number: 1, label: "Personal", fullLabel: "Personal Info" },
    { number: 2, label: "Coverage", fullLabel: "Coverage Info" },
    { number: 3, label: "Additional", fullLabel: "Additional Info" },
  ];

  return (
    <section className="relative py-6 bg-muted min-h-svh px-2.5">
      {/* Stepper bar */}
      {/* <StepperProgress step={step} totalSteps={TOTAL_STEPS} /> */}
      <>
        <ol className="flex items-center w-full py-3 space-x-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isLastStep = index === steps.length - 1;

            return (
              <li
                key={step.number}
                className={`flex items-center cursor-pointer ${
                  isCompleted || isCurrent
                    ? "text-blue-600 dark:text-blue-500"
                    : ""
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {/* Step circle */}
                <span
                  className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isCurrent
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-500 dark:border-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </span>

                {/* Step label */}
                <span className="hidden sm:inline-flex">{step.fullLabel}</span>
                <span className="sm:hidden">{step.label}</span>

                {/* Separator arrow (not for last step) */}
                {!isLastStep && (
                  <svg
                    className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m7 9 4-4-4-4M1 9l4-4-4-4"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </>

      <div className="container mx-auto pt-4">
        <div className="font-semibold mb-4">
          Information of the Insurance policyholder
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-9">
          <div className="lg:col-span-3">
            <OnboardingMultistepForm />
            {/* <OnboardingForm /> */}
          </div>
          <div className="col-span-1 h-full">
            <Card className="@container/card rounded-md py-8">
              <CardHeader>
                <Avatar className="mb-4 h-12 w-12">
                  <AvatarImage
                    src="/img/customer-agent-2.png.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium tracking-tight">
                  Need help ?
                </p>
                <p className="text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4">
                  You can contact our advisors to get your personalized quote.
                </p>
              </CardHeader>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" size="sm">
                  <Phone />
                  +100 729 333 222
                </Button>
                <Button className="w-full" variant={"link"} size="sm">
                  I want to be called
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
