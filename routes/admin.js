const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.get("/", async (req, res) => {
  const result = await User.find({});
  console.log(result);
  res.end(`admin page running ${result}`);
});

module.exports = router;

/*
-> : /admin
selects chats to empty all messages or delete chats/posts
*/
