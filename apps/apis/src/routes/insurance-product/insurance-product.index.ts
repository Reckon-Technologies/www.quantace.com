import { createRouter } from "@/lib/create-app";

import * as handlers from "./insurance-product.handlers.js";
import * as routes from "./insurance-product.routes.js";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
