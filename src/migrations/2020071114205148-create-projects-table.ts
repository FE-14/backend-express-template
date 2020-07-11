import { QueryInterface, DataTypes } from "sequelize";
import { Project } from "../models";

export const up = async (query: QueryInterface) => {
	try {
		return query.createTable(Project.tableName, {
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING,
			},
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const down = async (query: QueryInterface) => {
	try {
		/**
		 * code wher migration revert to run
		 */
	} catch (error) {
		return Promise.reject(error);
	}
};
