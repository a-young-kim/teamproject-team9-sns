let contents = [];
let time = [];
let start = 0;
let end = 0;
//let output = '';

window.onload = function(){
    const url = window.location.origin + '/api/following/getData';

    const res = fetch(url)
    .then((response) => response.json())
    .then(data => setFollowing(data));

};

function get(data, num){
    const url = window.location.origin + '/api/contents/show_contents';

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                id: data[num].following_id,
                username: data[num].following_username
            }),
        }).then((response) => response.json())
        .then(data => {
            SaveContents(data);
            resolve(data);
        });
        
    });
}

async function setFollowing(data){

   for(let i = 0; i < data.length ; i++){
        await get(data, i); 
    }

    if(time.length > 1){
        time.sort(sortFunction);
    }
    let contents_block = document.getElementById('contents');
    let output = '';

    console.log(contents);
    for(let i = 0; i < time.length; i ++){
        
        for(let j = 0; j < contents[time[i]].length; j++){
            
            output += `<div class="card" id="post_box" data-toggle="modal" data-target="#exampleModal">
                            <div class="card-header">
                                <div id="profile_circle"></div>
                                <h5 id="post_username">${contents[time[i]][j].id} : ${contents[time[i]][j].username}</h5>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${contents[time[i]][j].title}</h5>
                            </div>
                        </div>`;
        }
    }
   
    contents_block.innerHTML = output;
}

function sortFunction(a, b){
    let yearA = a.getFullYear();
    let yearB = b.getFullYear();

    if(yearA > yearB) return 1;
    else if(yearA == yearB){
        let monthA = a.getMonth();
        let monthB = b.getMonth();

        if(monthA > monthB) return 1;
        else if (monthA == monthB){
            let dateA = a.getDate();
            let dataB = b.getDate();

            if(dateA > dataB) return 1;
            else if(dateA == dataB){
                let hourA = a.getHours();
                let hourB = b.getHours();

                if(hourA > hourB) return 1;
                else if(hourA == hourB){
                    let minA = a.getMinutes();
                    let minB = b.getMinutes();

                    if(minA > minB) return 1;
                    else if(minA == minB){
                        let secA = a.getSeconds();
                        let secB = b.getSeconds();

                        if(secA > secB) return 1;
                        else return -1;
                    }
                    else return -1;
                }
                else return -1;
            }
            else return -1;
        }
        else return -1;
    }
    else return -1;
}
function SaveContents(data){
   
    for(let i = 0; i < data.length ; i++){
        time.push(new Date(data[i].timestamp));
    
        if(data[i].timestamp in contents){
            contents[new Date(data[i].timestamp)].push(data[i]);
        }

        else{
            contents[new Date(data[i].timestamp)] = [data[i]];
        }
    }
}