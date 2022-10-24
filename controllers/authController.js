const connection = require("../database/database");

const signUpUser = async (user) => {
  try {
    await connection
      .promise()
      .execute(
        `INSERT INTO users (user_alias, user_name, email, password, ip_address) VALUES ("${user.alias}", "${user.userName}","${user.email}","${user.password}", "${user.ipAddress}");`
      );
    const [[rows]] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE email="${user.email}";`);
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: rows,
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};

const signInUser = async (user) => {
  try {
    const [userData] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE email="${user.email}";`);
    if (userData.length === 0) {
      return {
        error: true,
        code: 406,
        message: "user does not exists",
      };
    }
    if (userData[0].password != user.password) {
      return {
        error: true,
        code: 406,
        message: "wrong email & password combination",
      };
    }
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: userData[0],
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};

module.exports = { signInUser, signUpUser };
/*
ex usage:
app.post("/signin", async (req, res) => {
  const values = req.body;
  const data = await signInUser(values);
  res.send(data);
});
body:
{
	"email":"ricardovera71@gmail.com",
	"password": "123456789"
}

app.post("/signup", async (req, res) => {
  const values = req.body;
  const data = await signUpUser(values);
  res.send(data);
});
body:
{
	"alias": "RICK",
	"userName": "REXXAR",
	"email": "ricardovera71@gmail.com",
	"password": "123456789",
	"ipAddress": "181.232.180.1"
}

*/
