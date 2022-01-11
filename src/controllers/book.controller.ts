import { _Request } from "../interfaces";
import { Controller, Delete, Get, Post, Put } from "../decorators";
import { Response } from "express";
import book, { bookAttributes } from "../models/book.model";
import { protoServices } from "..";
import { credentials } from "@grpc/grpc-js";

const tag = "book";

@Controller("/book")
export default class bookController {
  @Get(
    { path: "/", tag },
    {
      responses: [
        {
          200: {
            description: "",
            responseType: "array",
            schema: "book"
          }
        }
      ],
      parameters: []
    },
    []
  )
  public async getAll(req: _Request, res: Response): Promise<book[]> {
    const data = await book.findAll({});
    const greeter = new protoServices.Greeter(
      process.env.GRPC_SERVER,
      credentials.createInsecure()
    );

    const greeting = new Promise((resolve, reject) =>
      greeter.sayHello({ name: "World" }, function (err: any, response: any) {
        if (err) {
          return reject(err);
        }
        resolve(response);
      })
    );

    const bookGrpcResponse = await greeting;

    console.log(bookGrpcResponse);
    return data;
  }

  @Get(
    { path: "/:id", tag },
    {
      responses: [
        {
          200: {
            description: "",
            responseType: "array",
            schema: "book"
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
    },
    []
  )
  public async getOne(req: _Request, res: Response): Promise<book> {
    const { id } = req.params;

    const data = await book.findOne({
      where: {
        id
      }
    });

    if (!data) throw "Data not found";

    return data;
  }

  @Post(
    { path: "/", tag },
    {
      request: "NewBook",
      responses: [
        {
          200: {
            description: "",
            responseType: "object",
            schema: "Book"
          }
        }
      ]
    }
  )
  public async create(req: _Request, res: Response): Promise<book> {
    const { tittle, description }: bookAttributes = req.body;

    const data = await book.create({
      tittle,
      description
    });

    return data;
  }

  @Put(
    { path: "/:id", tag },
    {
      request: "NewBook",
      responses: [
        {
          200: {
            description: "",
            responseType: "object",
            schema: "book"
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
    }
  )
  public async update(req: _Request, res: Response): Promise<book> {
    const { id } = req.params;
    const { tittle, description }: bookAttributes = req.body;

    const update = await book.update(
      {
        tittle,
        description
      },
      {
        where: {
          id
        }
      }
    );

    const data = await book.findOne({
      where: {
        id
      }
    });

    return data;
  }

  @Delete(
    { path: "/:id", tag },
    {
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
    }
  )
  public async remove(req: _Request, res: Response): Promise<unknown> {
    const { id } = req.params;

    const remove = await book.destroy({
      where: {
        id
      }
    });

    return {
      message: "Deleted successfully."
    };
  }
}
