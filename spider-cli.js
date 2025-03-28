import { spiderCleaned, spiderV2 } from "./spider.js";
import { spider } from "./promises.js";
import { spiderV4 } from "./spider.js";
import { TaskQueue } from "./taskQueue.js";

/*
// simple spider without links
spiderCleaned(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.error(err);
  } else if (downloaded) {
    console.log(`Downloaded into file ${filename}`);
  } else {
    console.info(`File ${filename} was already downloaded`);
  }
});
*/

/*
const url = process.argv[2];
const nesting = parseInt(process.argv[3], 10) || 2;
console.log(nesting);
spiderV2(url, nesting, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Download complete");
});
*/

const url = process.argv[2];
const nesting = Number.parseInt(process.argv[3], 10) || 1;
const concurrency = Number.parseInt(process.argv[4], 10) || 2;

/*
const spiderQueue = new TaskQueue(concurrency);
spiderQueue.on("error", console.error);
spiderQueue.on("empty", () => console.log("Download complete"));
spiderV4(url, nesting, spiderQueue);
*/

spider(url, nesting)
  .then(() => console.log("Download complete"))
  .catch((err) => console.error(err));
