import { PassThrough } from "stream";
import { createReadStream } from "fs";
import { createBrotliCompress } from "zlib";
import { basename } from "path";
import { upload } from "upload.js";

let bytesWritten = 0;
const monitor = new PassThrough();
monitor.on("data", (chunk) => {
  bytesWritten += chunk.length;
});

monitor.on("finish", () => {
  console.log(`${bytesWritten} bytes written`);
});

monitor.write("Hello");
monitor.end();

// late piping

const filePath = process.argv[2];
const filename = basename(filePath);
const contentStream = new PassThrough();

upload(`${filename}.br`, contentStream)
  .then((response) => console.log(`Server response ${response.data}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

createReadStream(filePath).pipe(createBrotliCompress).pipe(contentStream);
