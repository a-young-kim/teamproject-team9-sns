var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');


var draw_page = { //html페이지를 작성하는 함수를 모아둔 객체

    feed_main : function(){ //유저 피드 화면을 작성하는 함수
        return`
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="./jquery-3.4.1.min.js"></script>
    <title>feed page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </head>
  <body>
 
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <input class="form-control" type="search" placeholder="유저 검색" aria-label="Search">
            <button class="btn btn-outline-dark" type="submit">
                <img src="img/search_img.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            </button>
          </form>
        </div>

        <div class = "container justify-content-center mt-3">
            <div class = "row">
                <div class="col-2">
                    <img src="url/img/profile_img.png" alt="Logo" width="120" height="120">
                </div>

                <div class = "col-7 mt-1">
                    <p>USER ID</p>
                    <p>USER NAME</p>
                    <p>DESCRIPTION</p>
                </div>

                <div class="col-3 row">
                    <div class = "row">
                    <div class="col-4">
                        <p>게시물</p>
                        <p>&nbspdata</p>
                      </div>

                    <div class="col-4">
                        <p>팔로워</p>
                        <p>&nbspdata</p>
                      </div>

                    <div class="col-4">
                        <p>팔로잉</p>
                        <p>&nbspdata</p>
                      </div>
                    </div>

                    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    프로필 편집
  </button>

            </div>

          <div class = "container  justify-content-center mt-3">
            <div class = "row">
                <form class="d-flex" role="search">
                    <input class="form-control" type="search" placeholder="게시글 검색" aria-label="Search">
                    <button class="btn btn-outline-dark" type="submit">
                        <img src="img/search_img.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                    </button>
                  </form>
            </div>
          </div>


          <!--아래에 적힌 내용은 모두 예시로 실제 js에 적용시 함수화 한다음 데이터를 받아와서 적용할 예정임-->


          <!--control 참고용 코드
          <div class = "col-10 mt-2">
                        <a href="/create" class="btn btn-primary" tabindex="-1" role="button">게시글 작성 (프로토타입)</a>
                        <a href="/update" class="btn btn-primary" tabindex="-1" role="button">게시글 수정 (프로토타입)</a>
                        <a href="/delete" class="btn btn-primary" tabindex="-1" role="button">게시글 삭제 (프로토타입)</a>
                    </div>
                    -->
            
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
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" disabled>2번프로필</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" disabled>3번프로필</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
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
                              <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                              <label for="floatingInputGroup1">UserID</label>
                            </div>
                          </div>

                          <div class="input-group mb-3">
                            <span class="input-group-text">이름</span>
                            <div class="form-floating">
                              <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
                              <label for="floatingInputGroup1">UserNAME</label>
                            </div>
                          </div>
                    </div>
                </div>

                <div class = "container  justify-content-center mt-3">
                    <div class = "mb-3">소개</div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">소개문을 작성해주세요</label>
                      </div>
                  </div>

                  <div class = "container  justify-content-center">
                  <div class = "row">
                    <div class = "col-2  mt-3 mb-3">
                        게시글
                    </div>

                    <div class = "col-10 mt-2">
                        <a href="./edit_writing.html" class="btn btn-primary" tabindex="-1" role="button">게시글 편집</a>
                    </div>

                  </div>
                  </div>              
            </div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <!--프로필 2번부터 미구현. 후에 함수를 생성하고 데이터에 따라 자동으로 값을 집어넣는 기능 넣을 예정-->
            </div>
            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <!--프로필3번 내용물-->
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary">적용</button>
        </div>
      </div>
    </div>
  </div>
      
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
  </body>
</html>
`
    },

    feed_list : function(dir_list){ //게시글 목록을 작성하는 함수
        var list = `    <div class="container justify-content-center mt-3">
                        <div class="row justify-content-center">`;

        var i = 0;

        while(i<dir_list.length){
            list = list + `      <div class="col-5 m-2 border border-dark" >
            <h3><a href = "/?id=${dir_list[i]}">${dir_list[i]}</a></h3>
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

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){  //유저 피드 화면의 경우 (나중에 html끼리 합칠 때 꼭 이름 바꿔줄 것!)
        if(queryData.id === undefined){
        fs.readdir('./data', function(err,dir_list){
            list = draw_page.feed_list(dir_list);

            response.writeHead(200);
            response.end(draw_page.feed_main(list , `<div class = "col-10 mt-2">
            <a href="/create" class="btn btn-primary" tabindex="-1" role="button">게시글 작성 (프로토타입)</a>
            </div>`,``));
        });
        }else if(queryData.id.includes("update")){
            fs.readdir('./data', function(error, dir_list){
                var title = queryData.id.replace("update_","");
                fs.readFile(`data/${title}`,'utf8',function(err,description/*여기서 description은 본문 내용*/ ){
              response.writeHead(200);
              response.end(draw_page.feed_main(`` , `<div class = "col-10 mt-2">
                <a href="/" class="btn btn-primary" tabindex="-1" role="button">돌아가기 (프로토타입)</a>
                </div>`,`
                <form action = "/update_process" method = "post">
            
                <input type = "hidden" name = "id" value = "${title}">
          
                <p><input type = "text" name = "title" placeholder = "title" value = "${title}" ></p>
                <p>
                    <textarea name = "description" placeholder = "description">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
          
                </form>
                `));
              });
            });
        }else if(queryData.id.includes("delete")){
            
        }
        else{
            fs.readdir('./data', function(error, dir_list){
                fs.readFile(`data/${queryData.id}`,'utf8',function(err,description/*여기서 description은 본문 내용*/ ){
                var title = queryData.id;
                response.writeHead(200);
                response.end(draw_page.feed_main(`` , `<div class = "col-12 mt-2">
                <a href="/" class="btn btn-primary" tabindex="-1" role="button">돌아가기 (프로토타입)</a>
                <a href="/?id=update_${queryData.id}" class="btn btn-primary" tabindex="-1" role="button">게시글 수정 (프로토타입)</a>
                </div>`,`
                <h2>${title}</h2>${description}
                <form action="/delete_process" method = "post">
                    <input type = "hidden" name = "id" value = "${title}">
                    <input type = "submit" class="btn btn-primary" tabindex="-1" role="button" value = "게시글 삭제 (프로토타입)">
                </form>`));
                });
            })   
        }


    

    }else if(pathname === `/create`){ //게시글 작성을 누른 경우
        if(queryData.id === undefined){
            fs.readdir('./data',function(err,dir_list){
                var title = 'create'
                response.writeHead(200);
                response.end(draw_page.feed_main(``, `<div class = "col-10 mt-2">
                <a href="/" class="btn btn-primary" tabindex="-1" role="button">돌아가기(프로토타입)</a>
                </div>`,
                `
                <div class="container justify-content-center mt-3">
                <form action = "/create_process" method = "post">

                <p><input type = "text" name = "title" placeholder = "title" ></p>
                <p>
                    <textarea name = "description" placeholder = "description"></textarea>
                </p>
                <p>
                    <input type="submit" value = "작성"> 
                </p>

                </form>
                </div>
                `));
            })
        }
    }else if(pathname ===`/create_process`){
        var body = ``;
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            //이때 post.title이 제목 기능을 수행한다.
            fs.writeFile(`data/${title}`,description, 'utf-8',function(err){
          response.writeHead(302, {Location: `/`}); //유저 피드 화면으로 돌아간다.
          response.end();
            })
          });    
    }else if(pathname == '/update_process'){ //근데 이거 한글로 작성할 땐 오류 많이 나던데 어떻게 해결하지??
        var body = ``;
        request.on('data',function(data){
          body = body + data;
        });
        request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id; //여기서 id값도 받아와 적용해준다! 수정 작업에만 적용되는 이야기임!
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`,`data/${title}`, function(error){
            fs.writeFile(`data/${title}`,description, 'utf-8',function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              //해당 로케이션으로 즉시 이동한다! 즉 글 작성 버튼을 누르는 즉시 새로운 페이지가 나타나는 셈 헉~
              response.end();
              //이런 식으로 게시글 생성이 이루어진다! 게시글 데이터와 제목 저장이 가능해진다!
                })
              //수정작업을 수행해 주었으니까 이름도 바꿔줘야지.
          });
        });
    }else if(pathname == '/delete_process'){ //근데 이거 한글로 작성할 땐 오류 많이 나던데 어떻게 해결하지??
        var body = ``;
        request.on('data',function(data){
          body = body + data;
        });
        request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          fs.unlink(`data/${id}`,function(err){
            response.writeHead(302, {Location: `/`});
            response.end();
          });
        });
      }
    else{
        //더 이상 올바른 pathname이 존재하지 않으니까~
        //웹페이지가 존재하지 않는경우
        response.writeHead(404);
        response.end('Not Found');
      }
});

app.listen(3000);

