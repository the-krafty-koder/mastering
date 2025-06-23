import { DataTypes } from "sequelize";

const message = (sequelize) => {
  const Message = sequelize.define("message", {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "A message has to have a text.",
        },
      },
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
