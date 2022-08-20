const express = require("express");
const router = express.Router();
const moment = require("moment");
const { getAllPosts } = require("../database/queries");
// const Posts = require("../models/Posts")

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
  // res.send(selectedPosts);
  const data = await getAllPosts();
  const result = moment(data[0].created_at).format("DD-MM-YYYY kk:mm:ss");
  console.log(result);
  res.send("samplePosts");
});

module.exports = router;
