import { Optional, Sequelize, DataTypes, QueryInterface } from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface FormParameterAttributes {
	id: number;
	formId: number;
	fieldName: string;
	type: string;
	unit: string;
}

export type FormParameterCreationAttributes = Optional<
	FormParameterAttributes,
	"id"
>;

export class FormParameter
	extends BaseModel<FormParameterAttributes, FormParameterCreationAttributes>
	implements FormParameterAttributes {
	public static readonly tableName = "MT_FormParameter";
	public static readonly modelName = "FormParameter";
	public static readonly modelNamePlural = "Forms";
	public static readonly defaultScope = {};
	public id!: number;
	public formId: number;
	public fieldName!: string;
	public type!: string;
	public unit!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// public static associations: {};

	public static setAssociation(): void {}

	public static modelInit(sequlize: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				formId: DataTypes.INTEGER,
				fieldName: DataTypes.STRING,
				type: DataTypes.STRING,
				unit: DataTypes.STRING,
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
			formId: DataTypes.INTEGER,
			fieldName: DataTypes.STRING,
			type: DataTypes.STRING,
			unit: DataTypes.STRING,
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
		FormParameter: {
			title: "FormParameter",
			properties: {
				id: {
					type: "number",
				},
				formId: {
					type: "number",
				},
				fieldName: {
					type: "string",
				},
				type: {
					type: "string",
				},
				unit: {
					type: "string",
				},
			},
		},
		NewFormParameter: {
			title: "FormParameter",
			properties: {
				formId: {
					type: "number",
				},
				fieldName: {
					type: "string",
				},
				type: {
					type: "string",
				},
				unit: {
					type: "string",
				},
			},
		},
	},
];

export default FormParameter;
