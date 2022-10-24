const express = require("express");
const router = express.Router();
const multer = require("multer");
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

router.post("/new", async (req, res) => {
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
  let uploadCoverPath = "";
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      let tempFileArr = file.originalname.split(".");
      let tempFileName = tempFileArr[0];
      let tempFileExt = tempFileArr[1];
      uploadCoverPath =
        __dirname + "/uploads/" + tempFileName + "." + tempFileExt;
      cb(null, tempFileName + "." + tempFileExt);
    },
  });
  let upload = multer({ storage: storage }).single("cover");
  upload(req, res, async (err) => {
    if (err) {
      return res.end("error occurred");
    } else {
      const values = req.body;
      const data = await createPost({ ...values, cover: uploadCoverPath });
      res.send(data);
    }
  });
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
