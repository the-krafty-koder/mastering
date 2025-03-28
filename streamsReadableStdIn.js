import { Readable } from "stream";
import Chance from "chance";
// non-flowing mode
/*
process.stdin
  .on("readable", () => {
    let chunk;
    console.log("New data available");
    while ((chunk = process.stdin.setEncoding("utf-8").read()) !== null) {
      console.log(`Chunk read ${chunk.length} bytes: ${chunk.toString()}`);
    }
  })
  .on("end", () => console.log("End of stream"));

// flowing mode
process.stdin.on("data", (chunk) => {
  console.log("New data available");
  console.log(`Chunk read ${chunk.length}: ${chunk.toString()}`);
});
*/

// implementation of a readable stream

const chance = new Chance();

export class RandomStream extends Readable {
  constructor(options) {
    super(options);
    this.emmittedBytes = 0;
  }

  _read(size) {
    const chunk = chance.string({ length: size });
    this.push(chunk, "utf8");
    this.emmittedBytes += chunk.length;
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}

/*
const randomStream = new RandomStream();
randomStream
  .on("data", (chunk) => {
    console.log(`Chunk read ${chunk.length} bytes: ${chunk.toString()}`);
  })
  .on("end", () => {
    console.log(`Produced ${randomStream.emmittedBytes} bytes`);
  });
*/

// simplified
const random = new Chance();
let emmittedBytes = 0;

const randomStream2 = new Readable({
  read(size) {
    const chunk = random.string({ length: size });
    this.push(chunk, "utf8");
    emmittedBytes += chunk.length;
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  },
});

randomStream2
  .on("data", (chunk) => {
    console.log(`Chunk read ${chunk.length} bytes: ${chunk.toString()}`);
  })
  .on("end", () => {
    console.log(`Produced ${randomStream2.emmittedBytes} bytes`);
  });
