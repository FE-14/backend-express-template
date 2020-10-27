import { Sequelize } from "sequelize";
import postgres_config from "../config/postgres.config.json";

const loadConfig = postgres_config;

export const sequelize_postgres = new Sequelize(
	loadConfig.development.database,
	loadConfig.development.username,
	loadConfig.development.password,
	{
		dialect: "postgres",
		host: loadConfig.development.host
	}
);