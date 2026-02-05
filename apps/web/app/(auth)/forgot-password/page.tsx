"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createAuthClient } from "@workspace/auth/client";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Icons } from "@workspace/ui/components/icons";
import { Input } from "@workspace/ui/components/input";
import { LoadingSwap } from "@workspace/ui/components/loading-swap";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const forgotPaswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPaswordFormSchema>;

type ILoginPageProps = object;

export default function LoginPage(_props: ILoginPageProps) {
  const { requestPasswordReset } = createAuthClient();

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPaswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const [timeToNextResend, setTimeToNextResend] = React.useState(30);
  const interval = React.useRef<NodeJS.Timeout>(undefined);

  React.useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  function startEmailVerificationCountdown(time = 30) {
    setTimeToNextResend(time);

    if (interval.current) {
      clearTimeout(interval.current);
    }
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;

        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  async function handleForgotPassword(data: ForgotPasswordForm) {
    await requestPasswordReset(
      { ...data, redirectTo: "/reset-password" },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to send reset email");
        },
        onSuccess: () => {
          toast.success("Password reset email sent! Please check your inbox.");

          // Start countdown to resend email
          startEmailVerificationCountdown();
        },
      }
    );
    startEmailVerificationCountdown();
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Icons.logo className="size-4" />
          </div>
          Quantace
        </a>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mt-2">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <form onSubmit={form.handleSubmit(handleForgotPassword)}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      disabled={isSubmitting || timeToNextResend > 0}
                    >
                      <LoadingSwap isLoading={isSubmitting}>
                        {timeToNextResend > 0
                          ? `Resend email in ${timeToNextResend}s`
                          : "Send Reset Email"}
                      </LoadingSwap>
                    </Button>
                    <Button
                      asChild
                      type="button"
                      variant="link"
                      className="px-0"
                    >
                      <a href="/login">Remembered your password? Log in</a>
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
