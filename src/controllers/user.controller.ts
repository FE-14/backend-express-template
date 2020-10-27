import { Controller, Get, Put, Post, Delete, Patch } from "../decorators";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import { genSalt, hash } from "bcryptjs";
import User from "../models/user.model";

@Controller("/users")
export default class UserController {
    @Post({ path: "/", tag: "UserPost" },
        {
            responses: [
                {
                    200: {
                        description: "Response post object",
                        responseType: "object",
                        schema: "User"
                    },
                    500: {
                        description: "Response post object",
                        responseType: "object",
                        schema: "User"
                    },
                }
            ]
        },
        [auth]
    )
    public async index(req: Request, res: Response): Promise<any> {
        try {
            if (!req.body.username || !req.body.password) {
                throw 'username and password is required'
            }
            const currentUser = await User.findOne({
                where: {
                    username: req.body.username
                }
            })

            if (currentUser) throw 'user exist'

            const salt = await genSalt(12);
            const password = await hash(req.body.password, salt);

            const user = await User.create({
                firstName: req.body.firstName,
                username: req.body.username,
                password
            });

            if (!user) throw 'cant create user'

            return res.json(user);
        } catch (e) {
            return res.status(500).json({
                sucess: false,
                message: e
            })
        }
    }

    @Get({ path: "/", tag: "UserPost" },
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
    public async getUsers(req: Request, res: Response): Promise<any> {
        const a = await User.findAll();
        console.log({ a });
        return res.send("User overview");
    }

    @Put({ path: "/", tag: "UserPost" },
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
        })
    public details(req: Request, res: Response): any {
        return res.send(`You are looking at the profile of ${req.params.name}`);
    }

    @Delete({ path: "/", tag: "UserPost" },
        {
            responses: [
                {
                    200: {
                        description: "Response delete array",
                        responseType: "array",
                        schema: "User"
                    }
                }
            ]
        })
    public delete(req: Request, res: Response): any {
        return res.send(`You are looking at the profile of ${req.params.name}`);
    }

    @Patch({ path: "/", tag: "UserPost" },
        {
            responses: [
                {
                    200: {
                        description: "Response patch array",
                        responseType: "array",
                        schema: "User"
                    }
                }
            ]
        },
        [auth])
    public patchUser(req: Request, res: Response): any {
        return res.send(`You are looking at the profile of ${req.params.name}`);
    }
}
