"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Icons } from "@workspace/ui/components/icons";
import { Label } from "@workspace/ui/components/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/quote-card-accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { cn } from "@workspace/ui/lib/utils";
import {
  Check,
  CreditCard,
  HandCoins,
  HelpCircle,
  LucideIcon,
  MessagesSquare,
  ShieldCheck,
  ShieldPlus,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface IQuoteCardsProps {
  logo: string;
  badges?: Array<{ icon: LucideIcon; label: string; value: number }>;
  pricing: {
    regular: string;
    offer: string;
    savings: string;
    savingsPercent: string;
  };
  ctaButton?: {
    label: string;
    onClick?: () => void;
  };
  offer?: boolean;
  tabs?: Array<{ label: string; content: React.ReactNode }>;
}

const featuredBadges = [
  { icon: ShieldCheck, label: "Coverage title", value: 4.3 },
  { icon: MessagesSquare, label: "Opinions", value: 4.6 },
];

const coverDetails = {
  particulars: [
    "Third party liability (included)",
    "Theft (included)",
    "Damages (included)",
  ],
  features: [
    { icon: HandCoins, label: "Best price gurantee" },
    { icon: ShieldPlus, label: "100% secue purchase" },
    { icon: CreditCard, label: "30 day money guarantee" },
  ],
};

export default function QuoteCards({
  logo,
  badges = featuredBadges,
  pricing,
  ctaButton,
  offer,
  tabs = [],
}: IQuoteCardsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card className="relative w-full rounded-[8px] pb-0">
      <div className={cn(!offer && "hidden", "absolute -top-4.5 -left-4")}>
        <Image
          src={"/img/special-offer-ribbon.png"}
          width={100}
          height={100}
          alt="Offer ribbon"
        />
      </div>
      <CardHeader>
        <div className="flex">
          <div className="w-full flex items-center justify-around">
            {logo && <img src={logo} width={100} alt="Sanlam logo" />}

            <div className="flex items-center gap-6">
              {badges.map(({ icon: Icon, label, value }, _i) => (
                <div key={_i} className="flex items-center gap-6">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="flex items-center justify-center size-11 p-2 border rounded-full">
                      <Icon className="size-6" />
                    </div>
                    <p className="text-xs font-medium">{label}</p>
                    <div className="flex items-center justify-center">
                      {Array.from({ length: Math.round(value) }).map(
                        (r, _i) => (
                          <p key={_i} className="text-yellow-400">
                            ★
                          </p>
                        )
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {value.toString()} of 5
                    </p>
                  </div>
                  {_i < badges.length - 1 && (
                    <Separator
                      orientation="vertical"
                      style={{ height: "64px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          {pricing && (
            <div className="w-full flex items-center justify-around">
              <div className="flex flex-col space-y-1 text-right">
                <p className="text-xs">
                  Regular price:{" "}
                  <span className="text-[10px] line-through decoration-red-500">
                    KES {pricing.regular}
                  </span>
                </p>
                <p className="text-sm font-bold text-primary">
                  QUANTACE Offer: KES {pricing.offer}
                </p>
                <p className="text-xs">
                  You save: KES {pricing.savings} ({pricing.savingsPercent})
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <Button size={"sm"} className="rounded-lg">
                  {ctaButton?.label ?? "Purchase online"}
                </Button>
                <Button size={"sm"} variant={"outline"} className="rounded-lg">
                  {"Broker copilot"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          // defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionContent className="flex flex-col gap-4 text-balance px-6">
              <Tabs defaultValue="summary" className="relative">
                <TabsList className="relative w-auto flex justify-start rounded-none border-b bg-transparent p-0">
                  <div className="-mt-1">
                    <TabsTrigger
                      value="summary"
                      className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                      Summary
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                      Details
                    </TabsTrigger>
                  </div>
                  <div className="absolute text-red-400 top-0 right-0">
                    Best selling option in "Quantace"
                  </div>
                </TabsList>
                <TabsContent value="summary">
                  <div className="grid grid-cols-3">
                    <div className="space-y-2 mt-3">
                      <Label
                        htmlFor="cover details"
                        className="text-muted-foreground"
                      >
                        COVER DETAILS:
                      </Label>
                      {coverDetails.particulars.map((item, _i) => (
                        <div key={_i} className="flex items-center gap-2">
                          <Check className="size-4 text-green-600" />
                          <span className="text-sm font-medium">{item}</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="text-muted-foreground size-3.5" />
                            </TooltipTrigger>
                            <TooltipContent align={"start"}>
                              <p>More info...</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ))}
                      <Button variant={"link"}>See all coverages</Button>
                      <div className="grid w-full max-w-sm items-center gap-3">
                        <Label
                          htmlFor="email"
                          className="uppercase text-muted-foreground"
                        >
                          Confirm plan type
                        </Label>
                        <Select>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select a payment plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectLabel>
                                This can be changed later
                              </SelectLabel>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="h-full flex flex-col mt-3">
                      {coverDetails.features.map(
                        ({ icon: Icon, label }, _i) => (
                          <div
                            key={_i}
                            className="flex items-center justify-start gap-2 border-b py-1"
                          >
                            <div className="border rounded-full p-2">
                              <Icon className="size-4 text-muted-foreground" />
                            </div>
                            <p className="text-sm">{label}</p>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="text-muted-foreground size-3.5" />
                              </TooltipTrigger>
                              <TooltipContent align={"start"}>
                                <p>More info...</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )
                      )}

                      <div className="flex items-center justify-start mt-auto gap-2">
                        Pay at 3, 6 and 12 MSI with
                        <Icons.masterCard className="size-6" />
                        <Icons.visa className="size-8" />
                        <Icons.mpesa className="size-10" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex gap-2">
                        <Icons.isoStamp className="size-24" />
                        <Icons.isoStamp2 className="size-24" />
                      </div>
                      <Button variant={"link"}>View Certification</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="details">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </AccordionContent>
            <AccordionTrigger className="flex items-center justify-center border-t"></AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
