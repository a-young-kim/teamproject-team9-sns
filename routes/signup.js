const express = require("express");
const fs = require("fs");
const request = require('request');
const crypto  = require('crypto');

const router = express.Router();

// get
router.get('/', function(req, res){
    fs.readFile('./views/signup.html', function(err, data){
        if(err){
            res.send('에러');
        }
        else{
            res.writeHead(200, {'Content-Type': 'signup.html'});
            res.write(data);
            res.end();
        }
    });
});

router.post('/', async(req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    
    // checkID
    const options_checkId = {
        url: req.headers.origin + '/api/user/checkDB ', 
        method: 'POST',
        form: {
          id: id,
        }
    };

    request.post(options_checkId, function(err, httpResponse, body){
        const get_Id = body.slice(1, -1);

        if(get_Id != ""){
            res.send("<script>alert('이미 존재하는 아이디입니다.'); location.href='/signup';</script>");
        }
        else{
            const new_salt = crypto.randomBytes(32).toString('base64');
            const new_password = crypto.pbkdf2Sync(password, new_salt, 1, 32, 'sha512').toString('base64');
            const nickname = req.body.nickname;
            // user insert
            const options_insert = {
              url: req.headers.origin + '/api/user/insert ', 
              method: 'POST',
              form: {
                id: id,
                password: new_password,
                salt: new_salt,
                username: nickname
              } 
            };
            
            request.post(options_insert, function(err, httpResponse, body){
                if(err) console.log(err);
            });

            // nickname insert
            const options_nickname = {
                url: req.headers.origin + '/api/profile/insert', 
                method: 'POST',
                form: {
                  id: id,
                  username1: nickname,
                } 
            };

            request.post(options_nickname, function(err, httpResponse, body){
                if(err) console.log(err);
            });
            // 회원 가입 성공 후 어떻게 할 지 생각
            res.redirect('/');
        }
    });
  });


module.exports = router;