"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

interface ButtonRadioGroupProps {
  options: Array<{
    value: string;
    label: string;
  }>;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon" | null | undefined;
}

export function ButtonRadioGroup({
  options,
  defaultValue,
  onChange,
  className,
  size = "sm",
}: ButtonRadioGroupProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div
      className={cn(
        "inline-flex border border-border rounded-lg overflow-hidden",
        className
      )}
    >
      {options.map((option, index) => (
        <Button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          size={size}
          className={cn(
            "px-4 py-2 font-medium transition-all duration-200 flex-1",
            index !== options.length - 1 && "border-r border-border",
            selected === option.value
              ? "bg-primary text-primary-foreground"
              : "bg-background text-foreground hover:bg-muted"
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
