const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", async (req, res) => {
  const allPosts = await getPosts(false);
  res.send(allPosts);
});

router.post("/", async (req, res) => {
  const postTitle = req.body.post_title;
  const postBody = req.body.post_body;
  const userId = req.body.post_user_id;
  const result = await createPost(postTitle, postBody, userId);
  res.end(result);
});

router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const newValue = req.body.value;
  const valueToUpdate = req.body.type;
  const result = await updatePost(valueToUpdate, newValue, postId);
  res.end(result);
});

router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  const result = await deletePost(postId);
  res.send(`${result} : ${postId}`);
});

module.exports = router;
