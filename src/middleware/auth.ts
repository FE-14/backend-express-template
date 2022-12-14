import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { _Request } from "../interfaces";
import { envConfig } from "../utils";
import User from "../models/user.model";

interface Claims {
  user: number;
}

interface TokenDecode {
  claims: Claims;
  iat: number;
  exp: number;
}

export function tokenExtractor(token: string): string {
  const extracted = token.split(" ")[1];

  if (!extracted) throw "Error no Bearer auth token provided";

  return extracted;
}

export const auth = async (
  req: _Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  let authHeader: string;
  let token: string;

  try {
    authHeader = req.headers["authorization"];

    if (!authHeader) throw "Error no authorization header";

    token = tokenExtractor(authHeader);

    jwt.verify(
      token,
      envConfig.JWT_SECRET,
      async (err, decoded: TokenDecode) => {
        console.log({ err });
        if (err) throw err;
        const user = await User.findOne({
          where: {
            id: decoded.claims.user
          },
          attributes: {
            exclude: ["password"]
          }
        });
        req.user = user;
        next();
      }
    );
  } catch (e) {
    return res.status(500).json({
      sucess: false,
      message: e
    });
  }
};
