import { setupApp } from "./configs/setup-app";
import { ENV_PORT } from "./configs/setup-env";

(async () => {
  const app = await setupApp();
  app.listen(ENV_PORT, () =>
    console.log("Server running on port: " + ENV_PORT)
  );
})();
