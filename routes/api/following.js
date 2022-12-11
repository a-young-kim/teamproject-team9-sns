const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const followings = await mysql.query("followingList", [
    req.session.loginId,
    req.session.username,
  ]);

  res.send(followings);
});

router.post("/insert", async (req, res) => {
  const users = await mysql.query("followerInsert", req.body);

  res.send(JSON.stringify(users));
});

router.post("/update_num", async (req, res) => {
  const users = await mysql.query("user_detail_following_num_Update", [
    req.session.loginId,
    req.session.loginId,
  ]);

  res.send(JSON.stringify(users));
});

router.delete("/delete", async (req, res) => {
  const result = await mysql.query("followingDelete", [
    req.session.loginId,
    req.body.following_id,
  ]);

  res.send(JSON.stringify(result));
});

// 팔로워 삭제할 때 반대인 팔로잉도 삭제되도록 하는 것
router.delete("/delete_2", async (req, res) => {
  const result = await mysql.query("followingDelete", [
    req.body.id,
    req.session.loginId,
  ]);

  res.send(JSON.stringify(result));
});

module.exports = router;
