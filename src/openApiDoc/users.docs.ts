import { Schemas, Paths, ApiDoc } from "../keys/apidoc";
import { getSchemaResponse, getSchemaRequest } from "../utils";

/**
 * Set Tag for this doc
 */
const tag = "UserController";

/**
 * Define schema first
 */
const schema: Schemas = {
	User: {
		title: "User",
		properties: {
			id: {
				type: "number",
			},
			username: {
				type: "string",
			},
			password: {
				type: "string",
			},
			firstName: {
				type: "string",
			},
		},
	},
	NewUser: {
		title: "NewUser",
		properties: {
			username: {
				type: "string",
			},
			password: {
				type: "string",
			},
			firstName: {
				type: "string",
			},
		},
		required: ["username", "password", "firstName"],
	},
};

/**
 * Define Paths
 */
const paths: Paths = {
	"/users": {
		post: {
			tags: [tag],
			responses: {
				200: {
					description: "User Model Instance",
					content: {
						"application/json": {
							schema: getSchemaResponse("User", "User", "object"),
						},
					},
				},
			},
			requestBody: {
				content: {
					"application/json": {
						schema: getSchemaRequest("NewUser"),
					},
				},
			},
		},
		get: {
			tags: [tag],
			responses: {
				200: {
					description: "Array of User Model Instance",
					content: {
						"application/json": {
							schema: getSchemaResponse("User", "User", "array"),
						},
					},
				},
			},
			parameters: [
				{
					name: "name",
					in: "query",
					schema: {
						name: {
							type: "string",
						},
					},
				},
			],
		},
	},
	"/users/{id}": {
		get: {
			tags: [tag],
			responses: {
				200: {
					description: "User Mode Intance",
					content: {
						"application/json": {
							schema: getSchemaResponse("User", "User", "object"),
						},
					},
				},
			},
			parameters: [
				{
					name: "id",
					in: "path",
					schema: {
						id: {
							type: "number",
						},
					},
				},
			],
		},
	},
};

export default { schema, paths } as ApiDoc;
