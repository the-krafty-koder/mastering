import { createReadStream, createWriteStream } from "fs";
import { createHash } from "crypto";

const filename = process.argv[2];
const sha1stream = createHash("sha1").setEncoding("hex");
const md5stream = createHash("md5").setEncoding("hex");
const inputStream = createReadStream(filename);

inputStream.pipe(sha1stream).pipe(createWriteStream(`${filename}.sha1`));

inputStream.pipe(md5stream).pipe(createWriteStream(`${filename}.md5`));
