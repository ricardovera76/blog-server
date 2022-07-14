const Chat = require("../models/Chats");

const sendMessage = async (data) => {
  await Chat.updateOne(
    { _id: data.chat_id },
    { $push: { messages: data.message } }
  );
};

module.exports = { sendMessage };
