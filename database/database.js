const Sequelize = require("sequelize");

const sequelize = new Sequelize("testing", "admin", "admin", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
