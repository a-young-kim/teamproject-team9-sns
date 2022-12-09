
let list = [];

window.onload = function(){

    let contents_list = document.getElementById("contents");
    let contests_num = document.getElementById("contents_num");

    const url = window.location.origin + '/api/contents/show_contents';

    list = fetch(url) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {return response.json();})
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

        while(i<data.length){

            if(i % 2 == 0)
            {
                output += `<div class="row p-1">`;
            }

            output = output + `<div class="col-6 card p-1 context">
              <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <p class="card-text"></p>
              </div></div>`;

            if(i % 2 == 1)
            {
                output += `</div>`;
            }

            i = i + 1;
        }

        output += `</div>`;

        contents_list.innerHTML = output;

    });


    const url_2 = window.location.origin + '/api/profile/check';

    let user_name_1 = document.getElementById("user_name_1");
    let user_name_2 = document.getElementById("user_name_2");
    let user_name_3 = document.getElementById("user_name_3");

    let user_name_1_label = document.getElementById("user_name1_label");
    let user_name_2_label = document.getElementById("user_name2_label");
    let user_name_3_label = document.getElementById("user_name3_label");

    list = fetch(url_2) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {return response.json();})
    .then((data) => {
        user_name_1.value = data[0].username1;
        user_name_2.value = data[0].username2;
        user_name_3.value = data[0].username3;

        user_name_1_label.innerText = data[0].username1;
        user_name_2_label.innerText = data[0].username2;
        user_name_3_label.innerText = data[0].username3;
    })


    const url_3 = window.location.origin + '/api/user_detail';

    let user_intro_1 = document.getElementById("user_intro_1");
    let user_intro_2 = document.getElementById("user_intro_2");
    let user_intro_3 = document.getElementById("user_intro_3");

    list = fetch(url_3) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {return response.json();})
    .then((data) => {
        user_intro_1.value = data[0].introduction;
        user_intro_2.value = data[1].introduction;
        user_intro_3.value = data[2].introduction;
    })

    const url_4 = window.location.origin + '/api/user_detail/check_follow';

    let follower_num = document.getElementById("follower_num");
    let following_num = document.getElementById("following_num");
    let current_introduction = document.getElementById("instruction");

    list = fetch(url_4) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {return response.json();})
    .then((data) => {
        follower_num.innerText =data[0].follower_num;
        following_num.innerText =data[0].following_num;
        current_introduction.innerText = data[0].introduction;
    })




};