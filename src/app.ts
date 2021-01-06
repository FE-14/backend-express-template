import express, { Application, Request, Response } from "express";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";
import { RouteDefinition } from "./interfaces/RouteDefinition.interface";
import { asyncHandler, errorResponse, successResponse } from "./utils";
import { apiDoc } from "./utils/generateApiDoc";
import { swaggerSchemas } from "./models";
import path from "path";
import staticGzip from "express-static-gzip";
import { GrpcObject, loadPackageDefinition, Server } from '@grpc/grpc-js'
import { PackageDefinition, loadSync } from '@grpc/proto-loader'
import { PROTO_PATH } from "./utils/getProto";
import { Schemas } from "./keys/apidoc";
import ExampleService from "./services/example.services";

class App {
  public app: Application;
  public grpcServer: Server;
  public protoServices: GrpcObject;
  public packageDefinition: PackageDefinition;
  private swaggerOption: SwaggerUiOptions = {
    swaggerOptions: {
      filter: true
    }
  };

  constructor(appInit: { middleWares: any; controllers?: any; actions?: any }) {
    this.app = express();
    this.grpcServer = new Server();

    this.services();
    this.schemas(swaggerSchemas);
    this.actions(appInit.actions);
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private services() {
    this.packageDefinition = loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
    this.protoServices = loadPackageDefinition(this.packageDefinition).HelloWorld
    this.grpcServer.addService(this.protoServices.Greeter.service, {
      sayHello: ExampleService.sayHello
    })
  }

  private async schemas(schemas: Schemas[]) {
    for (const schema of schemas) {
      const routeSchemas = Object.keys(schema);
      for (const currentSchema of routeSchemas) {
        if (typeof apiDoc.components.schemas[currentSchema] == "undefined") {
          apiDoc.components.schemas[currentSchema] = schema[currentSchema];
        }
      }
    }
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
              console.error(e);
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

    this.app.use(
      "/explorer",
      swaggerUi.serve,
      swaggerUi.setup(apiDoc, this.swaggerOption)
    );
    this.app.use(
      "/static",
      staticGzip(path.normalize(`${__dirname}/../uploads`), {})
    );
    this.app.use(
      "/proto",
      staticGzip(path.normalize(`${__dirname}/../protos`), {})
    );

    this.app.use("*", async (req: Request, res: Response) => {
      res.json({
        message: "sorry bos, alamat yang anda tuju tidak terdaftar"
      });
    });
  }
}

export default App;
