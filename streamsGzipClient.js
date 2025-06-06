import { request } from "http";
import { createCipheriv, randomBytes } from "crypto";
import { createReadStream } from "fs";
import { createGzip } from "zlib";
import { basename } from "path";

const secret = Buffer.from(process.argv[4], "hex");
const filename = process.argv[2];
const serverHost = process.argv[3];
const iv = randomBytes(16);

const httpRequestOptions = {
  hostname: serverHost,
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
    "X-Filename": basename(filename),
    "X-Initialization-Vector": iv.toString("hex"),
  },
};

const req = request(httpRequestOptions, (res) => {
  console.log(`Server response: ${res.statusCode}`);
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createCipheriv("aes192", secret, iv))
  .pipe(req)
  .on("finish", () => console.log("File successfully sent"));
