import { QueryInterface, DataTypes } from "sequelize";

export const up = async (query: QueryInterface) => {
	try {
		return query.createTable("Users", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			firstName: {
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

export const down = async (query: QueryInterface) => {
	try {
		/**
		 * code wher migration revert to run
		 */
	} catch (error) {
		return Promise.reject(error);
	}
};
