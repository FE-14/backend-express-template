import { _Request } from "../interfaces";
import { Controller, Get } from "../decorators";
import { Response } from "express";
import { successResponse } from "../utils";
import File from "../models/file.model";

const tag = "File";

@Controller("/files")
export default class FileController {
  @Get({ path: "/", tag }, {
    request: {},
    responses: [
      {
        200: {
          description: "",
          responseType: "array",
          schema: "File"
        }
      }
    ],
    parameters: []
  }, [])
  public async getAll(req: _Request, res: Response): Promise<Response> {
    try {
      const data = await File.findAll({});

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
          schema: "File"
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

      const data = await File.findOne({
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
