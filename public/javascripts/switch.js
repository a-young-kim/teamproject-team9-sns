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