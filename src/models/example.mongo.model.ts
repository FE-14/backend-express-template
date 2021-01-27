import { Schema, model } from "mongoose";
import _Document from "../interfaces/Mongo.interface";
import { Schemas } from "../keys/apidoc";
import { softDeletePlugin } from "../utils/mongoSoftDeletePlugin";

const collectionName = "ExampleMongos";

export interface ExampleMongoAttributes extends _Document {
  code: string;
}

const ExampleMongoschema = softDeletePlugin(
  new Schema(
    {
      code: String
    },
    {
      collection: collectionName,
      strict: false
    }
  )
);

const ExampleMongo = model<ExampleMongoAttributes>(
  collectionName,
  ExampleMongoschema
);

export const swaggerSchemas: Schemas[] = [
  {
    ExampleMongo: {
      title: "",
      type: "object",
      properties: {
        id: {
          type: "string"
        },
        code: {
          type: "string"
        }
      }
    },
    NewExampleMongo: {
      title: "",
      type: "object",
      properties: {
        code: {
          type: "string"
        }
      }
    }
  }
];

export default ExampleMongo;
