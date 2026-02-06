/* eslint-disable node/no-process-env */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
  },
  client: {
    NEXT_PUBLIC_URL: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  onValidationError: (issues) => {
    console.error(
      "❌ Invalid environment variables:",
      issues.map(i => i.path).flat(),
    );
    process.exit(1);
  },
  emptyStringAsUndefined: true,
//   experimental__runtimeEnv: process.env,
});