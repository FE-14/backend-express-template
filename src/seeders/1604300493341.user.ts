import { QueryInterface } from "sequelize";
import { hash, genSalt } from "bcryptjs";
import User from "../models/user.model";

export const up = async (query: QueryInterface): Promise<object | number> => {
  try {
    const users = await query.bulkInsert(User.tableName, [
      {
        username: "admin",
        password: await hash("admin", await genSalt(12)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "dadang",
        password: await hash("dadang", await genSalt(12)),
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
      User.tableName,
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
