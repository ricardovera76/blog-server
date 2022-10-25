const connection = require("../database/database");

const getUserInfo = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    if (user.length === 0) {
      return {
        error: true,
        code: 406,
        message: "user does not exists",
      };
    }
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: user[0],
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
const changeUserIpAddress = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    if (user.length === 0) {
      return {
        error: true,
        code: 406,
        message: "user does not exists",
      };
    }
    await connection
      .promise()
      .execute(
        `UPDATE users SET ip_address = "${data.ipAddress}" WHERE user_id="${user[0].user_id}";`
      );
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: user[0],
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
const changeUserPassword = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    if (user.length === 0) {
      return {
        error: true,
        code: 406,
        message: "user does not exists",
      };
    }
    await connection
      .promise()
      .execute(
        `UPDATE users SET password = "${data.password}" WHERE user_id="${user[0].user_id}";`
      );
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: user[0],
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
const makeTeacher = async (data) => {
  try {
    await connection
      .promise()
      .execute(
        `UPDATE users SET user_type = 't' WHERE user_name="${data.userName}"`
      );
    return {
      error: false,
      code: 200,
      message: `user ${data.userName} converted to teacher!`,
      data: [],
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
const deleteUser = async (data) => {
  try {
    await connection
      .promise()
      .execute(`DELETE FROM users WHERE user_name="${data.userName}"`);
    return {
      error: false,
      code: 200,
      message: `user ${data.userName} deleted!`,
      data: [],
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

module.exports = {
  makeTeacher,
  deleteUser,
  getUserInfo,
  changeUserIpAddress,
  changeUserPassword,
};
