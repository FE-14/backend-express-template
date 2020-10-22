import { Schemas, Response, Paths } from "../keys/apidoc";
import { getSchemaResponse } from "./index";
export interface ResponseSwagger {
  [statusCode: number]: {
    description: string,
    schema: string,
    responseType: "array" | "object"
  }
}

export interface Payload {
  responses: ResponseSwagger[],
  request?: any,
  parameters?: any
}
export const GenerateApiDoc = (properties: { path: string, tag: string, method: string }, schemas: Schemas[], payload: Payload): { paths: Paths, schemas: Schemas[] } => {
  const paths: any = {};
  const responses: Response = {};
  for (const response of payload.responses) {
    const statusCode = Object.keys(response);
    const responseBody = Object.values(response);
    responses[Number(statusCode[0])] = {
      description: responseBody[0].description,
      content: {
        "application/json": {
          schema: getSchemaResponse(responseBody[0].description, responseBody[0].schema, responseBody[0].responseType)
        }
      }
    };
  }
  paths[properties.path] = {};
  paths[properties.path][properties.method] = {
    tags: [properties.tag],
    responses
  };

  const apiDoc: { paths: Paths, schemas: Schemas[] } = {
    paths,
    schemas
  };
  return apiDoc;
};
