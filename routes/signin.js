const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/authController");

router.post("/", async (req, res) => {
  const signedUser = await signin(
    req.body.email,
    req.body.password,
    req.body.ipAddress
  );
  res.send(signedUser);
});

module.exports = router;
