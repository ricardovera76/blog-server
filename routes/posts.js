const express = require("express");
const router = express.Router();
const {
  createPost,
  replyPost,
  updatePost,
  deletePost,
  getAllPost,
  getRecentPosts,
  getFilteredPosts,
  getPostData,
} = require("../controllers/postController");

router.get("/all", async (req, res) => {
  const result = await getAllPost();
  res.send(result);
});
router.get("/recent", async (req, res) => {
  const result = await getRecentPosts();
  res.send(result);
});
router.get("/:filter", async (req, res) => {
  const filter = req.params.filter;
  const result = await getFilteredPosts(filter);
  res.send(result);
});

router.post("/", async (req, res) => {
  /*FILE FORM OR MULTIFORM IN REACT JS
  {
    title,
    body,
    vidLink,
    userName,
    subjectName,
    cover --> file
  }
 */
  const values = req.body;
  let coverImage;
  let uploadCoverPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("no files uploaded");
  }
  coverImage = req.files.cover;
  uploadCoverPath = `${__dirname}/uploads/${values.title}${values.userName}${values.subjectName}${coverImage.name}`;
  coverImage.mv(uploadCoverPath, (err) => {
    if (err) return res.status(500).send(err);
  });
  const value = { ...values, cover: uploadCoverPath };
  const data = await createPost(value);
  res.send(data);
});

router.put("/reply", async (req, res) => {
  /*
  {
    title
    userName,
    subjectName
    message
  }
 */
  const data = req.body;
  const result = await replyPost(data);
  res.send(result);
});
router.put("/", async () => {
  /*
  {
    title
    userName,
    subjectName
  }
 */
  const data = req.body;
  const result = await updatePost(data);
  res.send(result);
});
router.post("/data", async (req, res) => {
  /*
  {
    title
    userName,
    subjectName
  }
 */
  const data = req.body;
  const result = await getPostData(data);
  res.send(result);
});

router.post("/cover", async (req, res) => {
  /*
  {
    title
    userName,
    subjectName
  }
 */
  const data = req.body;
  const result = await getPostData(data);
  if (!result.error) {
    res.sendFile(result.data.post_cover);
    return;
  }
  res.send(result);
});

router.delete("/", async (req, res) => {
  /*
  {
    title
    userName,
    subjectName
  }
 */
  const data = req.body;
  const result = await deletePost(data);
  res.send(result);
});

module.exports = router;
