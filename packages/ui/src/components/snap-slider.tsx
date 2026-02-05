"use client";

import { Slider } from "@workspace/ui/components/slider";
import { useState } from "react";

interface SnapSliderProps {
  id: string;
  snapValues: number[];
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export function SnapSlider({
  id,
  snapValues,
  defaultValue,
  onChange,
}: SnapSliderProps) {
  const [value, setValue] = useState(defaultValue || snapValues[0]);

  const handleChange = (newValue: number[]) => {
    const sliderValue = newValue[0];

    // Find the closest snap value
    const closest = snapValues.reduce((prev, curr) => {
      return Math.abs(curr - sliderValue!) < Math.abs(prev - sliderValue!)
        ? curr
        : prev;
    });

    setValue(closest);
    onChange?.(closest);
  };

  return (
    <div className="space-y-4">
      <div className="text-start">
        <p className="text-xs font-semibold text-foreground">KES {value}</p>
      </div>
      <Slider
        id={id}
        value={[value!]}
        onValueChange={handleChange}
        min={Math.min(...snapValues)}
        max={Math.max(...snapValues)}
        step={1}
        className="w-full"
      />
    </div>
  );
}
