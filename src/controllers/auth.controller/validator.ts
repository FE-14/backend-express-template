import { Schema } from "express-validator";

export const loginValidator: Schema = {
	username: {
		exists: true,
	},
	password: {
		exists: true,
	},
};
