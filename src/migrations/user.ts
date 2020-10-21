import { QueryInterface, DataTypes } from "sequelize";
import { User } from "../models";


export const up = async (query: QueryInterface): Promise<void> => {
	try {
		return User.createTable(query)
	} catch (error) {
		return Promise.reject(error);
	}
};

export const down = async (query: QueryInterface): Promise<void> => {
	try {
		return User.createTable(query);
	} catch (error) {
		return Promise.reject(error);
	}
};
