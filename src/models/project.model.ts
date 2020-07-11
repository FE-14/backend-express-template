import { Optional, Sequelize, DataTypes } from "sequelize";
import { BaseModel } from "../keys/model";
import { sequelize, User } from ".";

/**
 * Schema Model Definition
 */
interface ProjectAttributes {
	/**
	 * sample attribute
	 */
	id: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

/**
 * Class Register
 */
export class Project
	extends BaseModel<ProjectAttributes, ProjectCreationAttributes>
	implements ProjectAttributes {
	/**
	 * Define Main Model Information
	 */
	public static readonly tableName = "Projects";
	public static readonly modelName = "Project";
	public static readonly modelNamePlural = "Projects";
	public static readonly defaultScope = {};

	/**
	 * Register model parameter
	 */
	public id!: number; // sample, replace if needed

	/**
	 * Register default parameter
	 */
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public static modelInit(sequlize: Sequelize) {
		this.init(
			{
				/**
				 * Register all parameter to
				 * sequelize object
				 */
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
			},
			{
				sequelize: sequlize,
				tableName: this.tableName,
				name: {
					singular: this.modelName,
					plural: this.modelNamePlural,
				},
				defaultScope: this.defaultScope,
				comment: "Model for the accessible data of project",
			}
		);
	}
}

Project.modelInit(sequelize);

/**
 * Define the associtaion
 */
Project.belongsTo(User);
