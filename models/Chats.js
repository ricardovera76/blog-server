const { DataTypes } = require("sequelize");
const sequelize = require("../src/database/database");

const Chats = sequelize.define("chats", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = Chats;
