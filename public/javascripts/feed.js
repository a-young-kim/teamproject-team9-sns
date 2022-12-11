let list = [];

window.onload = function () {
  //feed 화면 새로고침될 때마다 팔로워 수, 팔로잉 수 변경되도록 함
  {
    const url_follower_num_update =
      window.location.origin + "/api/follower/update_num";
    const res_follower_num_update = fetch(url_follower_num_update, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((response) => response.json());

    const url_following_num_update =
      window.location.origin + "/api/following/update_num";
    const res_following_num_update = fetch(url_following_num_update, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((response) => response.json());
  } //여기까지 팔로워 수, 팔로잉 수 업데이트 코드

  let contents_list = document.getElementById("contents");
  let contests_num = document.getElementById("contents_num");

  const url = window.location.origin + "/api/contents/show_contents";

  list = fetch(url) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // var output =``;
      // output = `    <div class="container justify-content-center mt-3">
      // <div class="row">`;

      // var i = 0;

      // while(i<data.length){
      // output = output + `<div class="col-5 m-2 border border-dark" >
      // <h3>${data[i].title}</h3>
      // <p>입력 날짜</p>
      // </div>`;
      // i = i + 1;
      // if(i>1 && i % 2 == 0){
      // output = output + `<div class="w-100 d-none d-md-block"></div>`;
      // }
      // }

      output = output + `</div></div>`;

      // contents_list.innerHTML = output;

      var output = ``;

      output += `<div class="row p-1">`;

      var i = 0;

      contests_num.innerText = data.length;

      while (i < data.length) {
        if (i % 2 == 0) {
          output += `<div class="row p-1">`;
        }

        output =
          output +
          `<div class="col-6 card p-1 context">
              <div class="card-body" id="${i}" onclick="Contents_update(this.id)" style="cursor: pointer">

              <h5 class="card-title">${data[i].title}</h5>
              <p class="card-text"></p>
              </div></div>`;

        if (i % 2 == 1) {
          output += `</div>`;
        }

        i = i + 1;
      }

      output += `</div>`;

      contents_list.innerHTML = output;
    });

  const url_2 = window.location.origin + "/api/profile/check";

  let user_name_1 = document.getElementById("user_name_1");
  let user_name_2 = document.getElementById("user_name_2");
  let user_name_3 = document.getElementById("user_name_3");

  let user_name_1_label = document.getElementById("user_name1_label");
  let user_name_2_label = document.getElementById("user_name2_label");
  let user_name_3_label = document.getElementById("user_name3_label");

  list = fetch(url_2) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      user_name_1.value = data[0].username1;
      user_name_2.value = data[0].username2;
      user_name_3.value = data[0].username3;

      user_name_1_label.innerText = data[0].username1;
      user_name_2_label.innerText = data[0].username2;
      user_name_3_label.innerText = data[0].username3;

    });

  const url_3 = window.location.origin + "/api/user_detail";

  let user_intro_1 = document.getElementById("user_intro_1");
  let user_intro_2 = document.getElementById("user_intro_2");
  let user_intro_3 = document.getElementById("user_intro_3");

  list = fetch(url_3) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      user_intro_1.value = data[0].introduction;
      user_intro_2.value = data[1].introduction;
      user_intro_3.value = data[2].introduction;
    });

  const url_4 = window.location.origin + "/api/user_detail/check_follow";

  let follower_num = document.getElementById("follower_num");
  let following_num = document.getElementById("following_num");
  let current_introduction = document.getElementById("instruction");

  list = fetch(url_4) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      follower_num.innerText = data[0].follower_num;
      following_num.innerText = data[0].following_num;
      current_introduction.innerText = data[0].introduction;
    });

  // 팔로워 클릭했을 때 팔로워 읽어오는 코드
  const url_follower = window.location.origin + "/api/follower";
  let follower_list = document.getElementById("follower_view");

  list = fetch(url_follower)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var output = ``;

      var i = 0;


      while (i < data.length) {
        output =
          output +
          ` <div class="card" style="margin-bottom: 5px">
                <div class="card-body">${data[i].follower_id}
                  <button type="button" class="btn btn-outline-dark" id="${i}" style="float: right" onclick="follower_delete(this.id)">삭제</button>
                </div>
              </div>
              `;

        i = i + 1;
      }

      follower_list.innerHTML = output;
    });

  // 팔로잉 클릭했을 때 팔로잉 읽어오는 코드
  const url_following = window.location.origin + "/api/following";
  let following_list = document.getElementById("following_view");

  list = fetch(url_following)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var output = ``;

      var i = 0;

      while (i < data.length) {
        output =
          output +
          ` <div class="card" style="margin-bottom: 5px">
                <div class="card-body">
                ${data[i].following_id}
                  <button type="button" class="btn btn-outline-dark" id="${i}" style="float: right" onclick="following_delete(this.id)">팔로우</button>
                
                </div>
              </div>
              `;

        i = i + 1;
      }

      following_list.innerHTML = output;
    });
};

//팔로워 삭제
function follower_delete(id) {
  const url_follower = window.location.origin + "/api/follower";

  list = fetch(url_follower)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // alert(data[id].follower_id);
      const url = window.location.origin + "/api/follower/delete";
      const res1 = fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          follower_id: data[id].follower_id,
        }),
      }).then((response) => response.json());

    });

  const url_following = window.location.origin + "/api/following";

  list = fetch(url_following)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const url = window.location.origin + "/api/following/delete_2";
      const res1 = fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data[id].following_id,
        }),
      }).then((response) => response.json());
    });
}

//팔로잉 삭제
function following_delete(id) {
  const url_following = window.location.origin + "/api/following";

  list = fetch(url_following)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const url = window.location.origin + "/api/following/delete";
      const res1 = fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          following_id: data[id].following_id,
        }),
      }).then((response) => response.json());
    });

  const url_follower = window.location.origin + "/api/follower";

  list = fetch(url_follower)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const url2 = window.location.origin + "/api/follower/delete_reverse";
      const res2 = fetch(url2, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          follower_id: data[id].follower_id,
        }),
      }).then((response) => response.json());
    });
}

function Contents_update(id) {
  // 본인 게시글 클릭했을 때 해당 게시글 읽어오는 코드
  const url_contentsdetail =
    window.location.origin + "/api/contents/show_contents";
  let post_subject = document.getElementById("post_subject");
  let post_detail = document.getElementById("post_detail");

  list = fetch(url_contentsdetail)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      post_subject.value = data[id].title;
      post_detail.value = data[id].contents;
      let content_id = data[id].contents_id;

      //수정하고 저장 버튼 눌렀을 때 게시글 내용 수정되는 코드
      document.getElementById("btn_post_update").onclick = function () {
        alert("게시글이 수정되었습니다.");
        let new_subject = document.getElementById("post_subject").value;
        let new_detail = document.getElementById("post_detail").value;

        const url = window.location.origin + "/api/contents/update_contents";
        const res1 = fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: new_subject,
            contents: new_detail,
            contents_id: content_id,
          }),
        }).then((response) => response.json());

        location.reload();
      };

      //삭제 버튼 누르면 삭제됨
      document.getElementById("btn_post_delete").onclick = function () {
        alert("게시글이 삭제되었습니다.");

        const url2 = window.location.origin + "/api/contents/delete";
        const res2 = fetch(url2, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents_id: content_id,
          }),
        }).then((response) => response.json());

        location.reload();
      };
    });
}
