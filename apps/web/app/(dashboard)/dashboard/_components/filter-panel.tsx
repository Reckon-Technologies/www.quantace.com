import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { BadgeCent } from "lucide-react";

export interface IFilterPanelProps {}

export default function FilterPanel(props: IFilterPanelProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 py-2.5">
      <div className="flex items-center justify-center gap-2">
        <p className="font-medium text-sm">Sort by:</p>
        <Select defaultValue={"best-price"}>
          <SelectTrigger size={"sm"} className="w-32 bg-background">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="best-price">Best price</SelectItem>
              <SelectItem value="ratings">Ratings</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Offers */}
        <div className="flex items-center justify-center gap-1 ml-2">
          <BadgeCent size={14} className="text-blue-600" />
          <p className="text-xs">
            This offer will expire in:{" "}
            <span className="text-blue-600 font-semibold">24 : 50 : 22</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <p className="font-medium text-sm">Visualize as:</p>
        <div className="flex items-center justify-center border bg-background gap-2 p-2">
          <div className="flex items-center gap-2">
            <Checkbox className="rounded-none" id="terms" />
            <Label htmlFor="terms">Best price</Label>
          </div>
          <Separator orientation="vertical" style={{ height: "16px" }} />
          <div className="flex items-center gap-2">
            <Checkbox className="rounded-none" id="terms" />
            <Label htmlFor="terms">Compare</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
