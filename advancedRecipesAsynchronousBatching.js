import level from "level";
import sublevel from "subleveldown";
import { createServer } from "http";

const db = level("example-db");
const salesDb = sublevel(db, "sales", { valueEncoding: "json" });

export async function totalSalesRaw(product) {
  const now = Date.now();
  let sum = 0;
  for await (const transaction of salesDb.createValueStream()) {
    if (!product || transaction.product === product) {
      sum += transaction.amount;
    }
  }
  console.log(`totalSales() took: ${Date.now() - now}ms`);
  return sum;
}

const runningRequests = new Map();
const totalSales = (product) => {
  if (runningRequests.has(product)) {
    console.log("Batching");
    return runningRequests.get(product);
  }
  const resultPromise = totalSalesRaw(product);
  runningRequests.set(product, resultPromise);
  resultPromise.finally(() => {
    runningRequests.delete(product);
  });
  return resultPromise;
};

const CACHE_TTL = 30 * 1000;
const cache = new Map();

const totalSalesCache = (product) => {
  if (runningRequests.has(product)) {
    console.log("Batching");
    return runningRequests.get(product);
  }
  const resultPromise = totalSalesRaw(product);
  cache.set(product, resultPromise);

  resultPromise.then(
    () => {
      setTimeout(() => {
        cache.delete(product);
      }, CACHE_TTL);
    },
    (err) => {
      cache.delete(product);
      throw err;
    }
  );
  return resultPromise;
};

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const product = url.searchParams.get("product");
  console.log(`Processing query: ${url.search}`);

  //   const sum = await totalSales(product);
  const sum = await totalSalesCache(product);

  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(
    JSON.stringify({
      product,
      sum,
    })
  );
}).listen("8000", () => {
  console.log("Server started");
});
