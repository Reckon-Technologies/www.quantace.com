"use client";

import { authClient } from "@/lib/auth/auth-client";
import { BetterAuthActionButton } from "@workspace/ui/components/better-auth-action-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { FieldDescription } from "@workspace/ui/components/field";
import { Icons } from "@workspace/ui/components/icons";
import { useSearchParams } from "next/navigation";
import * as React from "react";

type IVerifyEmailPageProps = object;

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { sendVerificationEmail } = authClient;

  const [timeToNextResend, setTimeToNextResend] = React.useState(30);
  const interval = React.useRef<NodeJS.Timeout>(undefined);

  React.useEffect(() => {
    startEmailVerificationCountdown();
  }, []);

  function startEmailVerificationCountdown(time = 30) {
    setTimeToNextResend(time);

    clearInterval(interval.current);
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
              <CardTitle className="text-xl">Verify email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mt-2">
                We sent you a verification link. Please check your email and
                click the link to verify your account.
              </p>

              <BetterAuthActionButton
                variant={"outline"}
                className="w-full"
                successMessage="Verification email sent!"
                disabled={timeToNextResend > 0}
                action={async () => {
                  startEmailVerificationCountdown();
                  return sendVerificationEmail({
                    email,
                    callbackURL: "/dashboard",
                  });
                }}
              >
                {timeToNextResend > 0
                  ? `Resend email in ${timeToNextResend}s`
                  : "Resend verification email"}
              </BetterAuthActionButton>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage(_props: IVerifyEmailPageProps) {
  return (
    <React.Suspense fallback={
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </React.Suspense>
  );
}

// "use client";

// import { authClient } from "@/lib/auth/auth-client";
// import { BetterAuthActionButton } from "@workspace/ui/components/better-auth-action-button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@workspace/ui/components/card";
// import { FieldDescription } from "@workspace/ui/components/field";
// import { Icons } from "@workspace/ui/components/icons";
// import { useSearchParams } from "next/navigation";
// import * as React from "react";

// type IVerifyEmailPageProps = object;

// export default function VerifyEmailPage(_props: IVerifyEmailPageProps) {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email") || "";

//   const { sendVerificationEmail } = authClient;

//   const [timeToNextResend, setTimeToNextResend] = React.useState(30);
//   const interval = React.useRef<NodeJS.Timeout>(undefined);

//   React.useEffect(() => {
//     startEmailVerificationCountdown();
//   }, []);

//   function startEmailVerificationCountdown(time = 30) {
//     setTimeToNextResend(time);

//     clearInterval(interval.current);
//     interval.current = setInterval(() => {
//       setTimeToNextResend((t) => {
//         const newT = t - 1;

//         if (newT <= 0) {
//           clearInterval(interval.current);
//           return 0;
//         }
//         return newT;
//       });
//     }, 1000);
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
//           <Card>
//             <CardHeader className="text-center">
//               <CardTitle className="text-xl">Verify email</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <p className="text-sm text-muted-foreground mt-2">
//                 We sent you a verification link. Please check your email and
//                 click the link to verify your account.
//               </p>

//               <BetterAuthActionButton
//                 variant={"outline"}
//                 className="w-full"
//                 successMessage="Verification email sent!"
//                 disabled={timeToNextResend > 0}
//                 action={async () => {
//                   startEmailVerificationCountdown();
//                   return sendVerificationEmail({
//                     email,
//                     callbackURL: "/dashboard",
//                   });
//                 }}
//               >
//                 {timeToNextResend > 0
//                   ? `Resend email in ${timeToNextResend}s`
//                   : "Resend verification email"}
//               </BetterAuthActionButton>
//             </CardContent>
//           </Card>
//           <FieldDescription className="px-6 text-center">
//             By clicking continue, you agree to our{" "}
//             <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
//           </FieldDescription>
//         </div>
//       </div>
//     </div>
//   );
// }
