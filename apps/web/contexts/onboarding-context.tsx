// contexts/onboarding-context.tsx
"use client";

import { OnboardingFormData } from "@/types/onboarding";
import * as React from "react";

interface OnboardingContextType {
  formData: OnboardingFormData;
  currentStep: number;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const defaultFormData: OnboardingFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: undefined,
  idNumber: "",
  homeAddress: "",
  city: "",
  county: "",
  email: "",
  phoneNumber: "",
  coverageType: "",
  policyPlan: "",
  policyStartDate: undefined,
  addons: [],
  height: undefined,
  weight: undefined,
  smoker: false,
  medicalConditions: "",
  doctorsName: "",
  doctorsPhoneNumber: "",
};

const OnboardingContext = React.createContext<
  OnboardingContextType | undefined
>(undefined);

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [formData, setFormData] =
    React.useState<OnboardingFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = React.useState(0);

  const updateFormData = React.useCallback(
    (data: Partial<OnboardingFormData>) => {
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    },
    []
  );

  const resetForm = React.useCallback(() => {
    setFormData(defaultFormData);
    setCurrentStep(0);
  }, []);

  const value = React.useMemo(
    () => ({
      formData,
      currentStep,
      updateFormData,
      setCurrentStep,
      resetForm,
    }),
    [formData, currentStep, updateFormData, resetForm]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom hook to use the onboarding context
export function useOnboarding() {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
