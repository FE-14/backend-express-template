import { Controller, Get, Post } from "../decorators";
import { Request, Response } from "express";
import { successResponse } from "../utils";

@Controller("/generator")
export default class GeneratorController {
  @Get(
    { path: "", tag: "Generator" },
    {
      responses: [],
      request: {},
      parameters: []
    },
    []
  )
  public async index(req: Request, res: Response): Promise<Response> {
    return successResponse({
      res,
      data: {}
    });
  }
}
