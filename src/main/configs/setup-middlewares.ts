import Express, { json } from "express";
import cors from "cors";
import validateTokenMiddleware from "./validate-token-middleware";

export const setupMiddlewares = (app: Express.Application) => {
  app.use(json());
  app.use(cors());
  app.use((req, res, next) => {
    validateTokenMiddleware(req, res, next);
  });
  return app;
};
