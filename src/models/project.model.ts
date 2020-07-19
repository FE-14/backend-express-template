import { Optional, Sequelize, DataTypes } from "sequelize";
import { BaseModel } from "../utils";

/**
 * Schema Model Definition
 */
interface ProjectAttributes {
	/**
	 * sample attribute
	 */
	id: number;
	userId: number;
	name: string;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, "id">;

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
	public userId!: number;
	public name!: string;

	/**
	 * Register default parameter
	 */
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public static modelInit(sequlize: Sequelize): void {
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
				userId: new DataTypes.INTEGER(),
				name: new DataTypes.STRING(),
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

	public static setAssociation(): void {}
}
