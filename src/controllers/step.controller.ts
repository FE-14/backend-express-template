import { Controller, Get, Put, Post, Delete } from "../decorators";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import Step from "../models/Step.model";
import { successResponse, errorResponse } from "../utils";

@Controller("/steps")
export default class StepController {
    @Post({ path: "/", tag: "StepController" },
        {
            responses: [
                {
                    200: {
                        description: "Response post object",
                        responseType: "object",
                        schema: "Step"
                    },
                }
            ],
            request: "NewStep"
        },
        [auth]
    )
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
            lineId,
            areaId
        } = req.body;
        try {
            if (!name || !lineId || !areaId) {
                throw "name is required";
            }
            const currentStep = await Step.findOne({
                where: {
                    name
                }
            });

            if (currentStep) throw "Failed to create. This step was exist";

            const step = await Step.create({
                name,
                lineId,
                areaId
            });

            if (currentStep) throw "Failed to create";

            return successResponse({ res, data: step });
        } catch (e) {
            return res.status(500).json({
                sucess: false,
                message: e
            });
        }
    }

    @Get({ path: "/", tag: "StepController" },
        {
            responses: [
                {
                    200: {
                        description: "Response get object",
                        responseType: "array",
                        schema: "Step"
                    }
                }
            ]
        })
    public async gets(req: Request, res: Response): Promise<Response> {
        const steps = await Step.findAll();
        return successResponse({ res, data: steps });
    }

    @Get({ path: "/:id", tag: "StepController" },
        {
            responses: [
                {
                    200: {
                        description: "Response get object",
                        responseType: "object",
                        schema: "Step"
                    }
                }
            ],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    schema: {
                        id: {
                            type: "number"
                        }
                    },
                    required: true
                }
            ]
        })
    public async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const step = await Step.findOne({
            where: {
                id
            },
        });

        if (!step) return errorResponse({ res, msg: `Step with id ${id} not found`, statusCode: 404 });

        return successResponse({ res, data: step });
    }

    @Put({ path: "/:id", tag: "StepController" },
        {
            responses: [
                {
                    200: {
                        description: "Response put object",
                        responseType: "object",
                        schema: "Step"
                    }
                }
            ],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    schema: {
                        id: {
                            type: "number"
                        }
                    },
                    required: true
                }
            ],
            request: {
                properties: {
                    name: {
                        type: "string"
                    },
                    lineId: {
                        type: "number"
                    },
                    areaId: {
                        type: "number"
                    }
                }
            }
        })
    public async edit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { 
            name,
            lineId,
            areaId
        } = req.body;
        const step = await Step.findOne({
            where: {
                id
            },
        });

        if (!step) return errorResponse({ res, msg: `Step with id ${id} not found`, statusCode: 404 });

        const newStep = await step.update({
            name,
            lineId,
            areaId
        });

        return successResponse({ res, data: newStep });
    }

    @Delete({ path: "/:id", tag: "StepController" },
        {
            responses: [
                {
                    200: {
                        description: "Response delete",
                        responseType: "object",
                        schema: {
                            properties: {
                                success: {
                                    type: "boolean"
                                }
                            }
                        }
                    }
                }
            ],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    schema: {
                        id: {
                            type: "number"
                        }
                    },
                    required: true
                }
            ]
        },
        [auth]
    )
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const step = await Step.findOne({
            where: {
                id
            },
        });

        if (!step) return errorResponse({ res, msg: `Step with id ${id} not found`, statusCode: 404 });

        await step.destroy();

        return successResponse({ res, data: null });
    }
}
