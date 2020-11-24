import {
    Optional,
    Sequelize,
    DataTypes,
    QueryInterface,
    ModelAttributes,
} from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
import { Json } from "sequelize/types/lib/utils";
export interface ExampleAttributes {
    id: number,
    name: string,
    description: string,
    isActive: boolean,
    createdBy: number,
    additional?: Json
}

export type ExampleCreationAttributes = Optional<ExampleAttributes, "id">;

export class Example
    extends BaseModel<ExampleAttributes, ExampleCreationAttributes>
    implements ExampleAttributes {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdBy: number;
    additional?: Json;
    public static readonly tableName = "Examples";
    public static readonly modelName = "Example";
    public static readonly modelNamePlural = "Examples";
    public static readonly defaultScope = {};
    public readonly deletedAt: Date;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public static associations: {
    }

    public static setAssociation(): void { }

    private static tableDefinitions: ModelAttributes<Example, ExampleAttributes> = {
        id: {
            type: new DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: new DataTypes.STRING(),
        description: new DataTypes.STRING(),
        isActive: DataTypes.BOOLEAN,
        createdBy: new DataTypes.INTEGER(),
        additional: {
            type: DataTypes.JSON,
            allowNull: true
        },
    }

    public static modelInit(sequlize: Sequelize): void {
        this.init(this.tableDefinitions,
            {
                sequelize: sequlize,
                tableName: this.tableName,
                name: {
                    singular: this.modelName,
                    plural: this.modelNamePlural
                },
                defaultScope: this.defaultScope,
                comment: "Model for the accessible data of Example",
                paranoid: true
            }
        );
    }

    public static createTable(query: QueryInterface): Promise<void> {
        return query.createTable(this.tableName, {
            ...this.tableDefinitions,
            createdAt: new DataTypes.DATE(),
            updatedAt: new DataTypes.DATE(),
            deletedAt: new DataTypes.DATE()
        });
    }

    public static dropTable(query: QueryInterface): Promise<void> {
        return query.dropTable(this.tableName);
    }
}

export const swaggerSchemas: Schemas[] = [
    {
        Example: {
            title: "",
            properties: {
                id: {
                    type: "number"
                },
                name: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                isActive: {
                    type: "boolean"
                },
                createdBy: {
                    type: "number"
                },
                additional: {
                    type: "object"
                },
            }
        },
        NewExample: {
            title: "",
            properties: {
                name: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                isActive: {
                    type: "boolean"
                },
                createdBy: {
                    type: "number"
                },
                additional: {
                    type: "object"
                },
            }
        }
    }
];

export default Example;
