import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";

const router = createRouter().all("/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

export default router;
