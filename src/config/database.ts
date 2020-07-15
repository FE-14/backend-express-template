import { Options } from "sequelize";

const development: Options = {
	username: process.env.DB_USERNAME || "lanius",
	password: process.env.DB_PASSWORD || "lanius",
	host: process.env.DB_HOST || "localhost",
	port: +(process.env.DB_PORT || 54321),
	database: process.env.DB_NAME || "esim_database",
	dialect: process.env.DB_DIALECT ? "postgres" : "postgres",
};

module.exports = {
	development,
};

export { development };
