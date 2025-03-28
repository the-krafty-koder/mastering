import fs from "fs";
import path from "path";
import superagent from "superagent";
import { mkdirp } from "mkdirp";
import { urlToFilename, getPageLinks } from "./utils.js";

export const spider = (url, cb) => {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    // [1]
    if (err && err.code === "ENOENT") {
      console.log(`Downloading ${url} into ${filename}`);
      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          mkdirp(path.dirname(filename))
            .then(() => {
              fs.writeFile(filename, res.text, (err) => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              });
            })
            .catch((err) => {
              cb(err);
            });
        }
      });
    } else {
      cb(null, filename, false);
    }
  });
};

export const saveFile = (filename, contents, cb) => {
  mkdirp(path.dirname(filename))
    .then(() => {
      fs.writeFile(filename, contents, cb);
    })
    .catch((err) => cb(err));
};

export const download = (url, filename, cb) => {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
};

export const spiderCleaned = (url, cb) => {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    if (!err || err.code !== "ENOENT") {
      return cb(null, filename, false);
    }
    download(url, filename, (err) => {
      if (err) {
        cb(err);
      }
      cb(null, filename, true);
    });
  });
};

const spiderLinks = (currentUrl, body, nesting, cb) => {
  if (nesting === 0) {
    console.log("here");
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);
  console.log(links);

  if (links.length === 0) {
    return process.nextTick(cb);
  }

  const iterate = (index) => {
    if (index === links.length) {
      return cb();
    }

    spiderV2(links[index], nesting - 1, (err) => {
      if (err) {
        return cb(err);
      }
      iterate(index + 1);
    });
  };

  iterate(0);
};

export const spiderV2 = (url, nesting, cb) => {
  const filename = urlToFilename(url);
  fs.readFile(filename, "utf-8", (err, fileContent) => {
    if (err) {
      if (err.code !== "ENOENT") {
        return cb(err);
      }

      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, cb);
      });
    }

    spiderLinks(url, fileContent, nesting, cb);
  });
};

const spiderLinksV3 = (currentUrl, body, nesting, cb) => {
  if (nesting === 0) {
    console.log("here");
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);

  let completed = 0;
  let hasErrors = false;

  const done = (err) => {
    if (err) {
      hasErrors = true;
      return cb(err);
    }
    if (++completed === links.length && !hasErrors) {
      return cb();
    }
  };

  links.forEach((link) => spiderV3(link, requestContent, nesting - 1, done));
};

const spidering = new Set();

export const spiderV3 = (url, nesting, cb) => {
  if (spidering.has(url)) {
    return process.nextTick(cb);
  }
  spidering.add(url);
  const filename = urlToFilename(url);
  fs.readFile(filename, "utf-8", (err, fileContent) => {
    if (err) {
      if (err.code !== "ENOENT") {
        return cb(err);
      }

      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }

        spiderLinksV3(url, requestContent, nesting, cb);
      });
    }

    spiderLinksV3(url, fileContent, nesting, cb);
  });
};

const spideringV2 = new Set();
export const spiderV4 = (url, nesting, queue) => {
  if (spideringV2.has(url)) {
    return;
  }

  spideringV2.add(url);
  queue.pushTask((done) => {
    spiderTask(url, nesting, queue, done);
  });
};

const spiderLinksV4 = (currentUrl, body, nesting, queue) => {
  if (nesting === 0) {
    return;
  }
  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return;
  }
  links.forEach((link) => spiderV4(link, nesting - 1, queue));
};

export const spiderTask = (url, nesting, queue, cb) => {
  const filename = urlToFilename(url);
  fs.readFile(filename, "utf-8", (err, fileContent) => {
    if (err) {
      if (err.code !== "ENOENT") {
        return cb(err);
      }

      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }
        spiderLinksV4(url, requestContent, nesting, queue);
        return cb();
      });
    }

    spiderLinksV4(url, fileContent, nesting, queue);
    return cb();
  });
};
