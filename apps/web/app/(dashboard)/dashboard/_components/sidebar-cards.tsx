import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { cn } from "@workspace/ui/lib/utils";
import { HelpCircle } from "lucide-react";
import * as React from "react";

export interface ISidebarCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  helpText?: string;
  className?: string;
}

export default function SidebarCard({
  children,
  title,
  description,
  helpText,
  className,
}: ISidebarCardProps) {
  return (
    <Card className={cn("px-3 py-4 rounded-sm", className)}>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline cursor-pointer">
            {title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <CardContent className="px-0">
              <Label
                htmlFor="age"
                className="text-xs uppercase text-muted-foreground mb-3"
              >
                {description}
                {helpText && (
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle size={14} />
                    </TooltipTrigger>
                    <TooltipContent align={"start"}>
                      <p>{helpText}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </Label>
              {children}
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
