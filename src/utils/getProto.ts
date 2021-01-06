import { writeFile } from 'fs'
import { promisify } from 'util'
import path from 'path'
import fetch from 'node-fetch'
const writeFilePromise = promisify(writeFile)

async function downloadFile(url: string, outputPath: string) {
  return fetch(url)
    .then(x => x.arrayBuffer())
    .then(x => writeFilePromise(outputPath, Buffer.from(x)))
}

const PROTO_PATH = path.normalize(`${__dirname}../../../${process.env.PROTO_PATH}/default.proto`)

async function updateProto() {
  await downloadFile(process.env.STATIC_URL, PROTO_PATH)
  console.log('Proto updated!')
}

export { PROTO_PATH }
export default updateProto