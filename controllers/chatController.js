const connection = require("../database/database");

const getChatHistory = async (chatName) => {
  try {
    const [chats] = await connection
      .promise()
      .execute(`SELECT * FROM chats WHERE chat_name="${chatName}";`);
    if (chats.length === 0) {
      return {
        error: true,
        code: 401,
        message: `no chats created or no chat was found with that name "${chatName}"`,
      };
    }
    return {
      error: false,
      code: 200,
      message: `retrieved ${chatName} data!`,
      data: chats,
    };
  } catch (e) {
    let err = e;
    if (e.sql !== undefined) {
      err = {
        error: true,
        code: 1500,
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        message: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
      return err;
    }
    return { error: true, code: 800, message: err?.message };
  }
};

const sendMessage = async (data) => {
  try {
    const [chats] = await connection
      .promise()
      .execute(`SELECT * FROM chats WHERE chat_name="${data.chatName}";`);
    const [userData] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    if (chats.length === 0 || userData.length === 0) {
      const result =
        chats.length === 0 ? "chat" : userData.length === 0 ? "user" : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }
    const lstMsg = chats[0].chat_messages.length;
    const msg = JSON.stringify({
      user_name: data.userName,
      user_alias: userData[0].user_alias,
      user_id: userData[0].user_id,
      chat_name: data.chatName,
      chat_id: chats[0].chat_id,
      message: data.message,
    });
    await connection
      .promise()
      .execute(
        `UPDATE chats SET chat_messages = JSON_SET(chat_messages,'$[${lstMsg}]','${msg}') WHERE chat_name="${data.chatName}";`
      );
    return {
      error: false,
      code: 200,
      message: `message sent to chat ${data.chatName} from user ${data.userName}!`,
    };
  } catch (e) {
    let err = e;
    if (e.sql !== undefined) {
      err = {
        error: true,
        code: 1500,
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        message: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
      return err;
    }
    return { error: true, code: 800, message: err?.message };
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
};

/*
ex usage:

app.put("/chats/:name", async (req, res) => {
  const values = req.body;
  const data = await sendMessage(values);
  res.send(data);
});
body:
{
  "chatName":"fisicaII",
  "userName":"testing1",
	"message":"anyone there?"
}

app.get("/chats/:name", async (req, res) => {
  const chatName = req.params.name;
  const data = await getChatHistory(chatName);
  res.send(data);
});
body:
NO BODY

*/
