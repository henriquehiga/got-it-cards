import Express from "express";
import { parserJson } from "../adapters/middlewares/parser";

export const setupMiddlewares = (app: Express.Application) => {
  app.use(parserJson());
  return app;
};
