const express = require("express");
const router = express.Router();
// const Posts = require("../models/Posts");

const samplePosts = [
  {
    sender_name: "rick",
    time: "Sun Jul 03 2022 16:47:28 GMT-0400 (Venezuela Time)",
    title: "test",
    text: "this is an example text",
    tags: ["a", "b"],
    id: "rick_test_a_b",
  },
];

router.get("/", async (req, res) => {
  // get the first 10 posts from the db
  // const selectedPosts = await Posts.where({date is <= now()}).limit(10);
  try {
    // res.send(selectedPosts);
    res.send(samplePosts);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
