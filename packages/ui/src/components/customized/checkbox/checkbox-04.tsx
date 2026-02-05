import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";

type CheckboxGroupOption = {
  name: string;
  label: string;
};

interface ICheckboxHorizontalGroupDemo {
  label: string;
  options: CheckboxGroupOption[];
}

export default function CheckboxHorizontalGroupDemo({
  label,
  options,
}: ICheckboxHorizontalGroupDemo) {
  return (
    <div>
      <Label className="font-semibold">{label}</Label>
      <div className="mt-4 flex items-center gap-4 flex-wrap">
        {options.map(({ name, label }) => (
          <div key={name} className="flex items-center gap-2">
            <Checkbox id={name} />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
