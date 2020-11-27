import { Controller, Post } from "../decorators";
import { Request } from "express";
import { envConfig, ErrorResponse } from "../utils";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import BodyLogin from "../interfaces/BodyLogin.interface";
import User from "../models/user.model";
import { auth, tokenExtractor } from "../middleware/auth";
import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRE } = envConfig;

interface Claims {
  user: number;
}

interface TokenDecode {
  claims: Claims;
  iat: number;
  exp: number;
}

@Controller("/auths")
export default class AuthController {
  @Post(
    { path: "/login", tag: "Login" },
    {
      responses: [
        {
          200: {
            description: "Response token",
            responseType: "object",
            schema: {
              properties: {
                token: {
                  type: "string"
                }
              }
            }
          }
        }
      ],
      request: {
        properties: {
          username: {
            type: "string"
          },
          password: {
            type: "string"
          }
        },
        required: ["username", "password"]
      }
    }
  )
  public async index(req: Request): Promise<{ token: string }> {
    const bodyLogin: BodyLogin = req.body;
    if (!bodyLogin.username || !bodyLogin.password) {
      throw new ErrorResponse("User credential not found", 400);
    }

    const user = await User.findOne({
      where: {
        username: bodyLogin.username
      }
    });

    if (!user) throw new ErrorResponse("User Not found", 404);

    const hashResult = await compare(bodyLogin.password, user.password);

    if (!hashResult) throw new ErrorResponse("Password didn't match", 400);

    await user.update({
      lastLoginAt: new Date()
    });

    const token = sign(
      {
        claims: { user: user.id }
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRE
      }
    );

    if (!token) throw new ErrorResponse("Failed to generate token", 400);

    return { token };
  }

  @Post(
    { path: "/refresh-token", tag: "Refresh-token" },
    {
      responses: [
        {
          200: {
            description: "Response token",
            responseType: "object",
            schema: {
              properties: {
                token: {
                  type: "string"
                }
              }
            }
          },
          500: {
            description: "Response post object",
            responseType: "object",
            schema: {
              properties: {
                success: {
                  type: "boolean"
                },
                message: {
                  type: "string"
                }
              }
            }
          }
        }
      ]
    },
    [auth]
  )
  public async refresh(req: Request): Promise<{ token: string }> {
    const token = tokenExtractor(req.headers["authorization"]);
    const tokenDecode: TokenDecode = jwt.verify(
      token,
      JWT_SECRET
    ) as TokenDecode;

    if (!tokenDecode) throw "invalid token";

    const userId = tokenDecode.claims.user;
    const newToken: string = sign(
      {
        claims: { user: userId }
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRE
      }
    );

    return { token: newToken };
  }
}
