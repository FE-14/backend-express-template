import { QueryInterface } from "sequelize";
import Model from "../models/example.model";

export const up = async (query: QueryInterface): Promise<void> => {
  try {
    return Model.createTable(query);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const down = async (query: QueryInterface): Promise<void> => {
  try {
    return Model.dropTable(query);
  } catch (error) {
    return Promise.reject(error);
  }
};
