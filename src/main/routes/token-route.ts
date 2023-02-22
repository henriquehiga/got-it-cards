import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { ValidateTokenController } from "../../presentations/controllers/validate-token-controller";

export default (app: Router) => {
  app.post("/validate-token", adaptRoute(new ValidateTokenController()));
};
