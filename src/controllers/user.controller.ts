import { Request, Response } from "express";
import { asyncHandler } from "../utils";
import { User } from "../models";

// const { DB_USER } = DB;

export const get = asyncHandler(async (req: Request, res: Response) => {
	const users = await User.findAll();
	res.json({
		data: users,
	});
});
