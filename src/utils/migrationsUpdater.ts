import fs from "fs";

let migrationDir = `./src/migrations`;
let files = fs.readdirSync(migrationDir);
let timestamp = new Date().getTime();

files.forEach((file) => {
  let fileName = file.split(".");
  fs.renameSync(
    `${migrationDir}/${file}`,
    `${migrationDir}/${timestamp}.${fileName[1]}.ts`
  );
});
