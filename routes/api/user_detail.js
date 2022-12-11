const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/", async (req, res) => {

    const user_detail = await mysql.query("user_detail_List", req.session.loginId);

    res.send(user_detail);
});

router.get("/check_follow", async (req, res) => {

    const user_follow = await mysql.query("user_detail_follow_check", [req.session.loginId, req.session.username]);

    res.send(user_follow);
});

router.post("/update", async (req, res) => {

    const user_follow = await mysql.query("user_detail_update",[req.body.username1, req.body.introduction1, req.body.id, req.body.username]);

    res.send(user_follow);
});

router.post("/indtroductions", async (req, res) => {

    const user_follow = await mysql.query("user_detail_introduction",[req.session.loginId,req.body.username]);

    res.send(user_follow);
});


module.exports = router;