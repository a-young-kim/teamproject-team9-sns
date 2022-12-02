const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await mysql.query("profileList");

    res.send(users);
});

router.post('/insert', async(req, res) => {
    const users = await  mysql.query("profileInsert", req.body);

    res.send(JSON.stringify(users));
});

router.post('/check', async(req, res) => {
    const users = await  mysql.query("profileCheck", req.body.id);

    res.send(JSON.stringify(users));
});
module.exports = router;