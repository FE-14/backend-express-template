import { Controller, Get, Put, Post, Delete, Patch } from "../decorators";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import { User } from "../models";
import { genSalt, hash } from "bcryptjs";

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
        []
    )
    public async index(req: Request, res: Response): Promise<any> {
        const salt = await genSalt(12);
        const password = await hash("baguse", salt);
        const user = await  User.create({
            firstName: "baguse",
            username: "baguse",
            password
        });
        return res.send(user);
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
