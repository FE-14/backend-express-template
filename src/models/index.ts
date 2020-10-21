import { Sequelize, Options } from "sequelize";
import config from "../config/database.json";
import { User } from "./user.model";

/**
 * Sequelize setup
 * TODO fix node env implementation
 */
const loadConfig = config;
export const sequelize = new Sequelize(
	loadConfig.development.database,
	loadConfig.development.username,
	loadConfig.development.password,
	{
		dialect: "postgres",
		host: loadConfig.development.host
	}
);

/**
 * Import All Model
 */

const models = [User];

/**
 * Initialize all model
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const startModel = async () => {
	await models.forEach((model) => {
		model.modelInit(sequelize);
	});
	await models.forEach((model) => {
		model.setAssociation();
	});
};

/**
 * Export file to make import path more clean
 */
export * from "./user.model";
