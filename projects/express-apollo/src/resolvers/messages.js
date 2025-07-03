import { v4 as uuidv4 } from "uuid";
import { isAuthenticated, isMessageOwner } from "./authorization.js";
import { combineResolvers } from "graphql-resolvers";
import Sequelize from "sequelize";
import pubsub, { EVENTS } from "../subscriptions/index.js";

export const toCursorHash = (string) => Buffer.from(string).toString("base64");

export const fromCursorHash = (string) =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      const messages = await models.Message.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit + 1,
        where: cursor
          ? {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            }
          : null,
      });

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      return {
        edges,
        pageInfo: {
          endCursor: toCursorHash(messages[edges.length - 1].createdAt),
          hasNextPage,
        },
      };
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: message,
        });

        return message;
      }
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      }
    ),
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterableIterator(EVENTS.MESSAGE.CREATED),
    },
  },

  Message: {
    user: async (message, args, { models, loaders }) => {
      return await loaders.user.load(message.userId);
    },
  },
};
