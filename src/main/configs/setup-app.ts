import express from "express";
import { setupMiddlewares } from "./setup-app-middlewares-config";
import { ENV_PORT } from "./env-config";

export const setupApp = () => {
  const app = express();
  setupMiddlewares(app);
  app.listen(ENV_PORT, () =>
    console.log("Server running on port: " + ENV_PORT)
  );
  return app;
};
