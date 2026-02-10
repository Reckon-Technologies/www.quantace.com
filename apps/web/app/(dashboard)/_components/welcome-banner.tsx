"use client";

import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { Separator } from "@workspace/ui/components/separator";
import { BellDot, ClipboardPlus, Sparkle, X } from "lucide-react";
import Link from "next/link";

export interface IWelcomeBannerProps {
  title: string;
  description: string;
}

export default function WelcomeBanner({
  title = "Welcome Back",
  description = "John Doe",
}: IWelcomeBannerProps) {
  return (
    <section className="bg-gradient-to-r from-[#013797] from-0% via-[#00A6ED] via-[63%] to-[#0050CD] to-100% w-full px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="flex flex-col text-sm">
              <span className="font-medium text-background">{title}</span>{" "}
              <span className="font-semibold text-background text-2xl lg:text-3xl">
                {description}{" "}
              </span>
            </span>
          </div>

          <ButtonGroup>
            <ButtonGroup>
              <Button
                asChild
                className="lg:h-16 lg:min-w-40 rounded-lg bg-[#CCFBF1]/30 hover:bg-[#CCFBF1]/40 flex flex-col cursor-pointer"
              >
                <Link href={"/onboarding"}>
                  <ClipboardPlus />
                  <span className="hidden lg:inline-flex">New Quote</span>
                </Link>
              </Button>
              <Separator
                orientation={"vertical"}
                className="bg-background/50 w-[1px]"
              />
              <Button className="relative lg:h-16 lg:min-w-40 rounded-lg bg-[#CCFBF1]/30 hover:bg-[#CCFBF1]/40 flex flex-col cursor-pointer">
                <BellDot />
                <span className="hidden lg:inline-flex">Notifications</span>
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button className="lg:h-16 lg:min-w-40 rounded-lg bg-[#CCFBF1]/30 hover:bg-[#CCFBF1]/40 flex flex-col cursor-pointer">
                <Sparkle />
                <span className="hidden lg:inline-flex">Broker Copilot</span>
              </Button>
            </ButtonGroup>

            {/* <ButtonGroup className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="-mr-2 h-8 w-8 flex-none text-background"
                onClick={() => {}}
              >
                <X className="h-4 w-4" />
              </Button>
            </ButtonGroup> */}
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
}
