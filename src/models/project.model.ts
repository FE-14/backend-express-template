import { Optional, Sequelize, DataTypes } from "sequelize";
import { BaseModel } from "../utils";

export interface ProjectAttributes {
	id: number;
	userId: number;
	name: string;
}

export type ProjectCreationAttributes = Optional<ProjectAttributes, "id">;

export class Project
	extends BaseModel<ProjectAttributes, ProjectCreationAttributes>
	implements ProjectAttributes {
	public static readonly tableName = "Projects";
	public static readonly modelName = "Project";
	public static readonly modelNamePlural = "Projects";
	public static readonly defaultScope = {};

	public id!: number; // sample, replace if needed
	public userId!: number;
	public name!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public static modelInit(sequlize: Sequelize): void {
		this.init(
			{
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

	public static setAssociation(): void { }
}
