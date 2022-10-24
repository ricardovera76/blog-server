const express = require("express");
const router = express.Router();
const { signUpUser } = require("../controllers/authController");

router.post("/", async (req, res) => {
  const values = req.body;
  const data = await signUpUser(values);
  res.send(data);
});

module.exports = router;
