import { gql } from "apollo-server-express";

import messageSchema from "./message.js";
import userSchema from "./user.js";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema];
