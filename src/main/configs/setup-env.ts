import { config } from "dotenv";
config();
export const ENV_PORT = process.env.PORT ?? 4501;
export const ENV_DB_HOST = process.env.DB_HOST;
export const ENV_DB_PORT = parseInt(process.env.DB_PORT ?? "5432");
export const ENV_DB_NAME = process.env.DB_NAME;
export const ENV_DB_USER = process.env.DB_USER;
export const ENV_DB_PASS = process.env.DB_PASS;
export const ENV_ENCRYPT_KEY = process.env.ENCRYPT_KEY ?? "key";
