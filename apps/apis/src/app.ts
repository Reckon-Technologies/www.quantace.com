import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import insuranceCategories from "@/routes/insurance-category/insurance-category.index";
import insuranceProducts from "@/routes/insurance-product/insurance-product.index";
import userProfile from "@/routes/user-profile/user-profile.index";

const app = createApp();

configureOpenAPI(app);

const routes = [
  index,
  insuranceCategories,
  insuranceProducts,
  userProfile,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
