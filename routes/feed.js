const express = require("express");
const fs = require("fs");
const request = require('request');

const router = express.Router();

// get
router.get('/', function(req, res){

  //const url = req.headers.origin + '/api/profile/check';

  console.log(req.url);

    if(req.session.loginId){ //세션에 로그인 아이디가 존재하는 경우 성공적으로 피드 화면 진입.
        output =`
                
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LetterBox</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </head>
  <body>

    <script src="/javascripts/feed.js"></script>
    
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
                          <img src="../images/profile1.png" alt="#" width="120" height="120">
                      </div>
      
                      <div class = "col-7 mt-1">
                          <p id = "user_id">${req.session.loginId}</p>`;


                          output += `<p id = "user_name">${req.session.loginUserName}</p>
                          <p id = "instruction"> </p>
                      </div>
      
                      <div class="col-3 row">
                          <div class = "row">
                          <div class="col-4">
                              <p>게시물</p>
                              <p id="contents_num">&nbsp </p>
                            </div>
      
                          <div class="col-4">
                              <p>팔로워</p>
                              <p id = "follower_num">&nbsp </p>
                            </div>
      
                          <div class="col-4">
                              <p>팔로잉</p>
                              <p id ="following_num">&nbsp </p>
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
                              <img src="../images/search_img.png" alt="#" width="30" height="24" class="d-inline-block align-text-top">
                          </button>
                        </form>
                  </div>
                </div>
      
      
                <!--아래에 적힌 내용은 모두 예시로 실제 js에 적용시 함수화 한다음 데이터를 받아와서 적용할 예정임-->
                
            <div id = "contents">
                1
            </div>
      
                  
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
                              <img src="../images/profile1.png" alt="Logo" width="120" height="120">
                          </div>
          
                          <div class = "col-8 mt-4">
                              <div class="input-group mb-3">
                                  <span class="input-group-text">아이디</span>
                                  <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" disabled>
                                    <label for="floatingInputGroup1"> </label>
                                  </div>
                                </div>
      
                                <div class="input-group mb-3">
                                  <span class="input-group-text">이름</span>
                                  <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                                    <label for="floatingInputGroup1"> </label>
                                  </div>
                                </div>
                          </div>
                      </div>
      
                      <div class = "container  justify-content-center mt-3">
                          <div class = "mb-3">소개</div>
                          <div class="form-floating">
                              <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                              <label for="floatingTextarea"> </label>
                            </div>
                        </div>
      
                        <div class = "container  justify-content-center">
                        <div class = "row">
                          <div class = "col-2  mt-3 mb-3">
                              게시글
                          </div>
      
                          <div class = "col-10 mt-2"> 
                              <a href="/switch" class="btn btn-dark" tabindex="-1" role="button">게시글 편집</a>
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
                          <img src="../images/profile1.png" alt="Logo" width="120" height="120">
                      </div>
      
                      <div class = "col-8 mt-4">
                          <div class="input-group mb-3">
                              <span class="input-group-text">아이디</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" disabled>
                                <label for="floatingInputGroup1"> </label>
                              </div>
                            </div>
      
                            <div class="input-group mb-3">
                              <span class="input-group-text">이름</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                                <label for="floatingInputGroup1">   </label>
                              </div>
                            </div>
                      </div>
                  </div>
      
                  <div class = "container  justify-content-center mt-3">
                      <div class = "mb-3">소개</div>
                      <div class="form-floating">
                          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                          <label for="floatingTextarea"> </label>
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
                          <img src="../images/profile1.png" alt="Logo" width="120" height="120">
                      </div>
      
                      <div class = "col-8 mt-4">
                          <div class="input-group mb-3">
                              <span class="input-group-text">아이디</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" disabled>
                                <label for="floatingInputGroup1"> </label>
                              </div>
                            </div>
      
                            <div class="input-group mb-3">
                              <span class="input-group-text">이름</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                                <label for="floatingInputGroup1">  </label>
                              </div>
                            </div>
                      </div>
                  </div>
      
                  <div class = "container  justify-content-center mt-3">
                      <div class = "mb-3">소개</div>
                      <div class="form-floating">
                          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                          <label for="floatingTextarea"> </label>
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>
        `;

        res.send(output);
    }
    else
    {
        res.redirect("/"); //세션에 로그인 아이디가 존재하지 않는 경우 로그인 페이지로 보낸다.
    }

    // if(req.session.loginId){ //세션에 로그인 아이디가 존재하는 경우 성공적으로 피드 화면 진입.
    //     fs.readFile('./views/feed.html', function(err, data){
    //         if(err){
    //             res.send('에러');
    //         }
    //         else{
    //             let loginId = req.session.loginId;

    //             res.writeHead(200, {'Content-Type': 'feed.html'});
    //             res.write(data);
    //             res.end();
    //         }
    //     });
    // }
    // else
    // {
    //     res.redirect("/"); //세션에 로그인 아이디가 존재하지 않는 경우 로그인 페이지로 보낸다.
    // }
});

module.exports = router;