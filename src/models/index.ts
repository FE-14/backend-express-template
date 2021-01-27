/* eslint-disable @typescript-eslint/no-var-requires */
import { sequelize_postgres, mongoose_mongo_url } from "../utils/dbConnection";
import { Schemas } from "../keys/apidoc";
import mongoose from "mongoose";
import fs from "fs";
import ModelInterface from "../interfaces/model.interface";
import { envConfig } from "../utils/envConfig";

const files = fs.readdirSync(`${__dirname}`);
const modelFiles = files.filter((x: string): boolean => {
  return (
    x != "index.ts" && x != "index.js" && !(x as string).includes("mongo.model")
  );
});
const schemaFiles = files.filter((x: string): boolean => {
  return (x as string).includes("mongo.model");
});

export let swaggerSchemas: Schemas[] = [];

export const schemas = schemaFiles.map((d: string) => {
  const fileName = `./${d}`.replace(".ts", "").replace(".js", "");
  const model = require(fileName);
  const schemasConfig = model["swaggerSchemas"];
  if (typeof schemasConfig != "undefined") {
    swaggerSchemas = [...swaggerSchemas, ...schemasConfig];
  }
  return d;
});

const models = modelFiles.map((d: string) => {
  const fileName = `./${d}`.replace(".ts", "").replace(".js", "");
  const model = require(fileName);
  const schemas = model["swaggerSchemas"];
  if (typeof schemas != "undefined") {
    swaggerSchemas = [...swaggerSchemas, ...schemas];
  }
  return model["default"];
});

const mongoose_mongo = mongoose;

const modelInit = (): void => {
  if (envConfig.MONGO_DB_ENABLE == "true") {
    mongoose_mongo
      .connect(mongoose_mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("MongoDB Connected.");
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }

  models.forEach((model: ModelInterface) => {
    model.modelInit(sequelize_postgres);
  });

  models.forEach((model: ModelInterface) => {
    model.setAssociation();
  });
};

export { mongoose_mongo };
export default modelInit;
