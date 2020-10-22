import {RouteDefinition} from "../interfaces/RouteDefinition.interface";
import {ApiDoc, Schemas} from "../keys/apidoc";
import {getSchemaResponse} from "../utils";

export const Patch = (path: string, schemas: { tag: string, description: string, schema?: Schemas, type: "array" | "object" } ): MethodDecorator => {
  return (target, propertyKey: string): void => {
    // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
    // To prevent any further validation simply set it to an empty array here.
    if (! Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    // Get the routes stored so far, extend it by the new route and re-set the metadata.
    const routes = Reflect.getMetadata("routes", target.constructor) as Array<RouteDefinition>;

    const paths: any = {};
    paths[path] ={
        patch: {
          tags: [schemas.tag],
          responses: {
            200: {
              description: schemas.description,
              content: {
                "application/json": {
                  schema: getSchemaResponse(schemas.tag, schemas.tag, schemas.type)
                }
              }
            }
          }
        }
    };

    const apiDoc: ApiDoc = {
      paths,
      schema: schemas.schema
    };
    routes.push({
      requestMethod: "patch",
      path,
      methodName: propertyKey,
      apiDoc
    });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};
