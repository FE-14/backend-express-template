/**
 * Import from all docs files
 */
import User from "./users.docs";
import { Response } from "../keys/apidoc";

/**
 * Register doc to load
 */
const allDocs = [User];

/**
 * Master swagger doc
 * TODO dibuat fungsi untuk generate info dari server
 */
const apiDoc = {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "MV BE Boilerplate",
		description: "This starting point to develop be using TS",
		license: {
			name: "MIT",
			url: "https://opensource.org/licenses/MIT",
		},
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
	security: ["basicAuth"],
	paths: {},
	components: {
		schemas: {
			ErrorResponse: {
				type: "object",
				properties: {
					status: {
						type: "string",
					},
					message: {
						type: "string",
					},
				},
			},
		},
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
};

/**
 * Default Error Response to register on all response
 * TODO belum kepake, need fix
 */
export const defaultErrorResponse: Response = {
	422: {
		description: "Invalid Token Response",
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/ErrorResponse",
				},
			},
		},
	},
	401: {
		description: "Not Authenticated",
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/ErrorResponse",
				},
			},
		},
	},
};

/**
 * generate from files
 */
allDocs.forEach((doc) => {
	apiDoc.paths = { ...apiDoc.paths, ...doc.paths };
	apiDoc.components.schemas = { ...apiDoc.components.schemas, ...doc.schema };
});

export default apiDoc;
