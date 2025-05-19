import { createServer } from "http";
import { handleRequest } from "./http-module.js";

createServer(handleRequest).listen(8080, () => {
  console.log("Server running");
});
