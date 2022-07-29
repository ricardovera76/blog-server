module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "messages",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sender_name: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "user_name",
        },
      },
      text: {
        type: DataTypes.TEXT,
      },
      chat_name: {
        type: DataTypes.STRING,
        references: {
          model: "chats",
          key: "name",
        },
      },
    },
    { updatedAt: false }
  );

  return Messages;
};
