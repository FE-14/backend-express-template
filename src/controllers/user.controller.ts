import { Request, Response } from "express";
import { asyncHandler } from "../utils";
import { User } from "../models";

// const { DB_USER } = DB;

export const get = asyncHandler(async (req: Request, res: Response) => {
	const users = await User.findAll();
	res.json(users);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
	const { username, password, firstName } = req.body;
	const user = await User.create({
		username,
		password,
		firstName,
	});
	res.json({
		message: "success",
		data: user,
	});
});
