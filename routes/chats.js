const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("chats page running");
});

module.exports = router;

/*
-> : /chats
fetch chat data according to user be in those chats

-> : /chat/:id
make posts to send message, get to get current messages
*/
