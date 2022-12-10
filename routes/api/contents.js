const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();


router.get('/show_contents', async(req, res) => {
    const contents = await  mysql.query("contentsList", [req.session.loginId, req.session.username]); //나중에 testid 부분을 req.session.id로 바꿔준다.
    res.send(JSON.stringify(contents));
});

router.post('/show_contents', async(req, res) => {
    const contents = await  mysql.query("contentsList", [req.body.id, req.body.username]); //나중에 testid 부분을 req.session.id로 바꿔준다.
    res.send(JSON.stringify(contents));
});

router.post('/update_incre', async(req, res) => {

    const contents = await  mysql.query("contentsSwitch", [req.body.incre, req.body.contents_id]); //나중에 testid 부분을 req.session.id로 바꿔준다.
    res.send(JSON.stringify(contents));
});

module.exports = router;

