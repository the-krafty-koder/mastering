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

export const handleRequest = (req, res) => {
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
};
