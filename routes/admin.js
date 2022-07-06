const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("admin page running");
});

module.exports = router;

/*
-> : /admin
selects chats to empty all messages or delete chats/posts
*/
