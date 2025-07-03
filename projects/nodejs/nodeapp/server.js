const fs = require("fs");
const http = require("http");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { createClient } = require("redis");
const connectRedis = require("connect-redis");

const app = express();
const server = http.createServer(app);

// Logging to file
const logStream = fs.createWriteStream("/var/log/nodeapp/nodeapp.log", {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));

// Create Redis client (v4)
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "redis_primary",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
  database: parseInt(process.env.REDIS_DB || "0", 10),
});

redisClient.connect().catch(console.error);

// Setup Redis store for sessions
const RedisStore = connectRedis(session);

app.use(cookieParser("keyboard-cat"));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/hello/:name", (req, res) => {
  res.json({ hello: req.params.name });
});

// Start server
const port = process.env.HTTP_PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
