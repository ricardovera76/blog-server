const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/Auth");

router.post("/", async (req, res) => {
  const result = await signin(req.body.email, req.body.password);
  console.log(result)
  res.status(result.code).send(result.message)
  // res.end("result")
});

module.exports = router;
/*
-> : /signin
the user must be created to check email and pass combination else throw an err
*/
