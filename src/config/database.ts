import { Options } from "sequelize";
import { envConfig } from "../utils";

const {
	DB_USERNAME,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	DB_DIALECT,
} = envConfig;

export const development: Options = {
	username: DB_USERNAME,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: +DB_PORT,
	database: DB_NAME,
	dialect: DB_DIALECT ? "postgres" : "postgres",
};
