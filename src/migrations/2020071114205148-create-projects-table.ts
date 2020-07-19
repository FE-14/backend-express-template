import { QueryInterface, DataTypes } from "sequelize";
import { Project } from "../models";

export const up = async (query: QueryInterface): Promise<void> => {
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
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const down = async (query: QueryInterface): Promise<void> => {
	try {
		return query.dropTable(Project.tableName);
	} catch (error) {
		return Promise.reject(error);
	}
};
