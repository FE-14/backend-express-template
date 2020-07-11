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
import { BaseModel } from "../keys";
import { sequelize, Project } from ".";

/**
 * Schema Model Definition
 */
interface UserAttributes {
	/**
	 * sample attribute
	 */
	id: number;
	username: string;
	password: string;
	firstName: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

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

	public static modelInit(sequlize: Sequelize) {
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
}

User.modelInit(sequelize);

/**
 * Define the associtaion
 */
User.hasMany(Project);
