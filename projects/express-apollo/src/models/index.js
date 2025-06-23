import { Sequelize } from "sequelize";
import User from "./user.js";
import Message from "./message.js";

import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  }
);

const models = {
  User: User(sequelize),
  Message: Message(sequelize),
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize };
export default models;
