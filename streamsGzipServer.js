import { createServer } from "http";
import { createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { basename, join } from "path";
import { mkdirp } from "mkdirp";
import { createDecipheriv, randomBytes } from "crypto";

const secret = randomBytes(24);

const server = createServer(async (req, res) => {
  const filename = basename(req.headers["x-filename"]);
  const iv = Buffer.from(req.headers["x-initialization-vector"], "hex");
  const destFilename = join("received_files", filename);
  console.log("File request received");

  await mkdirp("received_files");

  req
    .pipe(createDecipheriv("aes192", secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on("finish", () => {
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("OK\n");
      console.log("File saved");
    });
});

server.listen(3000, () => {
  console.info("Listening on port 3000");
});
