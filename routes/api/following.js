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

//팔로잉 추가할 때 팔로잉 추가됨
router.post("/insert", async (req, res) => {
  const users = await mysql.query("followingInsert", [
    req.session.loginId,
    req.session.username,
    req.body.following_id,
    req.body.following_username,
  ]);

  const users2 = await mysql.query("followerInsert", [
    req.body.following_id,
    req.body.following_username,
    req.session.loginId,
    req.session.username,
  ]);

  res.send(JSON.stringify(users, users2));
});

router.post("/update_num", async (req, res) => {
  const users = await mysql.query("user_detail_following_num_Update", [
    req.session.loginId,
    req.session.username,
    req.session.loginId,
    req.session.username,
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

router.get("/getData", async (req, res) => {
  const contents = await mysql.query("followingList", [
    req.session.loginId,
    req.session.username,
  ]); //나중에 testid 부분을 req.session.id로 바꿔준다.
  res.send(JSON.stringify(contents));
});

module.exports = router;
