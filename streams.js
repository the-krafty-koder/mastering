import { promises as fs } from "fs";
import { gzip } from "zlib";
import { promisify } from "util";
import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
const gzipPromise = promisify(gzip);

const filename = process.argv[2];

const main = async () => {
  const data = await fs.readFile(filename);
  const gzippedData = await gzipPromise(data);
  await fs.writeFile(`${filename}.zip`, gzippedData);
  console.log("Done");
};

//main();

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createWriteStream(`${filename}.gz`))
  .on("finish", () => console.log("File successfully compressed"));
