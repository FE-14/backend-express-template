import { Sequelize } from "sequelize";
import * as configDb from "../config/database";

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
 * Export file to make import path more clean
 * TODO this file use load and init all models
 */
export * from "./user.model";
export * from "./project.model";
