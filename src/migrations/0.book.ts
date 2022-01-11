import { QueryInterface } from "sequelize";
import Model from "../models/book.model";

export const up = async (query: QueryInterface): Promise<void> => {
  try {
    Model.createTable(query);
  } catch (error) {
    Promise.reject(error);
  }
};

export const down = async (query: QueryInterface): Promise<void> => {
  try {
    Model.dropTable(query);
  } catch (error) {
    Promise.reject(error);
  }
};
