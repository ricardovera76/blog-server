const { AuthUser, GetUserData, CreateAUser } = require("../database/requests");

const signin = async (email, password, ipAddress) => {
  const chatArray = [];
  const [dbUser] = await AuthUser(email);
  if (dbUser.email !== email)
    return {
      code: 401,
      message: "The combination of email and password does not exist",
    };
  if (dbUser?.password !== password)
    return {
      code: 401,
      message: "Incorrect Password",
    };
  if (dbUser?.ip_address !== ipAddress)
    return {
      code: 401,
      message: "Cannot access the page from where you are",
    };
  const chats = await GetUserData(dbUser.user_id);
  chats.forEach((chat) => chatArray.push(chat.chat_name));
  const enteredUserData = {
    name: dbUser.u_name,
    email: dbUser.email,
    id: dbUser.user_id,
    chats: chatArray,
    userName: dbUser.user_name,
    ipAddress: dbUser.ip_address,
    isAdmin: dbUser.is_admin,
  };
  const success = {
    message: "Access granted",
    code: 200,
    data: enteredUserData,
  };

  return success;
};

const signup = async (userData) => {
  const data = {
    u_name: userData.name,
    user_name: userData.userName,
    email: userData.email,
    password: userData.password,
    ip_address: userData.ipAddress,
  };
  const test = await CreateAUser(data);
  return {
    name: userData.name,
    email: userData.email,
    id: test.insertId,
    chats: [],
    userName: userData.userName,
    ipAddress: userData.ipAddress,
    isAdmin: 0,
  };
};

module.exports = { signin, signup };
