const express = require("express");
const router = express.Router();
const fs = require("fs");

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

module.exports = router;
