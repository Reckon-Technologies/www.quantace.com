import { type OnboardingFormData } from "@workspace/types";
import { createStore } from "zustand/vanilla";

export interface OnboardingState {
  // Form data
  formData: Partial<OnboardingFormData>;

  // UI state
  currentStep: number;
  isSubmitting: boolean;
  isSubmitted: boolean;

  // Server state
  formId?: string;
  error?: string;
}

export interface OnboardingActions {
  // Form actions
  updateFormData: (updates: Partial<OnboardingFormData>) => void;
  setFormData: (formData: Partial<OnboardingFormData>) => void;

  // Step actions
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // Submission actions
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitted: (formId: string) => void;
  setError: (error: string) => void;

  // Reset
  reset: () => void;
}

export type OnboardingStore = OnboardingState & OnboardingActions;

export const initialOnboardingState: OnboardingState = {
  formData: {},
  currentStep: 0,
  isSubmitting: false,
  isSubmitted: false,
  formId: undefined,
  error: undefined,
};

export const createOnboardingStore = (initState?: Partial<OnboardingState>) => {
  return createStore<OnboardingStore>()((set, get) => ({
    ...initialOnboardingState,
    ...initState,

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
        currentStep: Math.min(state.currentStep + 1, 5), // Adjust max steps as needed
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
  }));
};
