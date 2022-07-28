const { DataTypes } = require("sequelize");
const sequelize = require("../src/database/database");

const UserMessages = sequelize.define("user_messages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  message_id: {
    type: DataTypes.INTEGER,
    references: "messages",
    referencesKey: "id",
  },
  chat_id: {
    type: DataTypes.INTEGER,
    references: "chats",
    referencesKey: "id",
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: "users",
    referencesKey: "id",
  },
});

module.exports = UserMessages;
