import { Controller, Get, Put, Post, Delete, Patch } from "../decorator";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import User from "../models/user.model";

@Controller("/user")
export default class UserController {
    @Post({ path: "/", tag: "UserPost" },
        [
            {
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
        ],
        {
            responses: [
                {
                    200: {
                        description: "Response post object",
                        responseType: "object",
                        schema: "User"
                    }
                }
            ]
        },
        [auth]
    )
    public index(req: Request, res: Response): any {
        return res.send("User overview");
    }

    @Get({ path: "/", tag: "UserPost" },
        [],
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
        [],
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
        [],
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
        [],
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
        })
    public patchUser(req: Request, res: Response): any {
        return res.send(`You are looking at the profile of ${req.params.name}`);
    }
}
