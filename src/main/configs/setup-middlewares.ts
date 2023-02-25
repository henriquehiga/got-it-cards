import cors from "cors";
import Express, { json } from "express";
import validateTokenMiddleware from "./validate-token-middleware";

export const setupMiddlewares = (app: Express.Application) => {
  app.use(json());
  app.use(
    cors({
      origin: [
        "https://got-it-cards-front.vercel.app",
        "http://localhost:5173",
      ],
    })
  );
  app.use((req, res, next) => {
    validateTokenMiddleware(req, res, next);
  });
  return app;
};
