const express = require("express");
const router = express.Router();
const UserModel = require("../models/Users");
const { signup } = require("../controllers/Auth");

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    await signup(user);
    res.end("ok");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
/*
-> : /signup
the user must not be created in order to create it, check db for email and pass
*/
