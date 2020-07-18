import { Sequelize } from "sequelize";
import * as configDb from "../config/database";
import { User } from "./user.model";
import { Project } from "./project.model";

/**
 * Sequelize setup
 * TODO fix node env implementation
 */
const nodeEnv: string = process.env.NODE_ENV || "development";
const loadConfig = configDb.development;
export const sequelize = new Sequelize(
	loadConfig.database,
	loadConfig.username,
	loadConfig.password,
	loadConfig
);

/**
 * Import All Model
 */

const models = [User, Project];

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
 * TODO this file use load and init all models
 */
export * from "./user.model";
export * from "./project.model";
