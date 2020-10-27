import { Sequelize } from "sequelize";
import postgres_config from "../config/postgres.config.json";
import mongo_config from '../config/mongo.config.json'

const sequelize_postgres = new Sequelize(
	postgres_config.development.database,
	postgres_config.development.username,
	postgres_config.development.password,
	{
		dialect: "postgres",
		host: postgres_config.development.host
	}
);

const mongo_credential = {
	username: mongo_config.development.username,
	password: mongo_config.development.password,
	database: mongo_config.development.database,
	host: mongo_config.development.host
}

const mongoose_mongo_url = `mongodb://${mongo_credential.username}:${mongo_credential.password}@${mongo_credential.host}:27017/${mongo_credential.database}?authSource=admin`

export { sequelize_postgres, mongoose_mongo_url }
