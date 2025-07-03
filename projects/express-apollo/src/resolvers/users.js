import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";
import { isAdmin } from "./authorization.js";

const createToken = ({ id, email, username, role }, secret, expiresIn) => {
  return jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findById(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret }
    ) => {
      const user = await models.User.create(username, email, password);
      return { token: createToken(user, secret, "30m") };
    },
    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new GraphQLError("No user found with these credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new GraphQLError("Invalid password.", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      return { token: createToken(user, secret, "30m") };
    },
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        await models.User.destroy({ where: { id } });
        return true;
      }
    ),
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};
