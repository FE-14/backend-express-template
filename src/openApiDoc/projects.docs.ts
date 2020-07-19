import { Schemas, Paths, ApiDoc } from "../keys/apidoc";
import { getSchemaResponse } from "../utils";

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
							schema: getSchemaResponse(
								"Project",
								"#/components/schemas/Project",
								"array"
							),
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
						schema: {
							$ref: "#/components/schemas/NewProject",
						},
					},
				},
			},
			responses: {
				200: {
					description: "Project Model Instance",
					content: {
						"application/json": {
							schema: getSchemaResponse(
								"Project",
								"#/components/schemas/Project",
								"object"
							),
						},
					},
				},
			},
		},
	},
};

export default { schema, paths } as ApiDoc;
