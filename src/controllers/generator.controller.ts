/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post } from "../decorators";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
// eslint-disable-next-line
const capitalize = require("just-capitalize");

const tag = "Generator";
interface Info {
  message: string
}

@Controller("/generators")
export default class GeneratorController {
  @Post(
    { path: "/model", tag },
    {
      responses: [
        {
          200: {
            description: "Response get object",
            responseType: "object",
            schema: {
              title: "",
              type: "object",
              properties: {
                status: {
                  type: "number"
                },
                data: {
                  type: "object"
                }
              }
            }
          }
        }
      ],
      request: {
        type: "object",
        title: "",
        properties: {
          name: {
            type: "string"
          }
        }
      },
      parameters: []
    },
    []
  )
  public async modelGenerator(req: Request, res: Response): Promise<Info> {
    const {
      name
    }: { name: string } = req.body;
    let migrations = fs.readdirSync(
      path.normalize(`${__dirname}/../../src/migrations`)
    );
    migrations = migrations.map((d: string) => d.split(".")[1]);
    const existIndex = migrations.indexOf(name);

    if (existIndex === -1) {
      const now = new Date().getTime();
      let blankMigration: string | Buffer = fs.readFileSync(
        path.normalize(`${__dirname}/../../src/migrations/0.example.ts`)
      );
      blankMigration = blankMigration.toString("utf-8");
      blankMigration = blankMigration.replace(/example/g, name);

      fs.writeFileSync(
        path.normalize(`${__dirname}/../../src/migrations/${now}.${name}.ts`),
        blankMigration
      );
    }

    let blankModel: string | Buffer = fs.readFileSync(
      path.normalize(`${__dirname}/../../src/models/example.model.ts`)
    );
    blankModel = blankModel.toString("utf-8");
    blankModel = blankModel.replace(/Example/g, capitalize(name));

    fs.writeFileSync(
      path.normalize(`${__dirname}/../../src/models/${name}.model.ts`),
      blankModel
    );

    return {
      message: "Model created successfully."
    };
  }

  @Post(
    { path: "/controller", tag },
    {
      responses: [
        {
          200: {
            description: "Response get object",
            responseType: "object",
            schema: {
              title: "",
              type: "object",
              properties: {
                status: {
                  type: "number"
                },
                data: {
                  type: "object"
                }
              }
            }
          }
        }
      ],
      request: {
        type: "object",
        title: "",
        properties: {
          name: {
            type: "string"
          }
        }
      },
      parameters: []
    },
    []
  )
  public async controllerGenerator(req: Request, res: Response): Promise<Info> {
    const {
      name
    }: { name: string } = req.body;
    let blankController: string | Buffer = fs.readFileSync(
      path.normalize(`${__dirname}/../../src/controllers/example.controller.ts`)
    );
    blankController = blankController.toString("utf-8");
    blankController = blankController.replace(/Example/g, capitalize(name));
    blankController = blankController.replace(/example/g, name);

    fs.writeFileSync(
      path.normalize(`${__dirname}/../../src/controllers/${name}.controller.ts`),
      blankController
    );

    return { message: "Controller created successfully." };
  }
}
