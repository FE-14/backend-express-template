import { QueryInterface } from "sequelize";

export const up = async (query: QueryInterface) => {
	try {
		const users = await query.bulkInsert("Users", [
			{
				username: "username",
				password: "password",
				firstName: "first_name",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const down = async (query: QueryInterface) => {
	try {
		/**
		 * code will execute on revert seeder
		 */
	} catch (error) {
		return Promise.reject(error);
	}
};
