import { createServer } from "http";
import { cpus } from "os";
import cluster from "cluster";
import { once } from "events";

if (cluster.isPrimary) {
  // launching workers
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  availableCpus.forEach(() => cluster.fork());

  // Handling worker crashes
  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect()) {
      console.log(`Worker ${process.pid} crashed\n Starting a new worker`);
    }
    cluster.fork();
  });

  process.on("SIGUSR2", async () => {
    const workers = Object.values(cluster.workers);
    for (const worker of workers) {
      console.log(`Stopping worker ${worker.process.pid}`);
      worker.disconnect();
      await once(worker, "exit");
      if (!worker.exitedAfterDisconnect) continue;
      const newWorker = cluster.fork();
      await once(newWorker, "listening");
    }
  });
} else {
  const { pid } = process;
  const server = createServer((req, res) => {
    setTimeout(() => {
      throw new Error("Ooops");
    }, Math.ceil(Math.random() * 3) * 1000);
    // simulates CPU intensive work
    let i = 1e7;
    while (i > 0) {
      i--;
    }
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
  });

  server.listen(8080, () => console.log(`Started at ${pid}`));
}
