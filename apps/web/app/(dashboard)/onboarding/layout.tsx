// app/layout.tsx or app/(dashboard)/onboarding/layout.tsx
import { OnboardingProvider } from "@/contexts/onboarding-context";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
