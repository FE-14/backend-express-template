import fs from "fs";

let files = fs.readdirSync(`${__dirname}`);
files = files.filter((x: string) => {
    return x != "index.ts";
});
const controllers = files.map((d: string) => {
    const fileName = `./${d}`.replace(".ts", "");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const controller = require(fileName);

    return controller["default"];
});

export default controllers;
