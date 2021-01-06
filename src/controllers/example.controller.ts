import { _Request } from "../interfaces";
import { Controller, Delete, Get, Post, Put } from "../decorators";
import { Response } from "express";
import Example, { ExampleAttributes } from "../models/example.model";
import { protoServices } from "..";
import { credentials } from '@grpc/grpc-js'

const tag = "Example";

@Controller("/examples")
export default class ExampleController {
  private greeter = new protoServices.Greeter(process.env.GRPC_SERVER, credentials.createInsecure())

  @Get({ path: "/", tag }, {
    responses: [
      {
        200: {
          description: "",
          responseType: "array",
          schema: "Example"
        }
      }
    ],
    parameters: []
  }, [])
  public async getAll(req: _Request, res: Response): Promise<Example[]> {
    const data = await Example.findAll({});
    this.greeter.sayHello({ name: 'World' }, function (err: any, response: any) {
      console.log('Greeting:', response.message)
    })

    return data;
  }

  @Get({ path: "/:id", tag }, {
    responses: [
      {
        200: {
          description: "",
          responseType: "array",
          schema: "Example"
        }
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          type: "number"
        }
      }
    ]
  }, [])
  public async getOne(req: _Request, res: Response): Promise<Example> {
    const { id } = req.params;

    const data = await Example.findOne({
      where: {
        id
      }
    });

    if (!data) throw "Data not found";

    return data;
  }

  @Post({ path: "/", tag }, {
    request: "NewExample",
    responses: [
      {
        200: {
          description: "",
          responseType: "object",
          schema: "Example"
        }
      }
    ],
  })
  public async create(req: _Request, res: Response): Promise<Example> {
    const {
      name,
      description
    }: ExampleAttributes = req.body;

    const data = await Example.create({
      name,
      description
    });

    return data;
  }

  @Put({ path: "/:id", tag }, {
    request: "NewExample",
    responses: [
      {
        200: {
          description: "",
          responseType: "object",
          schema: "Example"
        }
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "number"
        }
      }
    ]
  })
  public async update(req: _Request, res: Response): Promise<Example> {
    const {
      id
    } = req.params;
    const {
      name,
      description
    }: ExampleAttributes = req.body;

    const update = await Example.update({
      name,
      description
    }, {
      where: {
        id
      }
    });

    const data = await Example.findOne({
      where: {
        id
      }
    });

    return data;
  }

  @Delete({ path: "/:id", tag }, {
    responses: [
      {
        200: {
          description: "",
          responseType: "object",
          schema: {
            properties: {
              message: {
                type: "string"
              }
            }
          }
        }
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "number"
        }
      }
    ]
  })
  public async remove(req: _Request, res: Response): Promise<unknown> {
    const {
      id
    } = req.params;

    const remove = await Example.destroy({
      where: {
        id
      }
    });

    return {
      message: "Deleted successfully."
    };
  }
}
