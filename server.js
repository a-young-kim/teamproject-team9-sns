var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql');
var base64 = require('base-64');
var jwt = require('jsonwebtoken');
var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '1234', //비번에 굉장히 신경을 많이 써주어야 한다.
    database: 'Team9'
});

url = "http://localhost:80"

conn.connect();

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: '123412sadfF1312@#!F',
    resave: false,
    saveUninitialized: true,
    store :  new MySQLStore({
        host : 'localhost',
        port : 3306,
        user: 'root',
        password: '1234',
        database: 'Team9',
        path : './sessions'})
}));

app.use('/img', express.static('img'));

function starthtml(){ //귀찮은 html도입부 자동작성
    return(`
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LetterBox</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </head>
  <body>
    `);
}

function endhtml(){ //귀찮은 html 끝부분 자동 작성
    return(`
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
  </body>
</html>
    `);
}

var draw_page = { //html페이지를 작성하는 함수를 모아둔 객체

    feed_main : function(contents_list,user_id, user_name, instruction,user_name1,user_name2,user_name3,
        instruction1,instruction2,instruction3,following_num,follower_num,contents_num){ //유저 피드 화면을 작성하는 함수
        return`
        ${starthtml()}

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">LetterBox</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">

            <!--여기에 리스트 아이템으로 메뉴 아아템 삽입-->

      </ul>
    </div>
  </div>
</nav>
 

        <div class = "container justify-content-center mt-3">
            <div class = "row">
                <div class="col-2">
                    <img src="${url}/img/profile_img.png" alt="#" width="120" height="120">
                </div>

                <div class = "col-7 mt-1">
                    <p>${user_id}</p>
                    <p>${user_name}</p>
                    <p>${instruction}</p>
                </div>

                <div class="col-3 row">
                    <div class = "row">
                    <div class="col-4">
                        <p>게시물</p>
                        <p>&nbsp${contents_num}</p>
                      </div>

                    <div class="col-4">
                        <p>팔로워</p>
                        <p>&nbsp${follower_num}</p>
                      </div>

                    <div class="col-4">
                        <p>팔로잉</p>
                        <p>&nbsp${following_num}</p>
                      </div>
                    </div>

                    <!-- Button trigger modal -->
<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    프로필 편집
  </button>

            </div>

          <div class = "container  justify-content-center mt-3">
            <div class = "row">
                <form class="d-flex" role="search">
                    <input class="form-control" type="search" placeholder="게시글 검색" aria-label="Search">
                    <button class="btn btn-outline-dark" type="submit">
                        <img src="${url}/img/search_img.png" alt="#" width="30" height="24" class="d-inline-block align-text-top">
                    </button>
                  </form>
            </div>
          </div>


          <!--아래에 적힌 내용은 모두 예시로 실제 js에 적용시 함수화 한다음 데이터를 받아와서 적용할 예정임-->
          
          ${contents_list}

            
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">프로필 편집</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!--여기에 프로필 편집창 내용물을 삽입-->
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">1번프로필</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">2번프로필</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">3번프로필</button>
            </li>
          </ul>


          <div class="tab-content" id="myTabContent">        
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
          
          
            <!--프로필1번 내용물-->

            <div class = "container justify-content-center mt-3">
                <div class = "row">
                    <div class="col-4">
                        <img src="img/profile_img.png" alt="Logo" width="120" height="120">
                    </div>
    
                    <div class = "col-8 mt-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text">아이디</span>
                            <div class="form-floating">
                              <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" disabled>
                              <label for="floatingInputGroup1">${user_id}</label>
                            </div>
                          </div>

                          <div class="input-group mb-3">
                            <span class="input-group-text">이름</span>
                            <div class="form-floating">
                              <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                              <label for="floatingInputGroup1">${user_name1}</label>
                            </div>
                          </div>
                    </div>
                </div>

                <div class = "container  justify-content-center mt-3">
                    <div class = "mb-3">소개</div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">${instruction1}</label>
                      </div>
                  </div>

                  <div class = "container  justify-content-center">
                  <div class = "row">
                    <div class = "col-2  mt-3 mb-3">
                        게시글
                    </div>

                    <div class = "col-10 mt-2"> 
                        <a href="/edit_writing" class="btn btn-dark" tabindex="-1" role="button">게시글 편집</a>
                    </div>

                  </div>
                  </div>              
            </div>
            </div>

            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
            <!--프로필 2번 내용물-->

            <div class = "container justify-content-center mt-3">
            <div class = "row">
                <div class="col-4">
                    <img src="img/profile_img.png" alt="Logo" width="120" height="120">
                </div>

                <div class = "col-8 mt-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text">아이디</span>
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" disabled>
                          <label for="floatingInputGroup1">${user_id}</label>
                        </div>
                      </div>

                      <div class="input-group mb-3">
                        <span class="input-group-text">이름</span>
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                          <label for="floatingInputGroup1">${user_name2}</label>
                        </div>
                      </div>
                </div>
            </div>

            <div class = "container  justify-content-center mt-3">
                <div class = "mb-3">소개</div>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">${instruction2}</label>
                  </div>
              </div>

              <div class = "container  justify-content-center">
              <div class = "row">
                <div class = "col-2  mt-3 mb-3">
                    게시글
                </div>

                <div class = "col-10 mt-2"> 
                    <a href="/edit_writing" class="btn btn-dark" tabindex="-1" role="button">게시글 편집</a>
                </div>

              </div>
              </div>              
        </div>


            </div>

            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
            <!--프로필 3번 내용물-->

            <div class = "container justify-content-center mt-3">
            <div class = "row">
                <div class="col-4">
                    <img src="img/profile_img.png" alt="Logo" width="120" height="120">
                </div>

                <div class = "col-8 mt-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text">아이디</span>
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" disabled>
                          <label for="floatingInputGroup1">${user_id}</label>
                        </div>
                      </div>

                      <div class="input-group mb-3">
                        <span class="input-group-text">이름</span>
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                          <label for="floatingInputGroup1">${user_name3}</label>
                        </div>
                      </div>
                </div>
            </div>

            <div class = "container  justify-content-center mt-3">
                <div class = "mb-3">소개</div>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">${instruction3}</label>
                  </div>
              </div>

              <div class = "container  justify-content-center">
              <div class = "row">
                <div class = "col-2  mt-3 mb-3">
                    게시글
                </div>

                <div class = "col-10 mt-2"> 
                    <a href="/edit_writing" class="btn btn-dark" tabindex="-1" role="button">게시글 편집</a>
                </div>

              </div>
              </div>              
        </div>
            
            </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <a href="/" class="btn btn-dark m-1" role="button">적용</a>
        </div>
      </div>
    </div>
  </div>
      
    ${endhtml()}
`
    },

    feed_list : function(dir_list){ //게시글 목록을 작성하는 함수

        var list = `    <div class="container justify-content-center mt-3">
                        <div class="row">`;

        var i = 0;

        while(i<dir_list.length){
            list = list + `      <div class="col-5 m-2 border border-dark" >
            <h3>${dir_list[i].title}</h3>
            <p>입력 날짜</p>
          </div>`;
            i = i + 1;
            if(i>1 && i % 2 == 0){
                list = list + `<div class="w-100 d-none d-md-block"></div>`;
            }
        }
        list = list + `</div></div>`
        
    return list
    },

    feed_edit_writing : function(){ //게시글 편집 화면을 작성하는 함수
    }

}

app.get('/', (req,res) => {

    res.redirect('/feed');
})

app.get('/feed', (req,res) => {

    list = [];

    conn.query('SELECT * FROM contents WHERE username = "testuser"', function(err,results){
        list = results;

        listpage = draw_page.feed_list(list)

        console.log(list);
    
        res.send(draw_page.feed_main(listpage));
    });
})



app.listen(80,function(){
    console.log('Connected 80 port!!');
});