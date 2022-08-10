const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/authController");

router.post("/", async (req, res) => {
  const data = req.body;
  await signup(data);
  res.send("ok");
  // const signedUser = await signup(req.body);
  // res.status(signedUser.code).send(JSON.stringify(signedUser));
});

module.exports = router;
