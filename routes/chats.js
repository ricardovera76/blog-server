const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // console.log(io)
  res.send("chats page running");
});


const socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("received_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected | ", socket.id);
    });
  });
}


module.exports = {router,socketServer};

/*
-> : /chats
fetch chat data according to user be in those chats

-> : /chat/:id
make posts to send message, get to get current messages
*/
