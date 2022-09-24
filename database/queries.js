const connection = require("./database");
// USER
const getUser = async (email) => {
  const [rows] = await connection
    .promise()
    .execute(`SELECT * FROM Users WHERE email="${email}";`);
  return rows;
};
const getChats = async (userId) => {
  const [rows] = await connection
    .promise()
    .execute(
      `SELECT UserChats.userchat_user_id, Chats.chat_name FROM UserChats INNER JOIN Chats ON UserChats.userchat_chat_id = Chats.chat_id WHERE UserChats.userchat_user_id=${userId};`
    );
  return rows;
};

const insertUser = async (values) => {
  const [rows] = await connection
    .promise()
    .execute(
      `INSERT INTO Users (u_name, user_name, email, password, is_admin, ip_address) VALUES ("${values.u_name}", "${values.user_name}","${values.email}","${values.password}", 0, "${values.ip_address}");`
    );
  return rows;
};

// POST
const getAllPosts = async () => {
  const [rows] = await connection.promise().execute(`SELECT * FROM Posts;`);
  return rows;
};
const getPosts = async () => {
  const [rows] = await connection
    .promise()
    .execute(`SELECT * FROM Posts LIMIT 10;`);
  return rows;
};
const createPost = async (values) => {
  connection.query(
    `INSERT INTO Posts (post_body, post_user_id, post_title) VALUES ("${values.body}", "${values.userId}", "${values.title}");`
  );
};
const updatePost = async (data) => {
  connection.query(
    `UPDATE Posts SET post_${data.type} = "${data.value}" WHERE post_id=${data.id};`
  );
};
const deletePost = async (postId) => {
  connection.query(`DELETE FROM Posts WHERE post_id=${postId};`);
};

// CHAT
const getChatData = async (chatName) => {
  const [rows] = await connection
    .promise()
    .execute(
      `SELECT Chats.chat_id, Chats.chat_name, Users.u_name, Messages.message_text, Messages.message_time FROM Chats INNER JOIN Messages ON Messages.message_chat_id=Chats.chat_id INNER JOIN Users ON Users.user_id=Messages.message_user_id WHERE Chats.chat_name="${chatName}" ORDER BY Messages.message_time ASC;`
    );
  return rows;
};
const getChat = async (chatName) => {
  const [rows] = await connection
    .promise()
    .execute(`SELECT * FROM Chats WHERE chat_name="${chatName}";`);
  return rows;
};
const addParticipant = async (chatId, userId) => {
  connection.query(
    `INSERT INTO UserChats(userchat_chat_id,userchat_user_id) VALUES("${chatId}","${userId}")`
  );
};

const createChat = async (chatName) => {
  connection.query(`INSERT INTO Chats(chat_name) VALUES("${chatName})`);
};
const sendMessage = async (data) => {
  connection.query(
    `INSERT INTO Messages(message_chat_id, message_user_id, message_text,message_time) VALUES(${data.message_chat_id},${data.message_user_id},"${data.message_text}",NOW())`
  );
};

module.exports = {
  getUser,
  getChats,
  insertUser,
  getPosts,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getChat,
  getChatData,
  addParticipant,
  createChat,
  sendMessage,
};
