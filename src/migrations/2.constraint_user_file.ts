import { QueryInterface } from "sequelize";
import Model from "../models/file.model";

export const up = async (query: QueryInterface): Promise<void> => {
  try {
    Model.addConstraints(query);
  } catch (error) {
    Promise.reject(error);
  }
};

export const down = async (query: QueryInterface): Promise<void> => {
  try {
    Model.removeConstraints(query);
  } catch (error) {
    Promise.reject(error);
  }
};
