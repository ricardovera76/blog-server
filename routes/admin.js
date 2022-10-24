const express = require("express");
const router = express.Router();
const {
  createSubject,
  getAllSubjects,
  addParticipants,
  deleteSubject,
  removeParticipants,
} = require("../controllers/subjectController");
const { makeTeacher, deleteUser } = require("../controllers/userController");

router.post("/teacher", async (req, res) => {
  /*
  {
    alias,
    userName
  }
  */
  const data = req.body;
  const result = await makeTeacher(data);
  res.send(result);
});

router.delete("/user", async (req, res) => {
  /*
  {
    alias,
    userName
  }
  */
  const data = req.body;
  const result = await deleteUser(data);
  res.send(result);
});

router.get("/subjects", async (req, res) => {
  const data = await getAllSubjects();
  res.send(data);
});

router.post("/subjects", async (req, res) => {
  /*
  {
    chatName,
    subjectName
  }
  */
  const values = req.body;
  if (values.subjectName === undefined) {
    res.send({ error: true, code: 400, message: "cannot create subject" });
    return;
  }
  const data = await createSubject(values);
  res.send(data);
});

router.post("/subjects/user", async (req, res) => {
  /*
  {
    userName,
    subjectName
  }
  */
  const values = req.body;
  const data = await addParticipants(values);
  res.send(data);
});

router.delete("/subjects/user", async (req, res) => {
  /*
  {
    userName,
    subjectName
  }
  */
  const values = req.body;
  const data = await removeParticipants(values);
  res.send(data);
});

router.delete("/subjects", async (req, res) => {
  /*
  {
    subjectName
  }
  */
  const subjectName = req.body.subjectName;
  const data = await deleteSubject(subjectName);
  res.send(data);
});

module.exports = router;
