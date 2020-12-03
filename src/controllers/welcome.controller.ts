import { Controller, Get, Post } from "../decorators";
import { Request } from "express";
import multer from "multer";

@Controller("/")
export default class WelcomeController {
  @Get(
    { path: "", tag: "Welcome" },
    {
      responses: [
        {
          200: {
            description: "Response get object",
            responseType: "object",
            schema: {
              title: "Message",
              properties: {
                message: {
                  type: "string"
                }
              }
            }
          }
        }
      ]
    }
  )
  public async index(): Promise<{ message: string }> {
    return {
      message: "Welcome to API v1"
    };
  }

  @Post(
    { path: "contoh-upload", tag: "Welcome" },
    {
      request: {
        title: "",
        properties: {
          file: {
            type: "file"
          }
        }
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
    },
    [multer({ dest: "uploads" }).single("file")]
  )
  public async uploadExample(req: Request): Promise<{ message: string }> {
    console.log(req.file);

    return {
      message: "Welcome to API v1"
    };
  }
}
