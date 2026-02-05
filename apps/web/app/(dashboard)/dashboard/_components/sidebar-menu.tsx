import { Button } from "@workspace/ui/components/button";
import { ButtonRadioGroup } from "@workspace/ui/components/button-radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import { SnapSlider } from "@workspace/ui/components/snap-slider";
import { Switch } from "@workspace/ui/components/switch";
import { FileText, Hash, User } from "lucide-react";
import SidebarCard from "./sidebar-cards";

export interface ISidebarMenuProps {}

export default function SidebarMenu(props: ISidebarMenuProps) {
  return (
    <div className="h-full space-y-4 w-full">
      <Card className="bg-gradient-to-br from-[#013797] from-0% via-[#00A6ED] via-[99%] to-[#0050CD] to-100% rounded-xl">
        <CardHeader className="border-b [.border-b]:pb-3">
          <CardTitle className="text-white">
            <div className="flex items-center justify-between">
              About policyholder
              <Button
                size={"sm"}
                variant={"ghost"}
                className="text-white cursor-pointer"
              >
                View All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col lg:flex-row items-start justify-between">
            {/* Personal Information Section */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-sm font-semibold text-white capitalize tracking-wide mb-4 flex flex-col items-center gap-2">
                <User className="w-4 h-4" />
                John Doe
              </h3>
              <h3 className="text-sm font-semibold text-white capitalize tracking-wide mb-4 flex flex-col items-center gap-2">
                <Hash className="w-4 h-4" />
                QA_WER324
              </h3>
            </div>
            {/* Policy Information Section */}
            <div className="bg-[#CCFBF1]/30 border-white/15 flex flex-col gap-6 rounded-lg border p-3 shadow-sm">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wide mb-0 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Policy Information
              </h3>
              <div className="space-y-1 ml-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-white/90">
                    Policyholder Age
                  </span>
                  <span className="font-mono text-xs font-semibold text-white">
                    48
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-white/90">Coverage Type</span>
                  <span className="text-xs font-medium text-white">Family</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-white/90">Dependents</span>
                  <span className="text-xs font-semibold text-white">3</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-white/90">Policy duration</span>
                  <span className="text-xs font-medium text-white">
                    12 Months
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <SidebarCard
        title="About the package"
        description="Coverage levels"
        helpText="Depending on the value of the policy."
      >
        <ButtonRadioGroup
          options={[
            { value: "ample", label: "Ample" },
            { value: "limited", label: "Limited" },
            { value: "rc", label: "RC" },
          ]}
          defaultValue="limited"
          onChange={() => {}}
          className="w-full"
        />
        <div className="grid w-full max-w-sm items-center gap-3 mt-3">
          <Label
            htmlFor="in-patient"
            className="text-xs uppercase text-muted-foreground"
          >
            in-patient
          </Label>
          <SnapSlider
            id="in-patient"
            snapValues={[50000, 100000, 150000, 200000, 300000, 400000, 50000]}
            defaultValue={200000}
            onChange={() => {}}
          />
          <Label
            htmlFor="in-patient"
            className="text-xs uppercase text-muted-foreground"
          >
            out-patient
          </Label>
          <SnapSlider
            id="in-patient"
            snapValues={[
              25000, 50000, 100000, 150000, 200000, 300000, 400000, 50000,
            ]}
            defaultValue={50000}
            onChange={() => {}}
          />
        </div>
        <div className="flex items-center justify-between space-x-2 mt-6">
          <Label htmlFor="airplane-mode">Road Assistance</Label>
          <Switch id="airplane-mode" />
        </div>
        <div className="flex items-center justify-between space-x-2 mt-4">
          <Label htmlFor="airplane-mode">Medical Assistance</Label>
          <Switch id="airplane-mode" />
        </div>
      </SidebarCard>
    </div>
  );
}
