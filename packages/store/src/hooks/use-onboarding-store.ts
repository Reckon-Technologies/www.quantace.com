import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  type OnboardingStore,
  initialOnboardingState,
} from "../onboarding-store";

// React hook version with persistence and devtools
export const useOnboardingStore = create<OnboardingStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialOnboardingState,

        updateFormData: (updates) => {
          set((state) => ({
            formData: { ...state.formData, ...updates },
          }));
        },

        setFormData: (formData) => {
          set({ formData });
        },

        nextStep: () => {
          set((state) => ({
            currentStep: Math.min(state.currentStep + 1, 5),
          }));
        },

        prevStep: () => {
          set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 0),
          }));
        },

        goToStep: (step) => {
          set({ currentStep: step });
        },

        setSubmitting: (isSubmitting) => {
          set({ isSubmitting });
        },

        setSubmitted: (formId) => {
          set({
            isSubmitted: true,
            formId,
            isSubmitting: false,
            error: undefined,
          });
        },

        setError: (error) => {
          set({
            error,
            isSubmitting: false,
          });
        },

        reset: () => {
          set(initialOnboardingState);
        },
      }),
      {
        name: "onboarding-storage",
        partialize: (state) => ({
          formData: state.formData,
          currentStep: state.currentStep,
        }),
      }
    ),
    {
      name: "OnboardingStore",
    }
  )
);
