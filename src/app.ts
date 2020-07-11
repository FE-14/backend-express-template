import express, { Request, Response } from "express";
import morgan from "morgan";
import { logger } from "./utils";
import { errorHandler } from "./middleware";

import { User } from "./models/user.model";

const app = express();

/**
 * initial setup express
 */
app.use(morgan("common"));

/**
 * use error handler
 */
app.use(errorHandler);

/**
 * test case
 * TODO replace with unsigned route handler
 */
app.get("*", async (req: Request, res: Response) => {
	const user = await User.findAll();
	res.json({
		message: `This is reponse for coming request to ${req.path}`,
		data: user,
	});
});

export default app;
