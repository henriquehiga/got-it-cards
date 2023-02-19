import Express, { json } from "express";
import cors from "cors";

export const setupMiddlewares = (app: Express.Application) => {
  app.use(json());
  app.use(cors());
  return app;
};
