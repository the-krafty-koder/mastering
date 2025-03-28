import { delay } from "./promises.js";
import { dirname } from "path";
import { promises as fsPromises } from "fs";

const playWithDelays = async () => {
  console.log(`Delaying...${new Date()}`);
  const dateAfterASecond = await delay(1000);
  console.log(`New date ${dateAfterASecond}`);
  const dateAfterThreeSeconds = await delay(3000);
  console.log(`Date after 3 seconds ${dateAfterThreeSeconds}`);

  return "Done";
};

const delayError = (milliseconds) => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Error occurred")), milliseconds)
  );
};

//playWithDelays().then((result) => console.log(`After 4 seconds ${result}`));
const playingWithErrors = async () => {
  try {
    await delayError(1000);
  } catch (err) {
    console.error(`Error is ${err}`);
  } finally {
    console.log("Done");
  }
};

// playingWithErrors();

const download = async (url, filename) => {
  console.log(`Downloading ${url}`);
  const { text: content } = await superagent.get(url);
  await mkdirp(dirname(filename));
  await fsPromises.writeFile(filename, content);
  console.log("Download done");
  return content;
};

//sequential execution
const spiderLinks = async (currentUrl, content, nesting) => {
  if (nesting === 0) {
    return;
  }
  const links = getPageLinks(currentUrl, content);
  for (const link of links) {
    await spider(link, nesting - 1);
  }

  return promise;
};

const spiderLinksV2 = (currentUrl, content, nesting) => {
  let promise = Promise.resolve();
  if (nesting === 0) {
    return promise;
  }
  const links = getPageLinks(currentUrl, content);
  const spiders = links.map((link) => spider(link, nesting - 1));
  return Promise.all(spiders);
};

export const spider = async (url, nesting) => {
  const filename = urlToFilename(url);
  let content;
  try {
    await fsPromises.readFile(filename, "utf-8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }

    content = await download(url, filename);
  }

  return spiderLinks(url, content, nesting);
};
