import { Controller, Get, Put, Post, Delete } from "../decorators";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import { genSalt, hash } from "bcryptjs";
import User from "../models/user.model";
import { successResponse, errorResponse } from "../utils";
import { _Request } from "../interfaces";

@Controller("/users")
export default class UserController {
  @Post(
    { path: "/", tag: "User" },
    {
      responses: [
        {
          200: {
            description: "Response post object",
            responseType: "object",
            schema: "User"
          }
        }
      ],
      request: "NewUser"
    }
    // [auth]
  )
  public async index(req: Request, res: Response): Promise<Response> {
    const {
      username,
      password,
    } = req.body;
    try {
      if (!req.body.username || !req.body.password) {
        throw "username and password is required";
      }
      const currentUser = await User.findOne({
        where: {
          username
        }
      });

      if (currentUser) throw "user exist";

      const salt = await genSalt(12);
      const hashPassword = await hash(password, salt);

      const user = await User.create({
        username,
        password: hashPassword,
      });

      if (!user) throw "cant create user";

      return successResponse({ res, data: user });
    } catch (e) {
      return res.status(500).json({
        sucess: false,
        message: e
      });
    }
  }

  @Get(
    { path: "/current-user", tag: "User", isIndependentRoute: true },
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
    },
    [auth]
  )
  public async getCurrentUser(req: _Request, res: Response): Promise<Response> {
    const currentUser = req.user;

    const userWithMenu = JSON.parse(JSON.stringify(currentUser));
    return successResponse({ res, data: userWithMenu });
  }

  @Get(
    { path: "/", tag: "User" },
    {
      responses: [
        {
          200: {
            description: "Response get object",
            responseType: "array",
            schema: "User"
          }
        }
      ]
    }
  )
  public async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"]
      }
    });
    return successResponse({ res, data: users });
  }

  @Get(
    { path: "/:id", tag: "User" },
    {
      responses: [
        {
          200: {
            description: "Response get object",
            responseType: "object",
            schema: "User"
          }
        }
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            id: {
              type: "number"
            }
          },
          required: true
        }
      ]
    }
  )
  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ["password"]
      }
    });

    if (!user)
      return errorResponse({
        res,
        msg: `User with id ${id} not found`,
        statusCode: 404
      });

    return successResponse({ res, data: user });
  }

  @Put(
    { path: "/", tag: "User" },
    {
      responses: [
        {
          200: {
            description: "Response put object",
            responseType: "object",
            schema: "User"
          }
        }
      ]
    }
  )
  public details(req: Request, res: Response): Response {
    return res.send(`You are looking at the profile of ${req.params.name}`);
  }

  @Delete(
    { path: "/:id", tag: "User" },
    {
      responses: [
        {
          200: {
            description: "Response delete array",
            responseType: "object",
            schema: {
              properties: {
                success: {
                  type: "boolean"
                }
              }
            }
          }
        }
      ]
    },
    [auth]
  )
  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ["password"]
      }
    });

    if (!user)
      return errorResponse({
        res,
        msg: `User with id ${id} not found`,
        statusCode: 404
      });

    await user.destroy();

    return successResponse({ res, data: null });
  }
}
