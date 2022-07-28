const { DataTypes } = require("sequelize");
const sequelize = require("../src/database/database");

const Posts = sequelize.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: "users",
    referencesKey: "id",
  },
  text: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.TIME,
  },
});

module.exports = Posts;
