import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

// import { logger } from "./utils";
import { errorHandler } from "./middleware";
import router from "./routers";
import apiDoc from "./openApiDoc";

const app = express();

/**
 * initial setup express
 */
app.use(morgan("dev"));
app.use(cors());

/**
 * Setup middleware
 */
app.use(bodyParser.json());

/**
 * Register All route
 */
app.use("/api/v1", router);

/**
 * Register Api document
 */
app.use("/explorer", swaggerUi.serve, swaggerUi.setup(apiDoc()));

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
		message: "sorry bos, alamat yang anda tuju tidak terdaftar",
	});
});

export default app;
