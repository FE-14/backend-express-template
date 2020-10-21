import jwt from "jsonwebtoken";
import { asyncHandler, ErrorResponse } from "../utils";
import { Request, Response, NextFunction } from "express";

const { JWT_SECRET } = process.env;

export const authenticate = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.get("Authorization");
		let token: string;

		if (authHeader && authHeader.startsWith("Bearer")) {
			token = authHeader.split(" ")[1];
		}

		if (!token) {
			return next(new ErrorResponse("Not authenticated", 401));
		}

		try {
			const decode = jwt.verify(token, JWT_SECRET);
			next();
		} catch (error) {
			return next(new ErrorResponse("Not authenticated", 401));
		}
	}
);
