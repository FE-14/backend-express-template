import { Controller, Get, Post } from "../decorators";
import { Request, Response } from "express";
import { successResponse } from "../utils";
import multer from "multer";

@Controller("/")
export default class WelcomeController {
  @Get({ path: "", tag: "Welcome" },
    {
      responses: [
        {
          200: {
            description: "Response get object",
            responseType: "object",
            schema: "User"
          }
        }
      ]
    })
  public async index(req: Request, res: Response): Promise<Response> {
    return successResponse({
      res,
      data: {
        message: "Welcome to API v1"
      }
    });
  }

  @Post({ path: "contoh-upload", tag: "Welcome" }, {
    request: {
      title: "",
      properties: {
        file: {
          type: "file",
        },
      },
    },
    parameters: [
      {
        name: "file",
        in: "path",
        schema: {
          type: "file"
        }
      }
    ],
    responses: [
      {
        200: {
          description: "Response get object",
          responseType: "object",
          schema: {
            title: "",
            properties: {
              filename: {
                type: "string"
              }
            }
          }
        }
      }
    ]
  }, [multer({ dest: "uploads" }).single("file")])
  public async uploadExample(req: Request, res: Response): Promise<Response> {
    console.log(req.file);

    return successResponse({
      res,
      data: {
        message: "Welcome to API v1"
      }
    });
  }
}
