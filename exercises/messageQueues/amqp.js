import { createServer } from "http";
import staticHandler from "serve-handler";
import { WebSocketServer } from "ws";
import amqp from "amqplib";
import JSONStream from "JSONStream";
import superagent from "superagent";

const httpPort = process.argv[2] || 8080;

const main = async () => {
  const connection = amqp.connect("amqp://localhost");
  const channel = await (await connection).createChannel();
  await channel.assertExchange("chat", "fanout");
  const { queue } = await channel.assertQueue(`chat_srv_${httpPort}`, {
    exclusive: true,
  });
  await channel.bindQueue(queue, "chat");
  await channel.consume(
    queue,
    (msg) => {
      msg = msg.content.toString();
      console.log(`From queue: ${msg}`);
      broadcast(msg);
    },
    { noAck: true }
  );

  const server = createServer((req, res) => {
    return staticHandler(req, res, { public: "www" });
  });

  const wss = new WebSocketServer({ server });
  wss.on("connection", (client) => {
    console.log("Client connected");
    client.on("message", (msg) => {
      console.log(`Message: ${msg}`);
      channel.publish("chat", "", Buffer.from(msg));
    });
    superagent
      .get("http://localhost:8090")
      .on("error", (err) => console.error(err))
      .pipe(JSONStream.parse("*"))
      .on("data", (msg) => client.send(msg));
  });

  function broadcast(msg) {
    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) {
        client.send(msg);
      }
    }
  }

  server.listen(httpPort);
};

main().catch((err) => console.error(err));
