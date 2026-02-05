"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createAuthClient } from "@workspace/auth/client";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Icons } from "@workspace/ui/components/icons";
import { Input } from "@workspace/ui/components/input";
import { LoadingSwap } from "@workspace/ui/components/loading-swap";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Suspense } from "react";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export interface IResetPasswordProps {}

// Create a separate component that uses useSearchParams
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { resetPassword } = createAuthClient();

  async function handleResetPassword(data: ResetPasswordForm) {
    if (!token) return;

    await resetPassword(
      { newPassword: data.password, token },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to reset password");
        },
        onSuccess: () => {
          toast.success("Password reset successfully", {
            description: "Redirecting to login...",
          });
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {token == null || error != null ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Reset Password</CardTitle>
            <CardDescription>
              Invalid or expired token. Please request a new password reset.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href={"/login"}>Return to login</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mt-2">
              Enter your new password below to reset your password.
            </p>

            <form onSubmit={form.handleSubmit(handleResetPassword)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">New password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    required
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    required
                    {...form.register("confirmPassword")}
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <Button type="submit" disabled={isSubmitting}>
                    <LoadingSwap isLoading={isSubmitting}>
                      Reset Password
                    </LoadingSwap>
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ResetPassword(props: IResetPasswordProps) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Icons.logo className="size-4" />
          </div>
          Quantace
        </a>
        
        <Suspense fallback={
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Loading...</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        }>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { createAuthClient } from "@workspace/auth/client";
// import { Button } from "@workspace/ui/components/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@workspace/ui/components/card";
// import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
// import { Icons } from "@workspace/ui/components/icons";
// import { Input } from "@workspace/ui/components/input";
// import { LoadingSwap } from "@workspace/ui/components/loading-swap";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import z from "zod";

// const resetPasswordSchema = z
//   .object({
//     password: z.string().min(6, "Password must be at least 6 characters long"),
//     confirmPassword: z
//       .string()
//       .min(6, "Password must be at least 6 characters long"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"], // This shows the error on the confirmPassword field
//   });

// type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

// export interface IResetPasswordProps {}

// export default function ResetPassword(props: IResetPasswordProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const error = searchParams.get("error");

//   const form = useForm<ResetPasswordForm>({
//     resolver: zodResolver(resetPasswordSchema),
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const { isSubmitting } = form.formState;

//   const { resetPassword } = createAuthClient();

//   async function handleResetPassword(data: ResetPasswordForm) {
//     if (!token) return;

//     await resetPassword(
//       { newPassword: data.password, token },
//       {
//         onError: (error) => {
//           toast.error(error.error.message || "Failed to reset password");
//         },
//         onSuccess: () => {
//           toast.success("Password reset successfully", {
//             description: "Redirecting to login...",
//           });
//           setTimeout(() => {
//             router.push("/login");
//           }, 2000);
//         },
//       }
//     );
//   }

//   return (
//     <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
//       <div className="flex w-full max-w-sm flex-col gap-6">
//         <a href="#" className="flex items-center gap-2 self-center font-medium">
//           <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
//             <Icons.logo className="size-4" />
//           </div>
//           Quantace
//         </a>

//         <div className="flex flex-col gap-6">
//           {token == null || error != null ? (
//             <Card>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-xl">Reset Password</CardTitle>
//                 <CardDescription>
//                   Invalid or expired token. Please request a new password reset.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Button asChild className="w-full">
//                   <Link href={"/login"}>Return to login</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-xl">Reset Password</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Enter your new password below to reset your password.
//                 </p>

//                 <form onSubmit={form.handleSubmit(handleResetPassword)}>
//                   <FieldGroup>
//                     <Field>
//                       <FieldLabel htmlFor="password">New password</FieldLabel>
//                       <Input
//                         id="password"
//                         type="password" // Fixed: was "password"
//                         placeholder="Enter your new password"
//                         required
//                         {...form.register("password")}
//                       />
//                       {form.formState.errors.password && (
//                         <p className="text-xs text-red-500">
//                           {form.formState.errors.password.message}
//                         </p>
//                       )}
//                     </Field>
//                     <Field>
//                       <FieldLabel htmlFor="confirmPassword">
//                         Confirm password
//                       </FieldLabel>
//                       <Input
//                         id="confirmPassword"
//                         type="password" // Fixed: was "confirmPassword" - should be "password"
//                         placeholder="Confirm your new password"
//                         required
//                         {...form.register("confirmPassword")}
//                       />
//                       {form.formState.errors.confirmPassword && (
//                         <p className="text-xs text-red-500">
//                           {form.formState.errors.confirmPassword.message}
//                         </p>
//                       )}
//                     </Field>
//                     <Field>
//                       <Button type="submit" disabled={isSubmitting}>
//                         <LoadingSwap isLoading={isSubmitting}>
//                           Reset Password
//                         </LoadingSwap>
//                       </Button>
//                     </Field>
//                   </FieldGroup>
//                 </form>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
