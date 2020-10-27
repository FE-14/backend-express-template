import { Optional, Sequelize, DataTypes, QueryInterface } from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface StandartParameter {
	id: number;
	formParameterId: number;
	rule: string;
	target: string;
}

export type StandartParameterCreation = Optional<StandartParameter, "id">;

export class StandartForm
	extends BaseModel<StandartParameter, StandartParameterCreation>
	implements StandartParameter {
	public static readonly tableName = "MT_StandartParameter";
	public static readonly modelName = "StandartParameter";
	public static readonly modelNamePlural = "StandarttParameter";
	public static readonly defaultScope = {};
	public id!: number;
	public formParameterId!: number;
	public rule: string;
	public target: string;
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
				formParameterId: DataTypes.NUMBER,
				rule: DataTypes.STRING,
				target: DataTypes.STRING,
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
			formParameterId: DataTypes.INTEGER,
			rule: DataTypes.STRING,
			target: DataTypes.STRING,
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
		StandartParameter: {
			title: "StandartParameter",
			properties: {
				id: {
					type: "number",
				},
				formParameterId: {
					type: "number",
				},
				rule: {
					type: "string",
				},
				target: {
					type: "string",
				},
			},
		},
		NewStandartParameter: {
			title: "NewStandartParameter",
			properties: {
				formParameterId: {
					type: "number",
				},
				rule: {
					type: "string",
				},
				target: {
					type: "string",
				},
			},
		},
	},
];

export default StandartForm;
