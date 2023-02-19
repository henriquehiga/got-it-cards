import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { makePersistNewFlashCardController } from "../factories/make-persist-new-flash-card-controller";

export default (app: Router) => {
  app.post("/new-flash-card", adaptRoute(makePersistNewFlashCardController()));
};
