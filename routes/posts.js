const express = require("express");
const router = express.Router();
// const Posts = require("../models/Posts");

router.get("/", async (req, res) => {
  //get all posts with mongoose
  // const allPosts = await Posts.find();
  res.send("ok");
});

router.post("/", async (req, res) => {
  // create with mongoose
  const receivedPost = req.body;
  // const newMongoosePost = Posts.create(receivedPost)
  console.log(receivedPost);
  res.end("ok");
});

router.put("/:id", (req, res) => {
  const postId = req.params.id;
  //update with mongoose
  res.end(postId);
});

module.exports = router;
