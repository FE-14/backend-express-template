import { QueryInterface } from "sequelize";

// eslint-disable-next-line @typescript-eslint/ban-types
export const up = async (query: QueryInterface): Promise<object | number> => {
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
		return Promise.resolve(users);
	} catch (error) {
		return Promise.reject(error);
	}
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const down = async (query: QueryInterface): Promise<object | number> => {
	try {
		const users = await query.bulkDelete("Users", {
			username: "username",
			firstName: "first_name",
		});
		return Promise.resolve(users);
	} catch (error) {
		return Promise.reject(error);
	}
};
