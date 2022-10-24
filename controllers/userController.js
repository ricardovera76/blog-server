const connection = require("../database/database");

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

module.exports = { makeTeacher, deleteUser };
