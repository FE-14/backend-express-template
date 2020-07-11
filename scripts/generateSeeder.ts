import yargs from "yargs";
import { generateFile } from "./generateHelper";

const argv = yargs
	.option("name", {
		alias: "n",
		description: "Set the name of th seeder",
		type: "string",
	})
	.help()
	.alias("help", "h").argv;

let fileName = "seeder-file";

if (argv.name) {
	fileName = argv.name;
} else {
	console.error("name notfound");
}

const contentToWrite = [
	'import { QueryInterface } from "sequelize";',
	"",
	"export const up = async (query: QueryInterface) => {",
	"	try {",
	"		/**",
	"		 * code will execute to seeder process",
	"		 */",
	"	} catch (error) {",
	"		return Promise.reject(error);",
	"	}",
	"};",
	"",
	"export const down = async (query: QueryInterface) => {",
	"	try {",
	"		/**",
	"		 * code will execute on revert seeder",
	"		 */",
	"	} catch (error) {",
	"		return Promise.reject(error);",
	"	}",
	"};",
	"",
];

/**
 * run generate
 * * path need end with / till path resolve work
 * TODO fix first param with path resolve
 */
generateFile("./src/seeders/", fileName, contentToWrite);
