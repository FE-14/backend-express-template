// TODO: swagger masuk controller
import fs from "fs";

let files = fs.readdirSync(`${__dirname}`);
files = files.filter((x: string) => {
    return x != 'index.ts' && x != 'auth.controller.ts' && x != 'welcome.controller.ts';
})
let controllers = files.map((d: string) => {
    let fileName = `./${d}`.replace('.ts','')
    let controller = require(fileName);

    return controller['default']
})

export default controllers