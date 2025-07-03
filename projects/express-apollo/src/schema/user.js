import { gql } from "graphql-tag";

const userSchema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    role: String
    me: User
  }

  extend type Mutation {
    signUp(email: String!, password: String!, username: String!): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
  }
`;

export default userSchema;
