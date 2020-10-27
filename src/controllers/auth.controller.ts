import { Controller, Post } from "../decorators";
import { NextFunction, Request, Response } from "express";
import { envConfig, successResponse } from '../utils';
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import BodyLogin from "../interfaces/BodyLogin.interface";
import ErrorLog from "../interfaces/ErrorLog.interface";
import User from "../models/user.model";

const { JWT_SECRET, JWT_EXPIRE } = envConfig;

@Controller("/auth")
export default class UserController {
    @Post({ path: "/login", tag: "Login" },
        {
            responses: [
                {
                    200: {
                        description: "Response token",
                        responseType: "object",
                        schema: 'User'
                    },
                    500: {
                        description: "Response post object",
                        responseType: "object",
                        schema: 'User'
                    },
                }
            ]
        },
        []
    )
    public async index(req: Request, res: Response): Promise<any> {
        let bodyLogin: BodyLogin = req.body
        let user: User, hashResult: boolean, token: string

        try {
            if (!bodyLogin.username || !bodyLogin.password) {
                throw { code: 400, message: "User credential not found" }
            }

            user = await User.findOne({
                where: {
                    username: bodyLogin.username
                }
            })

            if (!user) throw { code: 400, message: "Not found" }

            hashResult = await compare(bodyLogin.password, user.password)

            if (!hashResult) throw { code: 400, message: "Password didn't match" }

            token = sign({
                claims: { user: user.id }
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRE
            })

            if (!token) throw { code: 400, message: "Failed to generate token" }

            return successResponse({
                res,
                data: { token }
            })
        } catch (e) {
            let error: ErrorLog = e
            
            return res.status(error.code).json({
                success: false,
                message: error.message
            })
        }
    }
}
