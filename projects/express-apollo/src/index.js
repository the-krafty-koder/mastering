import cors from "cors";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import schema from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import models, { sequelize } from "./models/index.js";

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin("rwieruch"),
    secret: process.env.secret,
  }),
});

await server.start();
server.applyMiddleware({ app, path: "/graphql" });

const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen(8080, () =>
    console.log(`Server is running ${process.env.DATABASE_PASSWORD}`)
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "hello@robin.com",
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
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};
