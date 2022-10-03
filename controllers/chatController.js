const {
  getChat,
  addParticipant,
  createChat,
  sendMessage,
  getChatData,
} = require("../database/queries");

const chatInfo = async (name) => {
  return await getChat(name);
};

const chatHistory = async (name) => {
  return await getChatData(name);
};

const sendMsg = async (chatId, userId, text) => {
  try {
    const data = {
      message_chat_id: chatId,
      message_user_id: userId,
      message_text: text,
    };
    await sendMessage(data);
  } catch (err) {
    console.log(err);
  }
};

const addUser = async (chatName, userName) => {
  //get the ids firsts
  await addParticipant(chatId, userId);
};

const newChat = async (name) => {
  await createChat(name);
};

module.exports = {
  chatInfo,
  sendMsg,
  newChat,
  addUser,
  chatHistory,
};
