import { Controller, Post } from "../decorators";
import { Request, Response } from "express";
import { successResponse } from "../utils";
import fs from "fs";
import path from "path";
// eslint-disable-next-line
const capitalize = require("just-capitalize");

@Controller("/generator")
export default class GeneratorController {
  @Post(
    { path: "/model", tag: "Generator" },
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
  public async index(req: Request, res: Response): Promise<Response> {
    try {
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

      return successResponse({
        res,
        data: {
          message: "success"
        }
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e
      });
    }
  }
}
