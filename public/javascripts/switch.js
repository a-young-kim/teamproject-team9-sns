let switchID = [];
let SaveID = [];
let ContentsData = {};


function readyToSwitch(id){
    const context =  document.getElementById(id);

    //console.log(switchID);
    if(switchID.includes(id)){
        context.style.backgroundColor = 'white';

        switchID = switchID.filter((ele) => {
            return ele != id;
        });
    }
    else{
        //console.log(id);
        context.style.backgroundColor = 'gray';
        switchID.push(id);

        if(switchID.length == 2){
            Switch();
        }
    }
}

function Switch(){
    //console.log(ContentsData);

    let firstID = switchID[0];
    let secondID = switchID[1];

    let saved_first = document.getElementById(firstID).innerHTML;
    let saved_second = document.getElementById(secondID).innerHTML;

    document.getElementById(firstID).innerHTML = saved_second;
    document.getElementById(secondID).innerHTML = saved_first;
    
    document.getElementById(firstID).style.backgroundColor = 'white';
    document.getElementById(secondID).style.backgroundColor = 'white';

    SaveID.push(switchID);
    switchID = [];
}

window.onload = function(){
    const url = window.location.origin + '/api/contents/show_contents';

    const res = fetch(url)
    .then((response) => response.json())
    .then(data => set_Contents(data));

    switchID = [];
    SaveID = [];
};

function set_Contents(data){
    let contents = document.getElementById('contents');
    var output = '';

    for(let i = 0; i < data.length; i ++){
        ContentsData[data.length - data[i].incre -1] = data[i];

        if( i % 2 == 0){
            output += `<div class="row p-1" id="div${i}">`;

            output += `<div class="col-6 card p-1 context" id="${i}" onclick="readyToSwitch(this.id)">
                        <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">${data[i].contents}</p>
                        </div>
                    </div>`;
        }

        else{
            output += `<div class="col-6 card p-1 context" id="${i}" onclick="readyToSwitch(this.id)">
                        <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">${data[i].contents}</p>
                        </div>
                    </div>`;
        }
        

        if(i % 2 == 1){
            output += `</div>`;
        }
    }

    output += `</div>`;
    contents.innerHTML = output;
    console.log(ContentsData);
}

function SaveData(){
   
    for(let i = 0; i < SaveID.length; i++){

        let firstID = SaveID[i][0];
        let secondID = SaveID[i][1];
        let firstData = ContentsData[firstID];
        let secondData = ContentsData[secondID];

        console.log(firstID);
        console.log(secondID);

        // firstID change
        const url = window.location.origin + '/api/contents/update_incre';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                incre: Object.keys(ContentsData).length - Number(secondID) -1,
                contents_id: ContentsData[firstID].contents_id
            }),
        }).then((response) => response.json());

        // secondID change
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                incre: Object.keys(ContentsData).length - Number(firstID) -1,
                contents_id: ContentsData[secondID].contents_id
            }),
        }).then((response) => response.json());
        console.log(Object.keys(ContentsData).length - Number(secondID) -1);
        console.log(Object.keys(ContentsData).length - Number(firstID) -1);

        ContentsData[Number(secondID)] = firstData;
        ContentsData[Number(firstID)] = secondData;
    }

    console.log(ContentsData);
    SaveID = [];
}