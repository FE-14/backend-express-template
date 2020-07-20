import { Request, Response } from "express";
import {
	asyncHandler,
	succeesResponse,
	validationFailResponse,
} from "../../utils";
import { User } from "../../models";
import { validationResult } from "express-validator";
import { genSalt, hash } from "bcrypt";

/**
 * for re exporting validator
 */
export * from "./validator";

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
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return validationFailResponse(res, error.array());
	}

	const user: Omit<User, "id"> = req.body;

	//password hash
	const salt = await genSalt(10);
	user.password = await hash(user.password, salt);

	succeesResponse(res, await User.create(user));
});

/**
 * get single user
 */
export const getUser = asyncHandler(async (req: Request, res: Response) => {
	const id: number = +req.params.id;
	succeesResponse(res, await User.findByPk(id));
});
