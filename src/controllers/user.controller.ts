import { Controller, Get, Put, Post, Delete } from "../decorators";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import { genSalt, hash } from "bcryptjs";
import { successResponse, errorResponse, ErrorResponse } from "../utils";
import { _Request } from "../interfaces";
import User from "../models/user.model";

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
  public async index(req: Request): Promise<User> {
    const { username, password, firstName, lastName } = req.body;
    if (!req.body.username || !req.body.password) {
      throw new ErrorResponse("username and password is required", 500);
    }
    const currentUser = await User.findOne({
      where: {
        username
      }
    });

    if (currentUser)
      throw new ErrorResponse("username and password is required", 400);

    const salt = await genSalt(12);
    const hashPassword = await hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      username,
      password: hashPassword,
      avatarUrl: ""
    });

    if (!user)
      throw new ErrorResponse("username and password is required", 400);

    return user;
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
  public async getCurrentUser(req: _Request): Promise<User> {
    const currentUser = req.user;

    if (!currentUser) {
      throw new ErrorResponse("User Not Found", 404);
    }

    return currentUser;
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
  public async getUsers(): Promise<User[]> {
    return await User.findAll({
      attributes: {
        exclude: ["password"]
      }
    });
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
