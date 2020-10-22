import "reflect-metadata";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import App from "./app";
import dotEnv from "dotenv";
import * as express from "express";
import modelInit from "./models";
import { RouteDefinition } from "./interfaces/RouteDefinition.interface";
import swaggerUi from "swagger-ui-express";
// import controllers from "./controllers";

dotEnv.config();

const { app } = new App({
    // TODO: buat dinamis
    // controllers: controllers,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors(),
        // TODO: simpan di file, pisah per hari
        morgan("combined"),
    ]
});


const apiDoc: any = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "MV BE Boilerplate",
        description: "This starting point to develop be using TS",
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
        },
    },
    servers: [
        {
            url: "/api/v1",
        },
    ],
    authAction: {
		JWT: {
			name: "JWT",
			schema: {
				type: "apiKey",
				in: "header",
				name: "Authorization",
				description: "sda",
			},
			value: "Bearer <JWT>",
		},
	},
	security: [
		{
			Bearer: [""],
		},
	],
    paths: {},
    components: {
        schemas: {
            ErrorResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
        },
        securitySchemes: {
			Bearer: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
    },
};

// read controller dynamic
const initController = async () => {
    const dir = await fs.readdirSync("./src/mycontroller");
    for (const file of dir) {
        const module = await import(`${__dirname}/mycontroller/${file}`).then((module) => {
            const controller = module.default;
            const instance = new controller();
            const prefix = Reflect.getMetadata("prefix", controller);
            const routes: Array<RouteDefinition> = Reflect.getMetadata("routes", controller);
            routes.forEach(route => {
                app[route.requestMethod](`/api/v1${prefix}${route.path}`, route.middlewares, (req: express.Request, res: express.Response) => {
                    instance[route.methodName](req, res);
                });
                const paths = route.apiDoc.paths;
                const routePaths = Object.keys(paths);
                for (const path of routePaths) {
                    const currentPath = `${prefix}${path}`;
                    if (typeof apiDoc.paths[currentPath] == "undefined") {
                        apiDoc.paths[currentPath] = paths[path];
                    } else {
                        apiDoc.paths[currentPath] = { ...apiDoc.paths[currentPath], ...paths[path] };
                    }
                }

                const schemas = route.apiDoc.schema;
                const routeSchemas = Object.keys(schemas);
                for (const schema of routeSchemas) {
                    if (typeof apiDoc.components.schemas[schema] == "undefined") {
                        apiDoc.components.schemas[schema] = schemas[schema];
                    }
                }
            });
        });
    }
};

const main = async () => {
    await initController();
    await modelInit();
    const PORT = +(process.env.PORT || 4000);
    app.use("/explorer", swaggerUi.serve, swaggerUi.setup(apiDoc));

    app.use("*", async (req: express.Request, res: express.Response) => {
        res.json({
            success: false,
            message: "sorry bos, alamat yang anda tuju tidak terdaftar"
        }).status(500);
    });
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`[LISTEN] 🚀🚀🚀  starting http://localhost:${PORT}/api/v1`);
    });
};

main();
