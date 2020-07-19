import {
	Optional,
	Sequelize,
	DataTypes,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyHasAssociationMixin,
	HasManyCountAssociationsMixin,
	Association,
} from "sequelize";
import { BaseModel } from "../utils";
import { Project } from "./index";

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
	/**
	 * Define Main Model Information
	 */
	public static readonly tableName = "Users";
	public static readonly modelName = "User";
	public static readonly modelNamePlural = "Users";
	public static readonly defaultScope = {};

	/**
	 * Register model parameter
	 */
	public id!: number;
	public username!: string;
	public password!: string;
	public firstName!: string;

	/**
	 * Register default parameter
	 */
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	/**
	 * function to relation to project
	 */
	public getProjects!: HasManyGetAssociationsMixin<Project>;
	public addProject!: HasManyAddAssociationMixin<Project, number>;
	public hasProject!: HasManyHasAssociationMixin<Project, number>;
	public countProjects!: HasManyCountAssociationsMixin;

	public readonly projects?: Project[];

	public static associations: {
		projects: Association<User, Project>;
	};

	/**
	 * Model Initiation function
	 * @param sequlize
	 */
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

	/**
	 * Set Association Model
	 */
	public static setAssociation(): void {
		this.hasMany(Project, { foreignKey: "userId", as: "projects" });
	}
}
