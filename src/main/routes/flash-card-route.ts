import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { makeGetFlashCardsByCategoryController } from "../factories/make-get-flash-cards-by-category-controller";
import { makePersistNewFlashCardController } from "../factories/make-persist-new-flash-card-controller";
import { makeGetFlashCardsByUserIdController } from "./../factories/make-get-flash-cards-by-user-id-controller";

export default (app: Router) => {
  app.post("/new-flash-card", adaptRoute(makePersistNewFlashCardController()));
  app.get(
    "/get-flash-cards/:userId",
    adaptRoute(makeGetFlashCardsByUserIdController())
  );
  app.get(
    "/get-flash-cards-by-category/:category",
    adaptRoute(makeGetFlashCardsByCategoryController())
  );
};
