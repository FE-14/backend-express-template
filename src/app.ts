import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
// import { logger } from "./utils";
import { errorHandler } from "./middleware";
import router from "./routers";

const app = express();

/**
 * initial setup express
 */
app.use(morgan("common"));

/**
 * Setup middleware
 */
app.use(bodyParser.json());

/**
 * Register All route
 */
app.use("/api/v1", router);

/**
 * use error handler
 */
app.use(errorHandler);

/**
 * test case
 * TODO replace with unsigned route handler
 */
app.get("*", async (req: Request, res: Response) => {
	res.json({
		message: `This is reponse for coming request to ${req.path}`,
	});
});

export default app;
