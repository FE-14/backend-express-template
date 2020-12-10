import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { RouteDefinition } from "./interfaces/RouteDefinition.interface";
import { asyncHandler, errorResponse, successResponse } from "./utils";
import { apiDoc } from "./utils/generateApiDoc";
import { swaggerSchemas } from "./models";
import path from "path";
import staticGzip from "express-static-gzip";

class App {
  public app: Application;

  constructor(appInit: { middleWares: any; controllers?: any; actions?: any }) {
    this.app = express();
    const schemas = swaggerSchemas;
    for (const schema of schemas) {
      const routeSchemas = Object.keys(schema);
      for (const currentSchema of routeSchemas) {
        if (typeof apiDoc.components.schemas[currentSchema] == "undefined") {
          apiDoc.components.schemas[currentSchema] = schema[currentSchema];
        }
      }
    }

    this.actions(appInit.actions);
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private async actions(actions: {
    forEach: (arg0: (action: any) => void) => void;
  }) {
    actions.forEach(async (action) => {
      if (action.type) {
        await action.action(this.app);
      } else {
        await action();
      }
    });
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      const instance = new controller();
      const prefix = Reflect.getMetadata("prefix", controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata(
        "routes",
        controller
      );
      routes.forEach((route) => {
        this.app[route.requestMethod](
          `/api/v1${prefix}${route.path}`,
          route.middlewares,
          asyncHandler(async (req: express.Request, res: express.Response) => {
            try {
              return successResponse({
                res,
                data: await instance[route.methodName](req)
              });
            } catch (e) {
              console.log(e);
              return errorResponse({ res, msg: e, statusCode: 500 });
            }
          })
        );
        const paths = route.apiDoc.paths;
        const routePaths = Object.keys(paths);

        for (const path of routePaths) {
          const currentPath = `${prefix}${path}`;
          if (typeof apiDoc.paths[currentPath] == "undefined") {
            apiDoc.paths[currentPath] = paths[path];
          } else {
            apiDoc.paths[currentPath] = {
              ...apiDoc.paths[currentPath],
              ...paths[path]
            };
          }
        }
      });
    });

    this.app.use("/explorer", swaggerUi.serve, swaggerUi.setup(apiDoc));
    this.app.use("/static", staticGzip(path.normalize(`${__dirname}/../uploads`), {}));

    this.app.use("*", async (req: Request, res: Response) => {
      res.json({
        message: "sorry bos, alamat yang anda tuju tidak terdaftar"
      });
    });
  }
}

export default App;
