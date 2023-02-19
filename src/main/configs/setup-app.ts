import express, { Express } from "express";
import { setupMiddlewares } from "./setup-middlewares";
import { ENV_PORT } from "./setup-env";
import setupRoutes from "./setup-routes";

export const setupApp = async (): Promise<Express> => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  app.listen(ENV_PORT, () =>
    console.log("Server running on port: " + ENV_PORT)
  );
  return app;
};
