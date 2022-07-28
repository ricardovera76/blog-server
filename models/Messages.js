const { DataTypes } = require("sequelize");
const sequelize = require("../src/database/database");

const Messages = sequelize.define("messages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: "users",
    referencesKey: "id",
  },
  text: {
    type: DataTypes.STRING,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    references: "chats",
    referencesKey: "id",
  },
  time: {
    type: DataTypes.TIME,
  },
});

module.exports = Messages;
