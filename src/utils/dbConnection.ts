import { Sequelize, Options } from "sequelize";
import config from "../config/database.json";

const loadConfig = config;

export const sequelize_postgres = new Sequelize(
	loadConfig.development.database,
	loadConfig.development.username,
	loadConfig.development.password,
	{
		dialect: "postgres",
		host: loadConfig.development.host
	}
);