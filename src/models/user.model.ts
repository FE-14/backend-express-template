import {
	Optional,
	Sequelize,
	DataTypes,
	QueryInterface,
} from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface UserAttributes {
	id: number;
	username: string;
	password: string;
	firstName: string;
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
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public static associations: {};

	public static setAssociation(): void { }


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
					unique: true
				},
				password: new DataTypes.STRING(),
				firstName: new DataTypes.STRING(),
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
			}
		);
	}

	public static createTable(query: QueryInterface) {
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
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
		});
	}

	public static dropTable(query: QueryInterface) {
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
				userId: {
					type: "number",
				},
				name: {
					type: "string",
				},
			},
		},
		Project: {
			title: "",
			properties: {
				id: {
					type: "number",
				},
				userId: {
					type: "number",
				},
				name: {
					type: "string",
				},
			},
		},
	}
];

export default User;
