const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const data = {
    user_name: "rick123",
    name: "rick",
    email: "rick@email.com",
    password: "123456798",
    isAdmin: false,
  };
  res.end(`admin page running`);
});

module.exports = router;

/*
-> : /admin
selects chats to empty all messages or delete chats/posts
*/
