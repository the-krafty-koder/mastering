import { createServer } from "http";

const PORT = 8080;
createServer((req, res) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end("Hello from Node JS");
  console.log("Hello handler requested");
}).listen(8080, () =>
  console.log("Started Node.js http server at http://127.0.0.1:8180")
);
