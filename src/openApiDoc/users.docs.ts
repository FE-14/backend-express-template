import { Schemas, Paths, ApiDoc } from "../keys/apidoc";

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
	"/api/v1/users": {
		post: {
			tags: [tag],
			responses: {
				200: {
					description: "User Model Instance",
					content: {
						"application/json": {
							schema: {
								type: "object",
								title: "Post.User.Response",
								properties: {
									message: {
										type: "string",
									},
									data: {
										$ref: "#/components/schemas/User",
									},
								},
							},
						},
					},
				},
			},
			requestBody: {
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/NewUser",
						},
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
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/User",
								},
							},
						},
					},
				},
			},
			parameters: [
				{
					name: "name",
					in: "query",
					content: {
						"application/json": {
							schema: {
								type: "string",
							},
						},
					},
				},
			],
		},
	},
};

export default { schema, paths } as ApiDoc;
