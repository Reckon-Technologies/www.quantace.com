import { Navbar } from "@/components/navbar";
import * as React from "react";

export default function MarketingPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-0 z-10 shadow-xs">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
