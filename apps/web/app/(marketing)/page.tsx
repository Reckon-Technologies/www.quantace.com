import { Hero } from "@/components/hero";

export default function Page() {
  return (
    <div className="flex flex-col items-center min-h-svh">
      <Hero
        heading="Professional insurance reinvented"
        description="A 100% digital subscription. A dedicated contact available by call, SMS, chat or email. The only non-binding insurance."
        buttons={{
          primary: { text: "Quote in 3 minutes", url: "/onboarding" },
          secondary: { text: "Contact an advisor", url: "#" },
        }}
        image={{
          src: "/img/placeholder-1.svg",
          alt: "Hero section demo image showing interface components",
        }}
      />
    </div>
  );
}
