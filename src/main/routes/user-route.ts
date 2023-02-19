import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { makeRegisterUserController } from "../factories/make-register-user-controller";

export default (app: Router) => {
  app.post("/register-user", adaptRoute(makeRegisterUserController()));
};
