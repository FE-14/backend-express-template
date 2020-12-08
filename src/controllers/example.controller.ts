import { _Request } from "../interfaces";
import { Controller, Get } from "../decorators";
import { Response } from "express";
import { successResponse } from "../utils";
import Example from "../models/example.model";

const tag = "Example";

@Controller("/examples")
export default class ExampleController {
  @Get({ path: "/", tag }, {
    request: {},
    responses: [
      {
        200: {
          description: "",
          responseType: "array",
          schema: "Example"
        }
      }
    ],
    parameters: []
  }, [])
  public async getAll(req: _Request, res: Response): Promise<Response> {
    try {
      const data = await Example.findAll({});

      return successResponse({
        res,
        data
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e
      });
    }
  }

  @Get({ path: "/:id", tag }, {
    request: {},
    responses: [
      {
        200: {
          description: "",
          responseType: "array",
          schema: "Example"
        }
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          type: "number"
        }
      }
    ]
  }, [])
  public async getOne(req: _Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const data = await Example.findOne({
        where: {
          id
        }
      });

      if (!data) throw "Data not found";

      return successResponse({
        res,
        data
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e
      });
    }
  }
}
