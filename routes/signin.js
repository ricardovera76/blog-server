const express = require("express");
const router = express.Router();
const { signInUser } = require("../controllers/authController");

router.post("/", async (req, res) => {
  const values = req.body;
  const data = await signInUser(values);
  res.send(data);
});

module.exports = router;
