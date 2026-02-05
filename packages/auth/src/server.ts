import { db } from "@workspace/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { sendEmailVerificationEmail } from "./lib/email-verification";
import { sendPasswordResetEmail } from "./lib/password-reset-email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [nextCookies()],
  session: {
    cookie: {
      sameSite: "lax", // or "none" if using HTTPS
      secure: process.env.NODE_ENV === "production",
      domain: "localhost", // Important for cross-port requests
    },
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 min
    },
  },
  pages: {
    signIn: "/login",
  },
  trustedOrigins:
    process.env.NODE_ENV === "production"
      ? [process.env.NEXT_APP_URL].filter((url): url is string => Boolean(url))
      : [
          "https://localhost:3000",
          "https://localhost:3001",
          "http://localhost:3001",
          "http://localhost:3002",
          "http://localhost:3003",
          "https://192.168.100.22:3000",
        ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({ user, url });
    },
  },
  emailVerification: {
    enabled: true,
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailVerificationEmail({ user, url });
    },
  },
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});

export type Auth = ReturnType<typeof betterAuth>;
export type Session = Auth["$Infer"]["Session"];
