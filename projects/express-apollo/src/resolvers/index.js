import userResolvers from "./users.js";
import messageResolvers from "./messages.js";
import { DateTimeResolver } from "graphql-scalars";

export default [
  { DateTime: DateTimeResolver },
  userResolvers,
  messageResolvers,
];
