var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sessionParser = require('express-session');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(sessionParser);

// 
var indexRouter = require("./routes/index");
var signupRouter = require("./routes/signup");
var switchRouter = require("./routes/switch");
var feedRouter = require("./routes/feed");

// DB
var userRouter = require("./routes/api/user");
var profileRouter = require("./routes/api/profile");
var contentsRouter = require("./routes/api/contents");
var sessionsRouter = require("./routes/api/sessions");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({extended: false}));
// session
app.use(
  sessionParser({
      key: "login",
      secret: "loginID",
      resave: false,
      saveUninitialized: false,
      cookies:{
          expires: 60 * 60 *24
      },
      store :  new MySQLStore({ //session 파일을 mysql에 저장해주는 작업
        host : 'localhost',
        port : 3306,
        user: 'root',
        password: '1234',
        database: 'Team9',
        path : './sessions'})
  })
);

//
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/switch", switchRouter);
app.use("/feed", feedRouter);

// DB
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/contents", contentsRouter);
app.use("/api/sessions", sessionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("something wrong!");
});

module.exports = app;
