const {
  GetChatData,
  SendMessage,
  CreateAChat,
  AddUserToChat,
} = require("../database/requests");

const chatInfo = async (id) => {
  return await GetChatData(id);
};

const sendMsg = async (chatId, userId, text) => {
  const data = {
    message_chat_id: chatId,
    message_user_id: userId,
    message_text: text,
  };
  await SendMessage(data);
};

const addParticipant = async (chatName, userName) => {
  await AddUserToChat(chatName, userName);
};

const createChat = async (name) => {
  await CreateAChat(name);
};

module.exports = {
  chatInfo,
  sendMsg,
  createChat,
  addParticipant,
};
