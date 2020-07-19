import { Request, Response } from "express";
import { asyncHandler, succeesResponse } from "../utils";
import { Project } from "../models";

/**
 * Get all projects
 */
export const getProject = asyncHandler(async (req: Request, res: Response) => {
	const projects = await Project.findAll();

	succeesResponse(res, projects);
});

/**
 * Create project
 */
export const postProject = asyncHandler(async (req: Request, res: Response) => {
	const newProject: Omit<Project, "id"> = req.body;
	const project = await Project.create(newProject);
	succeesResponse(res, project);
});
