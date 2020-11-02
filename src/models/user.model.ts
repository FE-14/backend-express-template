import {
	Optional,
	Sequelize,
	DataTypes,
	QueryInterface,
	Association,
} from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface UserAttributes {
	id: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	avatarUrl: string;
	roleId: number;
	lineId: number;
	areaId: number;
	stepId: number;
	lastLoginAt?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends BaseModel<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	public static readonly tableName = "MT_User";
	public static readonly modelName = "User";
	public static readonly modelNamePlural = "Users";
	public static readonly defaultScope = {};
	public id!: number;
	public username!: string;
	public password!: string;
	public firstName!: string;
	public lastName!: string;
	public avatarUrl!: string;
	public lineId!: number;
	public areaId!: number;
	public stepId!: number;
	public roleId!: number;
	public lastLoginAt?: Date;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;

	public static associations: {
	};

	public static setAssociation(): void {
	}


	public static modelInit(sequlize: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				username: {
					type: new DataTypes.STRING(),
				},
				password: new DataTypes.STRING(),
				firstName: new DataTypes.STRING(),
				lastName: new DataTypes.STRING(),
				avatarUrl: new DataTypes.STRING(),
				lineId: new DataTypes.INTEGER(),
				areaId: new DataTypes.INTEGER(),
				stepId: new DataTypes.INTEGER(),
				roleId: new DataTypes.INTEGER(),
				lastLoginAt: new DataTypes.DATE()
			},
			{
				sequelize: sequlize,
				tableName: this.tableName,
				name: {
					singular: this.modelName,
					plural: this.modelNamePlural,
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
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING,
			},
			lastName: {
				type: DataTypes.STRING
			},
			avatarUrl: DataTypes.STRING,
			lastLoginAt: {
				type: DataTypes.DATE,
			},
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
			deletedAt: {
				type: DataTypes.DATE,
			},
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
			properties: {
				id: {
					type: "number",
				},
				username: {
					type: "string",
				},
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				avatarUrl: {
					type: "string"
				},
				lastLoginAt: {
					type: "string",
				},
			},
		},
		NewUser: {
			title: "",
			properties: {
				username: {
					type: "string",
				},
				password: {
					type: "string"
				},
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				avatarUrl: {
					type: "string"
				},
				roleId: {
					type: "number",
				},
			},
		},
	}
];

export default User;
