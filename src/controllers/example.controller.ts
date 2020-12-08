import { _Request } from "../interfaces";
import { Controller, Get } from "../decorators";
import { Response } from "express";
import { successResponse } from "../utils";

const tag = "Example";

@Controller("/examples")
export default class ExampleController {
  @Get({ path: "/", tag }, {
    request: {},
    responses: [],
    parameters: []
  }, [])
  public async getAll(req: _Request, res: Response): Promise<Response> {
    try {
      return successResponse({
        res,
        data: []
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e
      });
    }
  }
}
