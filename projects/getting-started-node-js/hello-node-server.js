import { createServer } from "http";

const PORT = 8080;

const handleGetRequest = (req, res) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end("Get request was requested");
};

const handlePostRequest = (req, res) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end("Post action was requested");
};

const handlePutRequest = (req, res) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end("Put action was requested");
};

const handleDeleteRequest = (req, res) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end("Delete action was requested");
};

const handleBadRequest = (req, res) => {
  res.writeHead(400, {
    "Content-Type": "text/plain",
  });

  res.end("Unsupported format");
};

createServer((req, res) => {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    case "POST":
      handlePostRequest(req, res);
      break;
    case "PUT":
      handlePutRequest(req, res);
      break;
    case "DELETE":
      handleDeleteRequest(req, res);
      break;
    default:
      handleBadRequest(req, res);
  }
}).listen(8080, () =>
  console.log("Started Node.js http server at http://127.0.0.1:8180")
);
