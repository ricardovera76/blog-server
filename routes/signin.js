const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/Auth");

router.post("/", async (req, res) => {
  const signedUser = await signin(req.body.email, req.body.password);
  res.status(signedUser.code).send(signedUser.message);
});

module.exports = router;
