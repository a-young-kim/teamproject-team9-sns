
let list = [];

window.onload = function(){

    let contents_list = document.getElementById("contents");

    const url = window.location.origin + '/api/contents/show_contents';

    list = fetch(url) //mysql에 담긴 데이터를 json형식으로 받아와서 조회하고 저장.
    .then((response) => {return response.json();})
    .then((data) => {
        var output =``;
        output = `    <div class="container justify-content-center mt-3">
        <div class="row">`;
    
        var i = 0;
    
        while(i<data.length){
        output = output + `<div class="col-5 m-2 border border-dark" >
        <h3>${data[i].title}</h3>
        <p>입력 날짜</p>
        </div>`;
        i = i + 1;
        if(i>1 && i % 2 == 0){
        output = output + `<div class="w-100 d-none d-md-block"></div>`;
        }
        }
    
        output = output + `</div></div>`;
    
        contents_list.innerHTML = output; 
    });


};