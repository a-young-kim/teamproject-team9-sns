const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const contents = await mysql.query("followerList", [
    req.session.loginId,
    req.session.username,
  ]);
  res.send(JSON.stringify(contents));
});

//팔로잉 추가할 때 팔로워 추가됨
router.post("/insert", async (req, res) => {
  const users = await mysql.query("followerInsert", [
    req.body.others_id,
    req.body.others_username,
    req.session.loginId,
    req.session.username,
  ]);

  res.send(JSON.stringify(users));
});

router.post("/update_num", async (req, res) => {
  const users = await mysql.query("user_detail_follower_num_Update", [
    req.session.loginId,
    req.session.username,
    req.session.loginId,
    req.session.username,
  ]);

  res.send(JSON.stringify(users));
});

router.delete("/delete", async (req, res) => {
  const result = await mysql.query("followerDelete", [
    req.session.loginId,
    req.body.follower_id,
  ]);

  res.send(JSON.stringify(result));
});

// 팔로잉 삭제할 때 반대인 팔로워도 삭제되도록 하는 것
router.delete("/delete_reverse", async (req, res) => {
  const result = await mysql.query("followerDelete", [
    req.body.follower_id,
    req.session.loginId,
  ]);

  res.send(JSON.stringify(result));
});

module.exports = router;
