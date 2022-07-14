const express = require("express");
const router = express.Router();
/*
-> : /chats
fetch chat data according to user be in those chats

get al the available chat for the current user
*/
s;
router.get("/", (req, res) => {
  res.send("chats page running");
});

/*
-> : /chat/:id
make posts to send message, get to get current messages

send / receive menssages form each individual chat
*/
const socketServer = (io) => {
  io.on("connection", (socket) => {
    socket.on("join_chat", (room) => {
      socket.join(room);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("received_message", data);

      // send message data to chat id in db

      // update the array in the chats collection ==> research to how to update an array inside a collection
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected | ", socket.id);
    });
  });
};

module.exports = { router, socketServer };
