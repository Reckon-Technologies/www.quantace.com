"use client";

import { ActionButton } from "@workspace/ui/components/action-button";
import * as React from "react";

export interface IBetterAuthActionButtonProps {}

export function BetterAuthActionButton({
  action,
  successMessage,
  ...props
}: Omit<React.ComponentProps<typeof ActionButton>, "action"> & {
  action: () => Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
}) {
  return (
    <ActionButton
      {...props}
      action={async () => {
        const res = await action();

        if (res.error) {
          return { error: true, message: res.error.message || "Action failed" };
        } else {
          return { error: false, message: successMessage };
        }
      }}
    />
  );
}
