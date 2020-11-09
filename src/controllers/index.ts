import fs from "fs";

let files = fs.readdirSync(`${__dirname}`);
files = files.filter((x: string) => {
  return x != "index.ts" && x != "index.js";
});
const controllers = files.map((d: string) => {
  const fileName = `./${d}`.replace(".ts", "").replace(".js", "");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const controller = require(fileName);

  return controller["default"];
});

export default controllers;
