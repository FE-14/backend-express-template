import express, { Request, Response, NextFunction } from 'express'
import { sign } from "jsonwebtoken";
import { compare, compareSync } from "bcryptjs";
import IControllerBase from '../interfaces/IControllerBase.interface'
import { envConfig, ErrorResponse, successResponse, validationFailResponse } from '../utils';
import { Schema, validationResult } from 'express-validator';
import Controller from '../interfaces/Controller.interface';
import User from '../models/user.model';

interface BodyLogin {
	username: string;
	password: string;
}

const { JWT_SECRET, JWT_EXPIRE } = envConfig;

class AuthController extends Controller implements IControllerBase {
    public loginValidator: Schema = {
        username: {
            exists: true,
        },
        password: {
            exists: true,
        },
    };

    constructor() {
        super()

        this.path = '/auth'
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/login', this.login)
    }

    private async login(req: Request, res: Response, next: NextFunction) {
        let error = validationResult(req)
        if (!error.isEmpty()) return validationFailResponse(res, error.array())

        let bodyLogin: BodyLogin = req.body

        let user = await User.findOne({
            where: {
                username: bodyLogin.username
            }
        })

        if (!user) return next(new ErrorResponse("Login failed", 401))

        let hashResult = await compare(user.password, bodyLogin.password)

        if (!hashResult) return next(new ErrorResponse("Login failed", 401))

        let token = sign({
            claims: { user: user.id }
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE
        })

        successResponse({
            res,
            data: { token }
        })
    }
}

export default AuthController