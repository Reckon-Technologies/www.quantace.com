import { Navbar } from "@/components/navbar";
import { auth } from "@workspace/auth/server";
import { headers } from "next/headers";
import * as React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  // if (!session) redirect("/login");

  return (
    <div className="min-h-svh flex flex-col">
      <div className="sticky top-0 z-10 shadow-xs">
        <Navbar
          menu={[
            {
              title: "Dashboard",
              url: "/dashboard",
            },
            {
              title: "Activities",
              url: "#",
            },
            {
              title: "Resources",
              url: "#",
            },
            {
              title: "Partners",
              url: "#",
            },
          ]}
          dashboardAuth
        />
      </div>
      {children}
    </div>
  );
}
