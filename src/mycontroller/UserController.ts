import {Controller, Get, Post} from "../decorator";
import {Request, Response} from "express";
import {auth} from "../middleware/auth";

@Controller("/user")
export default class UserController {
  protected schemaProject = {
    User: {
      title: "",
      properties: {
        id: {
          type: "number",
        },
        userId: {
          type: "number",
        },
        name: {
          type: "string",
        },
      },
    },
  }

  @Post("/", {
    description: "test response",
    tag: "User",
    schema: {
      User: {
        title: "User fxgf",
        properties: {
          id: {
            type: "number",
          },
          userId: {
            type: "number",
          },
          name: {
            type: "string",
          },
        },
      },
    },
    type: "object"
  },
  [auth])
  public index(req: Request, res: Response): any {
    return res.send("User overview");
  }

  @Get("/", {
    description: "test response",
    tag: "User",
    schema: {
      User: {
        title: "User fxgf",
        properties: {
          id: {
            type: "number",
          },
          userId: {
            type: "number",
          },
          name: {
            type: "string",
          },
        },
      },
    },
    type: "object"
  })
  public getUsers(req: Request, res: Response): any {
    return res.send("User overview");
  }

  @Get("/:name", {
    description: "test response",
    tag: "User",
    schema: {
      Project: {
        title: "User",
        properties: {
          id: {
            type: "number",
          },
          userId: {
            type: "number",
          },
          name: {
            type: "string",
          },
        },
      },
    },
    type: "array"
  })
  public details(req: Request, res: Response): any {
    return res.send(`You are looking at the profile of ${req.params.name}`);
  }
}
