const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/authController");

const RESPONSE = {
  SUCCESS: { message: "user created successfully", code: 0 },
  NO_EMAIL: { message: "cannot create user without email", code: 1 },
  NO_PASS: { message: "cannot create user without password", code: 2 },
  NO_NAME: { message: "cannot create user without name", code: 3 },
  NO_U_NAME: { message: "cannot create user without user name", code: 4 },
  NO_IP: { message: "cannot create user without ip address", code: 5 },
};

router.post("/", async (req, res) => {
  const data = req.body;
  if (data?.email === undefined || data?.email === "") {
    res.status(406).send(RESPONSE.NO_EMAIL);
    return;
  }
  if (data?.password === undefined || data?.password === "") {
    res.status(406).send(RESPONSE.NO_PASS);
    return;
  }
  if (data?.name === undefined || data?.name === "") {
    res.status(406).send(RESPONSE.NO_NAME);
    return;
  }
  if (data?.userName === undefined || data?.userName === "") {
    res.status(406).send(RESPONSE.NO_U_NAME);
    return;
  }
  if (data?.ipAddress === undefined || data?.ipAddress === "") {
    res.status(406).send(RESPONSE.NO_IP);
    return;
  }
  await signup(data);
  res.status(201).send(RESPONSE.SUCCESS);
});

module.exports = router;
