import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { makeRegisterUserController } from "../factories/make-register-user-controller";
import { makeLoginUserController } from "../factories/make-login-user-controller";

export default (app: Router) => {
  app.post("/register-user", adaptRoute(makeRegisterUserController()));
  app.post("/login-user", adaptRoute(makeLoginUserController()));
};
