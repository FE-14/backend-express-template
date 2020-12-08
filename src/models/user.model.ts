import { Optional, Sequelize, DataTypes, QueryInterface, ModelAttributes } from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface UserAttributes {
  id: number,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  avatarUrl: string,
  lastLoginAt?: Date,
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User
  extends BaseModel<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  lastLoginAt?: Date;
  public static readonly tableName = "MT_User";
  public static readonly modelName = "User";
  public static readonly modelNamePlural = "Users";
  public static readonly defaultScope = {};
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static associations: {
  }

  public static setAssociation(): void { }

  public static tableDefinitions: ModelAttributes<User, UserAttributes> = {
    id: {
      type: new DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: new DataTypes.STRING(),
    password: new DataTypes.STRING(),
    firstName: new DataTypes.STRING(),
    lastName: new DataTypes.STRING(),
    avatarUrl: new DataTypes.STRING(),
    lastLoginAt: new DataTypes.DATE(),
  }

  public static modelInit(sequlize: Sequelize): void {
    this.init(this.tableDefinitions,
      {
        sequelize: sequlize,
        tableName: this.tableName,
        name: {
          singular: this.modelName,
          plural: this.modelNamePlural
        },
        defaultScope: this.defaultScope,
        comment: "Model for the accessible data of File",
        paranoid: true
      }
    );
  }

  public static async createTable(query: QueryInterface): Promise<void> {
    await query.createTable(this.tableName, {
      ...this.tableDefinitions,
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    });
  }

  public static async dropTable(query: QueryInterface): Promise<void> {
    await query.dropTable(this.tableName, { force: false });
  }
}

export const swaggerSchemas: Schemas[] = [
  {
    User: {
      title: "",
      type: "object",
      properties: {
        id: {
          type: "number"
        },
        username: {
          type: "string"
        },
        lastLoginAt: {
          type: "string"
        }
      }
    },
    NewUser: {
      title: "",
      type: "object",
      properties: {
        username: {
          type: "string"
        },
        password: {
          type: "string"
        },
      }
    }
  }
];

export default User;
