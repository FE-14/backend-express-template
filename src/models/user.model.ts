import {
	Optional,
	Sequelize,
	DataTypes,
} from "sequelize";
import { BaseModel } from "../utils";

/**
 * Schema Model Definition
 */
export interface UserAttributes {
	/**
	 * sample attribute
	 */
	id: number;
	username: string;
	password: string;
	firstName: string;
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

/**
 * Class Register
 */
export class User extends BaseModel<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	public static readonly tableName = "users";
	public static readonly modelName = "user";
	public static readonly modelNamePlural = "users";
	public static readonly defaultScope = {};
	public id!: number;
	public username!: string;
	public password!: string;
	public firstName!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public static associations: {};

	public static modelInit(sequlize: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				username: new DataTypes.STRING(),
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

	public static setAssociation(): void {}
}
