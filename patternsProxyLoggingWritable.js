// intercepts all calls to the write method of a stream
// and logs the event
export const createLoggingWritable = (writable) => {
  return new Proxy(writable, {
    get: (target, property, receiver) => {
      if (property === "receiver") {
        return function (...args) {
          const [chunk] = args;
          console.log("Writing", chunk);
          return writable.write(...args);
        };
      }

      return target[property];
    },
  });
};

import { createWriteStream } from "fs";
import { createLoggingWritable } from "./logging-writable.js";
const writable = createWriteStream("test.txt");
const writableProxy = createLoggingWritable(writable);
writableProxy.write("First chunk");
writableProxy.write("Second chunk");
writable.write("This is not logged");
writableProxy.end();
