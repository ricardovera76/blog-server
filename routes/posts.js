const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", async (req, res) => {
  try {
    const allPosts = await getPosts(false);
    res.send(allPosts);
  } catch (error) {
    console.log(error);
    res.send(`${error}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const postTitle = req.body.post_title;
    const postBody = req.body.post_body;
    const userId = req.body.post_user_id;
    const result = await createPost(postTitle, postBody, userId);
    res.end(JSON.stringify({ type: "ok", result }));
  } catch (error) {
    res
      .status(400)
      .send(JSON.stringify({ type: "error", result: error.message }));
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const newValue = req.body.value;
    const valueToUpdate = req.body.type;
    const result = await updatePost(valueToUpdate, newValue, postId);
    res.end(result);
  } catch (error) {
    console.log(error);
    res.send(`${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await deletePost(postId);
    res.send(`${result} : ${postId}`);
  } catch (error) {
    console.log(error);
    res.send(`${error}`);
  }
});

module.exports = router;
