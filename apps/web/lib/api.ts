import type { AppType } from "apis";
import { hc } from "hono/client";

export const client = hc<AppType>("/api", {
  init: {
    credentials: "include",
  },
});
