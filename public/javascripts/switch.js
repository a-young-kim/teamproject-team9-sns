let switchID = [];

function readyToSwitch(id){
    const context = document.getElementById(id);
    const color = context.style.backgroundColor;

    if(id in switchID){
        context.style.backgroundColor = 'white';

        switchID = swichswitchIDID.filter((ele) => {
            return ele != id;
        });
    }
    else{
        context.style.backgroundColor = 'gray';
        switchID.push(id);

        if(switchID.length == 2){
            Switch();
        }
    }
}

function Switch(){
    let firstID = switchID[0];
    let secondID = switchID[1];

    let saved_first = document.getElementById(firstID).innerHTML;
    let saved_second = document.getElementById(secondID).innerHTML;

    document.getElementById(firstID).innerHTML = saved_second;
    document.getElementById(secondID).innerHTML = saved_first;

    switchID = [];

    document.getElementById(firstID).style.backgroundColor = 'white';
    document.getElementById(secondID).style.backgroundColor = 'white';
}

window.onload = function(){
    const url = window.location.origin + '/api/contents/show_contents';

    const res = fetch(url)
    .then((response) => response.json())
    .then(data => set_Contents(data));
};

function set_Contents(data){
    let contents = document.getElementById('contents');
    var output = '';
    var i = 0;

    while(i < data.length){
     
        if( i % 2 == 0){
            output += `<div class="row p-1" id="div${i}">`;

            output += `<div class="col-6 card p-1 context" id="${i}_1" onclick="readyToSwitch(this.id)">
                        <div class="card-header">header${i}</div>
                        <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">${data[i].contents}</p>
                        </div>
                    </div>`;
        }

        else{
            output += `<div class="col-6 card p-1 context" id="${i}_2" onclick="readyToSwitch(this.id)">
                        <div class="card-header">header${i}</div>
                        <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">${data[i].contents}</p>
                        </div>
                    </div>`;
        }
        

        if(i % 2 == 1){
            output += `</div>`;
        }
        i = i + 1;
    }

    output += `</div>`;
    contents.innerHTML = output;
}

