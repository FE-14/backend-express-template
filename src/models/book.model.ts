import {
  Optional,
  Sequelize,
  DataTypes,
  QueryInterface,
  ModelAttributes
} from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface bookAttributes {
  id: number;
  tittle: string;
  description: string;
}

export type bookCreationAttributes = Optional<bookAttributes, "id">;

export class book
  extends BaseModel<bookAttributes, bookCreationAttributes>
  implements bookAttributes {
  id: number;
  tittle: string;
  description: string;
  public static readonly tableName = "Books";
  public static readonly modelName = "Book";
  public static readonly modelNamePlural = "Books";
  public static readonly defaultScope = {};
  public readonly deletedAt: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public static associations: {};

  public static setAssociation(): void {}

  public static tableDefinitions: ModelAttributes<book, bookAttributes> = {
    id: {
      type: new DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    tittle: new DataTypes.STRING(),
    description: new DataTypes.STRING()
  };

  public static modelInit(sequlize: Sequelize): void {
    this.init(this.tableDefinitions, {
      sequelize: sequlize,
      tableName: this.tableName,
      name: {
        singular: this.modelName,
        plural: this.modelNamePlural
      },
      defaultScope: this.defaultScope,
      comment: "Model for the accessible data of Example",
      paranoid: true
    });
  }

  public static createTable(query: QueryInterface): Promise<void> {
    return query.createTable(this.tableName, {
      ...this.tableDefinitions,
      createdAt: new DataTypes.DATE(),
      updatedAt: new DataTypes.DATE(),
      deletedAt: new DataTypes.DATE()
    });
  }

  public static dropTable(query: QueryInterface): Promise<void> {
    return query.dropTable(this.tableName);
  }
}

export const swaggerSchemas: Schemas[] = [
  {
    Book: {
      title: "",
      type: "object",
      properties: {
        id: {
          type: "number"
        },
        tittle: {
          type: "string"
        },
        description: {
          type: "string"
        }
      }
    },
    NewBook: {
      title: "",
      type: "object",
      properties: {
        tittle: {
          type: "string"
        },
        description: {
          type: "string"
        }
      }
    }
  }
];

export default book;
