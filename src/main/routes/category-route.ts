import { makeGetCategoriesByUserId } from "./../factories/make-get-categories-by-user-id-controller";
import { makePersisteNewCategoryController } from "./../factories/make-persist-new-category-controller";
import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes-adapter";

export default (app: Router) => {
  app.post("/new-category", adaptRoute(makePersisteNewCategoryController()));
  app.get("/get-categories/:userId", adaptRoute(makeGetCategoriesByUserId()));
};
