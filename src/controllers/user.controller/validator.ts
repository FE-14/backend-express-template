import { Schema } from "express-validator";

export const newUserValidatorSchema: Schema = {
	username: {
		in: "body",
		isString: true,
		isLength: {
			options: {
				min: 5,
			},
		},
	},
	password: {
		isAlphanumeric: true,
		isLength: {
			options: {
				min: 5,
			},
		},
	},
	firstName: {
		exists: true,
	},
};
