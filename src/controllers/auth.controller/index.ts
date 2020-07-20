import { Request, Response, NextFunction } from "express";
import { compare, compareSync } from "bcrypt";
import { validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import {
	asyncHandler,
	validationFailResponse,
	ErrorResponse,
	envConfig,
	succeesResponse,
} from "../../utils";
import { User } from "../../models/user.model";

/**
 * body login schema
 */
interface BodyLogin {
	username: string;
	password: string;
}

/**
 * get data env
 */
const { JWT_SECRET, JWT_EXPIRE } = envConfig;

/**
 * re export validator
 */
export * from "./validator";

/**
 * Login Handler
 */
export const loginHandler = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// validation body
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return validationFailResponse(res, error.array());
		}

		// verify password
		const bodyLogin: BodyLogin = req.body;

		const user = await User.findOne({
			where: {
				username: bodyLogin.username,
			},
		});
		if (!user) {
			return next(new ErrorResponse("Login Failed", 401));
		}

		const hashResult = await compareSync(user.password, bodyLogin.password);
		console.log(user.password);
		console.log(hashResult);
		if (!hashResult) {
			return next(new ErrorResponse("Login Failed", 401));
		}

		// generate token
		const token = sign({ claims: { user: user.id } }, JWT_SECRET, {
			expiresIn: JWT_EXPIRE,
		});

		// response token
		succeesResponse(res, { token });
	}
);
