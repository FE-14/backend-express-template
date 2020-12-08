import { Optional, Sequelize, DataTypes, QueryInterface } from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  lastLoginAt?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User
  extends BaseModel<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  id: number;
  username: string;
  password: string;
  lastLoginAt?: Date;
  public static readonly tableName = "MT_User";
  public static readonly modelName = "User";
  public static readonly modelNamePlural = "Users";
  public static readonly defaultScope = {};
  public firstName!: string;
  public lastName!: string;
  public avatarUrl!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public static setAssociation(): void { }

  public static modelInit(sequlize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: new DataTypes.STRING()
        },
        password: new DataTypes.STRING(),
        firstName: new DataTypes.STRING(),
        lastName: new DataTypes.STRING(),
        avatarUrl: new DataTypes.STRING(),
        lastLoginAt: new DataTypes.DATE()
      },
      {
        sequelize: sequlize,
        tableName: this.tableName,
        name: {
          singular: this.modelName,
          plural: this.modelNamePlural
        },
        defaultScope: this.defaultScope,
        comment: "Model for the accessible data of user",
        paranoid: true
      }
    );
  }

  public static createTable(query: QueryInterface): Promise<void> {
    return query.createTable(this.tableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastLoginAt: {
        type: DataTypes.DATE
      },
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

  public static dropTable(query: QueryInterface): Promise<void> {
    return query.dropTable(this.tableName);
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
