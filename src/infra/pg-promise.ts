import {
  ENV_DB_HOST,
  ENV_DB_PORT,
  ENV_DB_NAME,
  ENV_DB_USER,
  ENV_DB_PASS,
} from "./../main/configs/setup-env";
import pgPromise from "pg-promise";
const pgp = pgPromise();
const config = {
  host: ENV_DB_HOST,
  port: ENV_DB_PORT,
  database: ENV_DB_NAME,
  user: ENV_DB_USER,
  password: ENV_DB_PASS,
};
export const db = pgp(config);
