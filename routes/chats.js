const express = require("express");
const router = express.Router();
const { chatInfo, sendMsg } = require("../controllers/chatsController");

router.get("/:id", async (req, res) => {
  const chatData = await chatInfo(req.params.id);
  // send better data
  res.send(chatData);
});

const socketServer = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
    });

    socket.on("send", async (data) => {
      console.log(data);
      const chatData = await chatInfo(data.room);
      console.log(chatData[0].chat_id);
      socket.to(data.room).emit("received", data);
      await sendMsg(chatData[0].chat_id, data.author, data.message);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected | ", socket.id);
    });
  });
};

module.exports = { router, socketServer };
