import jwt from "jsonwebtoken";
import { asyncHandler, ErrorResponse } from "../utils";
import { Request, Response, NextFunction } from "express";

const { JWT_SECRET } = process.env;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	let token: string;

	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1]
	} else {
		return res.status(403).send({
			success: false,
			message: "Error no auth token provided",
		});
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				success: false,
				message: "Error unauthenticated",
			});
		}

		next()
	})
}