import { Icons } from "@workspace/ui/components/icons";
import { cn } from "@workspace/ui/lib/utils";
import { CircleCheck } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

type RadioGroupOption = {
  value: string;
  label: string;
  description?: string;
  iconColor: string;
};

interface IRadioCardsGroup {
  options: RadioGroupOption[];
  onChange: (value: string) => void;
  value?: string;
}

const RadioCardsGroup = ({ options, onChange, value }: IRadioCardsGroup) => {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      className="w-full grid grid-cols-4 gap-4"
      onValueChange={onChange}
    >
      {options.map(({ label, value, description, iconColor }) => (
        <RadioGroupPrimitive.Item
          key={value}
          value={value}
          className={cn(
            "relative group ring-[1px] ring-border rounded py-2 px-3 text-start",
            "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
          )}
        >
          <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white group-data-[state=unchecked]:hidden" />

          <Icons.circleStar
            className={cn("mb-2.5 text-muted-foreground", value && iconColor)}
          />
          <span className="font-medium tracking-tight">{label}</span>
          <p className="text-xs">{description}</p>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

export default RadioCardsGroup;
