import { GraphQLError } from "graphql";
import { combineResolvers, skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me
    ? skip
    : new GraphQLError("Not authenticated as user", {
        extensions: { code: "FORBIDDEN" },
      });

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findById(id, { raw: true });
  if (message.userId !== me.id) {
    throw new GraphQLError("Not authenticated as owner.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }
  return skip;
};

export const isAdmin = combineResolvers(
  isAuthenticated,
  async (parent, args, { me: { role } }) => {
    return role === "ADMIN"
      ? skip
      : new GraphQLError("Not authorized as admin", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
  }
);
