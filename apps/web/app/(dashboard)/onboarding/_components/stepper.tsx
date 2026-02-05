import { cn } from "@workspace/ui/lib/utils";

interface StepperProgressProps {
  step: number;
  totalSteps: number;
}

export function StepperProgress({ step, totalSteps }: StepperProgressProps) {
  const isComplete = step === totalSteps - 1;

  return (
    <div className="absolute top-5 w-[98vw]">
      <div className="relative flex items-center">
        <div id="lead-div" className={cn("w-1/4 h-0.5 bg-primary")} />

        <div
          id="stepper-logic-div"
          className="w-1/2 flex items-center justify-center"
        >
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                  index === step
                    ? "bg-primary"
                    : index < step
                      ? "bg-primary"
                      : "bg-primary/30"
                )}
              />
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "w-64 h-0.5",
                    index < step ? "bg-primary" : "bg-primary/30"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div
          id="trailing-div"
          className={cn(
            "w-1/4 h-0.5 transition-colors duration-300",
            isComplete ? "bg-primary" : "bg-primary/30"
          )}
        />
      </div>
    </div>
  );
}
