import { QueryInterface } from "sequelize";
import Example from "../models/example.model";

// eslint-disable-next-line @typescript-eslint/ban-types
export const up = async (query: QueryInterface): Promise<object | number> => {
  try {
    const users = await query.bulkInsert(Example.tableName, [
      {
        name: "coba",
        description: "coba description"
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
