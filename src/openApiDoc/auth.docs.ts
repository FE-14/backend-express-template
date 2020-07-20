import { Paths, Schemas, ApiDoc } from "../keys/apidoc";
import { getSchemaRequest, getSchemaResponse } from "../utils";

/**
 * set Tag
 */
const tag = "AuthController";

/**
 * set Schema
 */
const schema: Schemas = {
	UserLogin: {
		title: "UserLogin",
		properties: {
			username: {
				type: "string",
			},
			password: {
				type: "string",
			},
		},
		required: ["username", "password"],
	},
	UserToken: {
		title: "UserToken",
		properties: {
			token: {
				type: "string",
			},
		},
	},
};

/**
 * set paths
 */
const paths: Paths = {
	"/auths/login": {
		post: {
			tags: [tag],
			requestBody: {
				content: {
					"application/json": {
						schema: getSchemaRequest("UserLogin"),
					},
				},
			},
			responses: {
				200: {
					description: "Token for Bearer Auth",
					content: {
						"application/json": {
							schema: getSchemaResponse("Token", "UserToken", "object"),
						},
					},
				},
			},
		},
	},
};

export default { schema, paths } as ApiDoc;
