import { Optional, Sequelize, DataTypes, QueryInterface } from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
export interface FormAttributes {
    id: number;
    formName: string;
    formCategory: number;
    plantId: number;
    periodic: string;
}

export type FormCreationAttributes = Optional<FormAttributes, "id">;

export class Form
    extends BaseModel<FormAttributes, FormCreationAttributes>
    implements FormAttributes {
    public static readonly tableName = "MT_Form";
    public static readonly modelName = "Form";
    public static readonly modelNamePlural = "Forms";
    public static readonly defaultScope = {};
    public id!: number;
    public formName: string;
    public formCategory: number;
    public plantId: number;
    public periodic: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public static associations: {};

    public static setAssociation(): void { }

    public static modelInit(sequlize: Sequelize): void {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                formName: DataTypes.STRING,
                formCategory: DataTypes.INTEGER,
                plantId: DataTypes.INTEGER,
                periodic: DataTypes.STRING,
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
            formName: DataTypes.STRING,
            formCategory: DataTypes.INTEGER,
            plantId: DataTypes.INTEGER,
            periodic: DataTypes.STRING,
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
        Form: {
            title: "Form",
            properties: {
                id: {
                    type: "number",
                },
                formName: {
                    type: "string",
                },
                formCategory: {
                    type: "number",
                },
                plantId: {
                    type: "number",
                },
                periodic: {
                    type: "string",
                },
            },
        },
        NewForm: {
            title: "NewUser",
            properties: {
                formName: {
                    type: "string",
                },
                formCategory: {
                    type: "number",
                },
                plantId: {
                    type: "number",
                },
                periodic: {
                    type: "string",
                },
            },
        },
    },
];

export default Form;
