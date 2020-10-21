import { Sequelize, Options } from "sequelize";
import config from "../config/database.json";
import { User } from "./user.model";

const loadConfig = config;

const sequelize = new Sequelize(
	loadConfig.development.database,
	loadConfig.development.username,
	loadConfig.development.password,
	{
		dialect: "postgres",
		host: loadConfig.development.host
	}
);

const models = [User];

const startModel = () => {
	models.forEach((model) => {
		model.modelInit(sequelize);
	});

	models.forEach((model) => {
		model.setAssociation();
	});
};

export { sequelize, startModel, User }