import * as dotenv from "dotenv";
dotenv.config();

export const envConfig = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: +(process.env.PORT || 3000),
	DB_USERNAME: process.env.DB_USERNAME || "lanius",
	DB_PASSWORD: process.env.DB_PASSWORD || "lanius",
	DB_HOST: process.env.DB_HOST || "localhost",
	DB_PORT: +(process.env.DB_PORT || 54321),
	DB_NAME: process.env.DB_NAME || "esim_database",
	DB_DIALECT: process.env.DB_DIALECT ? "postgres" : "postgres",
	JWT_EXPIRE: process.env.JWT_EXPIRE || "8h",
	JWT_SECRET: process.env.JWT_SECRET || "akucintalanius",
};
