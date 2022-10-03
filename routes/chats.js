const express = require("express");
const router = express.Router();
const {
  chatInfo,
  sendMsg,
  chatHistory,
} = require("../controllers/chatController");

router.get("/:id", async (req, res) => {
  const chatData = await chatHistory(req.params.id);
  res.send(chatData);
});

const socketServer = (io) => {
  let chatId;
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
          await sendMsg(chatId, data.user_id, data.message);
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
