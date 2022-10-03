const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/postController");

router.get("/", async (req, res) => {
  try {
    const data = await getPosts(true);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(`${error}`);
  }
});

module.exports = router;
