import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ErrorLog from "../interfaces/ErrorLog.interface";

const { JWT_SECRET } = process.env;

// TODO: add expired time when reach thresshold
export const auth = async (req: Request, res: Response, next: NextFunction) => {
	let authHeader: string
	let token: string

	try {
		authHeader = req.headers['authorization']

		if (!authHeader) throw 'Error no authorization header'

		token = authHeader.split(" ")[1]

		if (!token) throw 'Error no Bearer auth token provided'

		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) throw 'Error unauthenticated'

			next()
		})
	} catch (e) {
		return res.status(500).json({
			sucess: false,
			message: e
		})
	}
}