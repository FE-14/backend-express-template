import { Controller, Get, Post } from "../decorators";
import { Request } from "express";
import multer from "multer";
import { upload } from "../middleware/upload";

const tag: string = "Welcome";

@Controller("/")
export default class WelcomeController {
  @Get(
    { path: "", tag },
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
    { path: "", tag },
    {
      request: {
        title: "",
        type: "object",
        properties: {
          file: {
            type: "file",
            format: "binary"
          }
        }
      },
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
    [upload.defaultStorage.fields([
      { name: "file", maxCount: 1 }
    ])]
  )
  public async uploadExample(): Promise<{ message: string }> {
    return {
      message: "Uploaded successfully."
    };
  }
}
