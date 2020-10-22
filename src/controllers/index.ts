// TODO: swagger masuk controller
const fs = require('fs')

let files = fs.readdirSync(`${__dirname}`);
files = files.filter((x: string) => {
    return x != 'index.ts';
})
let controllers = files.map((d: string) => {
    let fileName = `./${d}`.replace('.ts','')
    let controller = require(fileName);

    return new controller['default']
})

export default controllers