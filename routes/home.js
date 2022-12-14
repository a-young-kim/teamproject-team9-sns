const express = require("express");
const router = express.Router();
const fs = require("fs");
const request = require('request');
const multer = require("multer");

var upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get("/", function (req, res, next) {
  fs.readFile("./views/home.html", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();

  res.redirect("/");
});


router.post("/write", upload.single('image'),function (req, res, next) { //게시글 작성 버튼을 눌렀을 시

  const title = req.body.title;
  const subject = req.body.subject;

  console.log(req.file.filename);

  const options = {
    url: req.headers.origin + '/api/contents/insert', 
    method: 'POST',
    form: {
      id: req.session.loginId,
      username: req.session.username,
      title: title,
      contents: subject,
      image: req.file.filename //나중에 여기에 png를 붙이면 이미지 정상 출력
    }
  };

  request.post(options, function(err, httpResponse, body){
    if(err) console.log(err);

    const options2 = {
      url: req.headers.origin + '/api/contents/select_insertid', 
      method: 'post',
      form: {
      }
    };
  
    request.post(options2, function(err, httpResponse, body){
      if(err) console.log(err);
  
      const last_id = JSON.parse(body.slice(1, -1));
  
      insert_incre = Object.values(last_id);

      console.log(insert_incre);

      const options3 = {
        url: req.headers.origin + '/api/contents/update_incre', 
        method: 'POST',
        form: {
          incre: insert_incre[0],
          contents_id: insert_incre[0]
        }
      };

      request.post(options3, function(err, httpResponse, body){
        if(err) console.log(err);
      });
    });
  });



  
  res.redirect("/");
});

module.exports = router;
