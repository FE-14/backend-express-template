/* eslint-disable @typescript-eslint/ban-types */
import { Model, FindOptions, Sequelize, ModelAttributes, QueryInterface } from "sequelize";

/**
 * Abstract class to be extended by models
 * declare the default structure of a model
 * TODO need to define the model.d.ts
 */
export abstract class BaseModel<
  T extends {} = any,
  K extends {} = any
  > extends Model<T, K> {
  public static readonly modelName: string;
  public static readonly modelNamePlural: string;
  public static readonly tableName: string;
  public static readonly defaultScope: FindOptions = {};
  public static tableDefinitions: ModelAttributes<any, any>;

  /**
   * Method to initialize the model
   */
  public static modelInit(sequelize: Sequelize): void {
    throw new Error("modelPrepare not implemented");
  }

  /**
   * Method to install association
   */
  public static setAssociation(): void {
    throw new Error("modelPrepare not implemented");
  }

  public static async createTable(query: QueryInterface): Promise<void> { }

  public static async dropTable(query: QueryInterface): Promise<void> { }

  public static async addConstraints(query: QueryInterface): Promise<void> { }

  public static async removeConstraints(query: QueryInterface): Promise<void> { }
}
