const connection = require("./database");

// USER
const GetAllUsers = async () => {
  const [rows] = await connection.promise().execute(`SELECT * FROM Users;`);
  return rows;
};
const GetUserDataByUserName = async (userName) => {
  //gets all the user data (username, name, email, posts, chats)
  const [rows] = await connection
    .promise()
    .execute(`SELECT * FROM Users WHERE user_name="${userName}";`);
  return rows;
};
const GetUserData = async (userId) => {
  const [rows] = await connection
    .promise()
    .execute(
      `SELECT UserChats.userchat_user_id, Chats.chat_name FROM UserChats INNER JOIN Chats ON UserChats.userchat_chat_id = Chats.chat_id WHERE UserChats.userchat_user_id=${userId};`
    );
  return rows;
};

const AuthUser = async (mail) => {
  const [rows] = await connection
    .promise()
    .execute(`SELECT * FROM Users WHERE email="${mail}";`);
  return rows;
};
const CreateAUser = async (values) => {
  connection.query(
    `INSERT INTO Users (u_name, user_name, email, password, is_admin) VALUES ("${values.u_name}", "${values.user_name}","${values.email}","${values.password}", "${values.is_admin}");`
  );
};

// POST
const GetPosts = async () => {
  const [rows] = await connection.promise().execute(`SELECT * FROM Posts;`);
  return rows;
};
const GetPostsDashboard = async () => {
  const [rows] = await connection
    .promise()
    .execute(`SELECT * FROM Posts LIMIT 10;`);
  return rows;
};
const CreateAPost = async (values) => {
  connection.query(
    `INSERT INTO Posts (post_body, post_user_id) VALUES ("${values.post_body}", "${values.post_user_id}");`
  );
};
const UpdatePost = async (values) => {
  connection.query(
    `UPDATE Posts SET post_body = "${values.post_body}" WHERE post_id=${values.post_id};`
  );
};
const DeleteAPost = async (postId) => {
  connection.query(`DELETE FROM Posts WHERE post_id=${postId};`);
};

// CHAT
const GetChatData = async (chatName) => {
  const [rows] = await connection
    .promise()
    .execute(
      `SELECT Chats.chat_name, Users.u_name, Messages.message_text, Messages.message_time FROM Chats INNER JOIN Messages ON Messages.message_chat_id=Chats.chat_id INNER JOIN Users ON Users.user_id=Messages.message_user_id WHERE Chats.chat_name="${chatName}";`
    );

  return rows;
};
const CreateAChat = async (chatName) => {
  connection.query(`INSERT INTO Chats(chat_name) VALUES("${chatName})`);
};
const SendMessage = async (data) => {
  connection.query(
    `INSERT INTO Messages(message_chat_id, message_user_id, message_text,message_time) VALUES(${data.message_chat_id},${data.message_user_id},"${data.message_text}",NOW())`
  );
};

module.exports = {
  GetAllUsers,
  GetUserDataByUserName,
  AuthUser,
  CreateAUser,
  GetUserData,
  GetPosts,
  CreateAPost,
  UpdatePost,
  DeleteAPost,
  GetChatData,
  CreateAChat,
  SendMessage,
  GetPostsDashboard,
};
