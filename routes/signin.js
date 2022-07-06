const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/Auth");

router.post("/", async (req, res) => {
  const user = await signin(req.body.email);
});

module.exports = router;
/*
-> : /signin
the user must be created to check email and pass combination else throw an err
*/
