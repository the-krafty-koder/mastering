import Redis from "ioredis";
import { generateTasks } from "../zeromq/generateTasks";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const BATCH_SIZE = 10000;
const redisClient = new Redis();

const [, , maxLength, searchHash] = process.argv;

const main = async () => {
  const generatorObj = generateTasks(
    searchHash,
    ALPHABET,
    maxLength,
    BATCH_SIZE
  );
  for (const task of generatorObj) {
    await redisClient.xadd("tasks_stream", "*", "task".JSON.stringify(task));
  }

  redisClient.disconnect();
};

main().catch((err) => console.error(err));
