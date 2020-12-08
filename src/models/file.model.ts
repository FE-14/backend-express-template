import {
    Optional,
    Sequelize,
    DataTypes,
    QueryInterface,
    ModelAttributes,
    Association,
} from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
import User from "./user.model";
export interface FileAttributes {
    id: number,
    name: string,
    description: string,
    uploadedBy: number,
    uri: string,
}

export type FileCreationAttributes = Optional<FileAttributes, "id">;

export class File
    extends BaseModel<FileAttributes, FileCreationAttributes>
    implements FileAttributes {
    uri: string;
    id: number;
    name: string;
    description: string;
    uploadedBy: number;
    public static readonly tableName = "Files";
    public static readonly modelName = "File";
    public static readonly modelNamePlural = "Files";
    public static readonly defaultScope = {};
    public readonly deletedAt: Date;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public static associations: {
        user: Association<File, User>
    }

    public static setAssociation(): void {
        this.belongsTo(User, {
            foreignKey: "uploadedBy",
            as: "user"
        });
    }

    public static tableDefinitions: ModelAttributes<File, FileAttributes> = {
        id: {
            type: new DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: new DataTypes.STRING(),
        description: new DataTypes.STRING(),
        uri: new DataTypes.STRING(),
        uploadedBy: new DataTypes.INTEGER()
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
                comment: "Model for the accessible data of File",
                paranoid: true
            }
        );
    }

    public static async createTable(query: QueryInterface): Promise<void> {
        await query.createTable(this.tableName, {
            ...this.tableDefinitions,
            createdAt: new DataTypes.DATE(),
            updatedAt: new DataTypes.DATE(),
            deletedAt: new DataTypes.DATE()
        });
    }

    public static async addConstraints(query: QueryInterface): Promise<void> {
        await query.addConstraint(this.tableName, {
            fields: ["uploadedBy"],
            type: "foreign key",
            name: "Files_uploadedBy_fkey",
            references: {
                table: User.tableName,
                field: "id"
            },
            onDelete: "no action",
            onUpdate: "cascade",
        });
    }

    public static async removeConstraints(query: QueryInterface): Promise<void> {
        await query.removeConstraint(this.tableName, "Files_uploadedBy_fkey");
    }

    public static async dropTable(query: QueryInterface): Promise<void> {
        await query.dropTable(this.tableName, { force: false });
    }
}

export const swaggerSchemas: Schemas[] = [
    {
        File: {
            title: "",
            type: "object",
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
                uploadedBy: {
                    $ref: "User"
                },
                uri: {
                    type: "string"
                }
            }
        },
        NewFile: {
            title: "",
            type: "object",
            properties: {
                name: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                uploadedBy: {
                    type: "number"
                }
            }
        }
    }
];

export default File;
