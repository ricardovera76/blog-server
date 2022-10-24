const express = require("express");
const router = express.Router();
const {
  getChatHistory,
  sendMessage,
} = require("../controllers/chatController");

router.get("/:id", async (req, res) => {
  const chatData = await getChatHistory(req.params.id);
  res.send(chatData);
});

const socketServer = (io) => {
  try {
    io.on("connection", (socket) => {
      socket.on("join", async (room) => {
        const [chatData] = await chatInfo(room);
        chatId = chatData.chat_id;
        socket.join(room);
      });

      socket.on("send", async (data) => {
        console.log(data);
        try {
          socket.to(data.chat_name).emit("received", data);
          await sendMessage({
            chatName: data.chat_name,
            userName: data.user_name,
            message: data.message,
          });
        } catch (err) {
          console.log(err);
        }
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected | ", socket.id);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { router, socketServer };
