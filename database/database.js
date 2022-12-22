const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  database: "testingSQL",
  user: "dev",
  password: "secret",
});

module.exports = connection;
