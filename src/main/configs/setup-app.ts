import express, { Express } from "express";
import { setupMiddlewares } from "./setup-middlewares";
import setupRoutes from "./setup-routes";

export const setupApp = async (): Promise<Express> => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};
