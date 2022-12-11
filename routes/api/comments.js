const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.post('/update_username', async(req, res) => {

    const temp = await  mysql.query("comments_update_username", [req.body.username1, req.body.id,req.body.username]); 

    res.send(JSON.stringify(temp));
    
});


module.exports = router;