import dotenv from "dotenv";
const { env } = process;
dotenv.config();

export default {
    DB_NAME: env.DB_NAME,
    DB_USERNAME: env.DB_USERNAME,
    DB_PASSWORD: env.DB_PASSWORD,
    PG_CONNECTION_STRING: env.PG_CONNECTION_STRING,
    JWT_SECRET: env.JWT_SECRET
}
