import { Request, Response } from "express";
import { asyncHandler, succeesResponse } from "../utils";
import { User } from "../models";

/**
 * Get all data from user table
 */
export const get = asyncHandler(async (req: Request, res: Response) => {
	succeesResponse(res, await User.findAll());
});

/**
 * create user to table user
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
	const user: Omit<User, "id"> = req.body;
	succeesResponse(res, await User.create(user));
});
