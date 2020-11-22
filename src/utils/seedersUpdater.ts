import fs from "fs";

let seederDir = `./dist/seeders`;
let files = fs.readdirSync(seederDir);
let timestamp = new Date().getTime();

files.forEach((file) => {
  let fileName = file.split(".");
  fs.renameSync(
    `${seederDir}/${file}`,
    `${seederDir}/${timestamp}.${fileName[1]}.js`
  );
});
