import { Schemas, Paths, ApiDoc } from "../keys/apidoc";
import { getSchemaResponse, getSchemaRequest } from "../utils";

/**
 * set Tag
 */
const tag = "ProjectController";

/**
 * Set Schema
 */
const schema: Schemas = {
	Project: {
		title: "Project",
		properties: {
			id: {
				type: "number",
			},
			userId: {
				type: "number",
			},
			name: {
				type: "string",
			},
		},
	},
	NewProject: {
		title: "NewProject",
		properties: {
			userId: {
				type: "number",
			},
			name: {
				type: "string",
			},
		},
		required: ["userId", "name"],
	},
};

/**
 * set paths
 */
const paths: Paths = {
	"/api/v1/projects": {
		get: {
			tags: [tag],
			responses: {
				200: {
					description: "Project Model Instance",
					content: {
						"application/json": {
							schema: getSchemaResponse("Project", "Project", "array"),
						},
					},
				},
			},
		},
		post: {
			tags: [tag],
			requestBody: {
				content: {
					"application/json": {
						schema: getSchemaRequest("NewProject"),
					},
				},
			},
			responses: {
				200: {
					description: "Project Model Instance",
					content: {
						"application/json": {
							schema: getSchemaResponse("Project", "Project", "object"),
						},
					},
				},
			},
		},
	},
};

export default { schema, paths } as ApiDoc;
