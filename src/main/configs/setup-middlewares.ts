import cors from "cors";
import Express, { json } from "express";
import validateTokenMiddleware from "./validate-token-middleware";

export const setupMiddlewares = (app: Express.Application) => {
  app.use(json());
  app.use(cors());
  app.use((req, res, next) => {
    res.set(
      "Access-Control-Allow-Origin",
      "https://got-it-cards-front.vercel.app/"
    );
    validateTokenMiddleware(req, res, next);
  });
  return app;
};
