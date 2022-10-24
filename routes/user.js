const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../controllers/userController");

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await getUserInfo(data);
  res.send(result);
});
module.exports = router;
