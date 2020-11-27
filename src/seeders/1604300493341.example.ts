import { QueryInterface } from "sequelize";
import { hash, genSalt } from "bcryptjs";
import Example from "../models/example.model";

export const up = async (query: QueryInterface): Promise<object | number> => {
  try {
    const users = await query.bulkInsert(Example.tableName, [
      {
        username: "admin",
        password: await hash("admin", await genSalt(12)),
        firstName: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const down = async (query: QueryInterface): Promise<object | number> => {
  try {
    const users = await query.bulkDelete(
      Example.tableName,
      {
        username: "admin"
      },
      {}
    );
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};
