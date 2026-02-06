import { env } from "@/env";
import type { auth } from "apis/auth";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_URL,
    plugins: []
});

export type Session = typeof authClient.$Infer.Session;

export type User = typeof authClient.$Infer.Session.user;