const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  changeUserIpAddress,
  changeUserPassword,
} = require("../controllers/userController");

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await getUserInfo(data);
  res.send(result);
});

router.post("/chats", async (req, res) => {
  const data = req.body;
  const result = await getUserInfo(data);
  if (!result.error) {
    res.send(result);
    return;
  }
  res.send(result);
});

router.post("/ip", async (req, res) => {
  const data = req.body;
  const result = await changeUserIpAddress(data);
  res.send(result);
});
router.post("/password", async (req, res) => {
  const data = req.body;
  const result = await changeUserPassword(data);
  res.send(result);
});
module.exports = router;
