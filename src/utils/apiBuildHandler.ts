import { Response } from "express";
import { ItemModel } from "../keys/apidoc";

// Change the type to make not to ban types typescript
// eslint-disable-next-line @typescript-eslint/ban-types
export type DataType = object | object[];

/**
 * Resonponse with success message
 * @param res Reponse from express
 * @param data Model or Array of Model instance
 */
export const succeesResponse = (res: Response, data: DataType): Response => {
	return res.status(200).json({
		message: "success",
		data,
	});
};

/**
 * to build schema api docs on response section
 * @param title string of title
 * @param schemaModelRef string of path to component schema
 */
export const getSchemaResponse = (
	title: string,
	schemaModelRef: string,
	typeDataResp: "array" | "object"
): ItemModel => {
	title = typeDataResp === "array" ? title + "s" : title;
	const data: ItemModel =
		typeDataResp === "array"
			? {
					type: "array",
					items: {
						$ref: schemaModelRef,
					},
			  }
			: { $ref: schemaModelRef };

	return {
		type: "object",
		title: title + ".Response",
		properties: {
			message: {
				type: "string",
			},
			data,
		},
	};
};
