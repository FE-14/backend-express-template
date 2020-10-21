import { QueryInterface } from "sequelize";
import { hash, genSalt } from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/ban-types
export const up = async (query: QueryInterface): Promise<object | number> => {
	try {
		const users = await query.bulkInsert("users", [
			{
				username: "username",
				password: await hash("password", await genSalt()),
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
		const users = await query.bulkDelete("users", {
			username: "username",
			firstName: "first_name",
		});
		return Promise.resolve(users);
	} catch (error) {
		return Promise.reject(error);
	}
};
