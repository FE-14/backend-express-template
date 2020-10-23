import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { RouteDefinition } from "./interfaces/RouteDefinition.interface";
import { apiDoc } from "./utils/generateApiDoc";

class App {
  public app: Application

  constructor(appInit: { middleWares: any; controllers?: any; }) {
    this.app = express();

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      let instance = new controller();
      let prefix = Reflect.getMetadata("prefix", controller);
      let routes: Array<RouteDefinition> = Reflect.getMetadata("routes", controller);

      routes.forEach((route) => {
        this.app[route.requestMethod](`/api/v1${prefix}${route.path}`, route.middlewares, (req: express.Request, res: express.Response) => {
          instance[route.methodName](req, res);
        });
        let paths = route.apiDoc.paths;
        let routePaths = Object.keys(paths);

        for (const path of routePaths) {
          const currentPath = `${prefix}${path}`;
          if (typeof apiDoc.paths[currentPath] == "undefined") {
            apiDoc.paths[currentPath] = paths[path];
          } else {
            apiDoc.paths[currentPath] = { ...apiDoc.paths[currentPath], ...paths[path] };
          }
        }

        let schemas = route.apiDoc.schemas;
        for (const schema of schemas) {
          const routeSchemas = Object.keys(schema);
          for (const currentSchema of routeSchemas) {
            if (typeof apiDoc.components.schemas[currentSchema] == "undefined") {
              apiDoc.components.schemas[currentSchema] = schema[currentSchema];
            }
          }
        }
      })
    });

    this.app.use("/explorer", swaggerUi.serve, swaggerUi.setup(apiDoc));

    this.app.use("*", async (req: Request, res: Response) => {
      res.json({
        message: "sorry bos, alamat yang anda tuju tidak terdaftar"
      });
    });
  }
}

export default App;
