const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/show_contents", async (req, res) => {
  const contents = await mysql.query("contentsList", req.session.loginId); //나중에 testid 부분을 req.session.id로 바꿔준다.
  res.send(JSON.stringify(contents));
});

module.exports = router;
