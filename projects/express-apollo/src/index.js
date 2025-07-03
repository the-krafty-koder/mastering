import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import DataLoader from "dataloader";
import { GraphQLError } from "graphql";

import typeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import models, { sequelize } from "./models/index.js";
import loaders from "./loaders/index.js";

dotenv.config();

const getMe = async (req) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch {
      throw new GraphQLError("Your session has expired", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }
  }
};

const batchUsers = async (keys, models) => {
  const users = await models.User.findAll({
    where: {
      id: keys,
    },
  });

  return keys.map((key) => users.find((user) => user.id === key));
};
const userLoader = new DataLoader((keys) => batchUsers(keys, models));
const app = express();
app.use(cors());
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });
useServer(
  {
    schema,
    context: async (ctx) => {
      return { models };
    },
  },
  wsServer
);

const server = new ApolloServer({
  schema: schema,
});

await server.start();
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const me = await getMe(req);
      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      };
    },
  })
);

const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages(new Date());
  }
  httpServer.listen(8100, () =>
    console.log(`Server is running ${process.env.DATABASE_PASSWORD}`)
  );
});

const createUsersWithMessages = async (date) => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "hello@robin.com",
      role: "ADMIN",
      password: "rwieruch",
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
  await models.User.create(
    {
      username: "ddavids",
      email: "hello@david.com",
      password: "ddavids",
      messages: [
        {
          text: "Happy to release ...",
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: "Published a complete ...",
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};
