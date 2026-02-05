"use client";
import { Calendar, FileText, Shield, Users } from "lucide-react";

interface PolicyholderProfileProps {
  memberName: string;
  memberId: string;
  policyNumber: string;
  dateOfBirth: string;
  coverageType: string;
  dependents: number;
  policyStartDate: string;
  policyEndDate: string;
  status: "active" | "inactive" | "pending";
}

export function PolicyholderProfileCard({
  memberName,
  memberId,
  policyNumber,
  dateOfBirth,
  coverageType,
  dependents,
  policyStartDate,
  policyEndDate,
  status = "active",
}: PolicyholderProfileProps) {
  const statusConfig = {
    active: {
      bg: "bg-emerald-50 dark:bg-emerald-950",
      text: "text-emerald-700 dark:text-emerald-200",
      badge: "bg-emerald-100 dark:bg-emerald-900",
    },
    inactive: {
      bg: "bg-slate-50 dark:bg-slate-950",
      text: "text-slate-700 dark:text-slate-200",
      badge: "bg-slate-100 dark:bg-slate-900",
    },
    pending: {
      bg: "bg-amber-50 dark:bg-amber-950",
      text: "text-amber-700 dark:text-amber-200",
      badge: "bg-amber-100 dark:bg-amber-900",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        {/* Header with status */}
        <div
          className={`${config.bg} px-6 py-5 border-b border-border flex items-start justify-between`}
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="bg-primary rounded-full p-3">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-card-foreground">
                {memberName}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Member ID: {memberId}
              </p>
            </div>
          </div>
          <div
            className={`${config.badge} ${config.text} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Policy Information Section */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Policy Information
            </h3>
            <div className="space-y-3 ml-6">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">
                  Policy Number
                </span>
                <span className="font-mono font-semibold text-card-foreground">
                  {policyNumber}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">
                  Coverage Type
                </span>
                <span className="text-sm font-medium text-primary">
                  {coverageType}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Personal Information
            </h3>
            <div className="space-y-3 ml-6">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">
                  Date of Birth
                </span>
                <span className="text-sm font-medium text-card-foreground">
                  {dateOfBirth}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">
                  Dependents
                </span>
                <span className="text-sm font-semibold text-primary">
                  {dependents}
                </span>
              </div>
            </div>
          </div>

          {/* Coverage Period Section */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Coverage Period
            </h3>
            <div className="space-y-3 ml-6">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">
                  Start Date
                </span>
                <span className="text-sm font-medium text-card-foreground">
                  {policyStartDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">End Date</span>
                <span className="text-sm font-medium text-card-foreground">
                  {policyEndDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Area */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex gap-3">
          <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            View Full Details
          </button>
          <button className="flex-1 px-4 py-2 border border-border text-card-foreground rounded-md text-sm font-medium hover:bg-muted/50 transition-colors">
            Download Card
          </button>
        </div>
      </div>
    </div>
  );
}
