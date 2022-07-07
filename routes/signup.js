const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/Auth");

router.post("/", async (req, res) => {
  const signedUser = await signup(req.body);
  res.status(signedUser.code).send(JSON.stringify(signedUser));
});

module.exports = router;
