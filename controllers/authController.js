const { getUser, getChats, insertUser } = require("../database/queries");

const signin = async (email, password, ipAddress) => {
  const chatArray = [];
  let result = {};
  const [dbUser] = await getUser(email);
  if (dbUser === undefined) {
    result = {
      code: 401,
      message: "The combination of email and password does not exist",
    };
    return result;
  }
  if (dbUser?.password !== password) {
    result = {
      code: 401,
      message: "Incorrect Password",
    };
    return result;
  }
  if (dbUser?.ip_address !== ipAddress) {
    result = {
      code: 401,
      message: "Cannot access the page from where you are",
    };
    return result;
  }
  const chats = await getChats(dbUser.user_id);
  chats.forEach((chat) => chatArray.push(chat.chat_name));
  result = {
    name: dbUser.u_name,
    email: dbUser.email,
    id: dbUser.user_id,
    chats: chatArray,
    userName: dbUser.user_name,
    ipAddress: dbUser.ip_address,
    isAdmin: dbUser.is_admin,
    message: "Access granted",
    code: 200,
  };
  return result;
};

const signup = async (userData) => {
  const data = {
    u_name: userData.name,
    user_name: userData.userName,
    email: userData.email,
    password: userData.password,
    ip_address: userData.ipAddress,
  };
  const insertedUser = await insertUser(data);
  return {
    name: userData.name,
    email: userData.email,
    id: insertedUser.insertId,
    chats: [],
    userName: userData.userName,
    ipAddress: userData.ipAddress,
    isAdmin: 0,
  };
};

module.exports = { signin, signup };
