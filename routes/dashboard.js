const express = require("express");
const router = express.Router();
const {
  getFilteredPosts,
  getRecentPosts,
} = require("../controllers/postController");

router.get("/recent", async (req, res) => {
  const result = await getRecentPosts();
  res.send(result);
});
router.get("/:filter", async (req, res) => {
  const filter = req.params.filter;
  const result = await getFilteredPosts(filter);
  res.send(result);
});
module.exports = router;
