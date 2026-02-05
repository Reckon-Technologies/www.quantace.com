import { handle } from "@hono/node-server/vercel";

// eslint-disable-next-line antfu/no-import-dist
import app from "../dist/src/app.js";

export default handle(app);
