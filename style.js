
let m;
let gameStatus = false;
const body = document.body;
const tbl = document.createElement('table');
let btn3 = document.getElementById("btn-3");
let btn4 = document.getElementById("btn-4");
let reset = document.getElementById("reset");



function tableCreate(m) {

    let count = 0,c=0;
    for (let i = 0; i < m; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < m; j++) {
            const td = tr.insertCell();
            if (count !== m * m - 1) {
                td.appendChild(document.createTextNode(`${count + 1}`));
                td.style.border = '1px solid black';
                td.setAttribute('id', count++);
            }
            else {
                td.appendChild(document.createTextNode(` `));
                td.style.border = '1px solid black';
                td.setAttribute('id', count++);
            }
        }

    }
    let container= document.getElementById('table-container');
    container.appendChild(tbl);
    tbl.setAttribute('id','content-table');
    //body.appendChild(tbl);
    for (let k = 0; k < 1000; k++) {
        let r1 = Math.floor(Math.random() * m * m);
        let r2 = Math.floor(Math.random() * m * m);
        let temp;
        let v1 = document.getElementById(r1);
        let v2 = document.getElementById(r2);
        temp = v1.innerHTML;
        v1.innerHTML = v2.innerHTML;
        v2.innerHTML = temp;
    }
    for (let k = 0; k < m * m; k++) {
        document.getElementById(k).addEventListener('click', function clicked(){
            let blank_pos= getId_blank(m);
            let current_pos=k;
            if(Math.abs(current_pos-blank_pos)%m===0){
                // Vertical
                if(current_pos>blank_pos){
                    // slide moves up
                    moveDown(current_pos,blank_pos,m);
                    give_color(m);
                }
                else{
                    // slider moves down
                    moveUp(current_pos,blank_pos,m);
                    give_color(m);
                }
            }
            else if(Math.ceil((current_pos+1)/m)===Math.ceil((blank_pos+1)/m)){
                // Horiontal
                if(current_pos>blank_pos){
                    // slide moves right
                    moveRight(current_pos,blank_pos,m);
                    give_color();
                }
                else{
                    // slider moves left
                    moveLeft(current_pos,blank_pos,m);
                    give_color(m);
                }
            }
        });
    }
}

function clear() {
    var element = document.getElementsByTagName('tr'), index;

    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }

};


btn3.addEventListener("click", function () {
    clear();
    tableCreate(3);
    give_color(3);
    
});

btn4.addEventListener("click", function () {
    clear();
    tableCreate(4);
    give_color(4);

});

function give_color(m) {
    for (let i = 0; i < m * m; i++) {
        let v = document.getElementById(i);
        if (i === v.innerHTML - 1) {
            v.style.backgroundColor = "green";
        }
        else if(v.innerHTML===' '){
            v.style.backgroundColor = "orange";
        }
        else{
            v.style.backgroundColor = "333333";
        }
    }
}

function getId_blank(m) {
    for (let i = 0; i < m * m; i++) {
        if (document.getElementById(i).innerHTML === ' ')
            return i;
    }
}

function moveDown(current_pos,blank_pos,m){
    let slider_pos=blank_pos;
    while(slider_pos!==current_pos){
        swap(slider_pos,slider_pos+m);
        slider_pos+=m;
    }
}

function moveUp(current_pos,blank_pos,m){
    let slider_pos=blank_pos;
    while(slider_pos!==current_pos){
        swap(slider_pos,slider_pos-m);
        slider_pos-=m;
    }
}

function moveLeft(current_pos,blank_pos,m){
    let slider_pos=blank_pos;
    while(slider_pos!==current_pos){
        swap(slider_pos,slider_pos-1);
        slider_pos-=1;
    }
}

function moveRight(current_pos,blank_pos,m){
    let slider_pos=blank_pos;
    while(slider_pos!==current_pos){
        swap(slider_pos,slider_pos+1);
        slider_pos+=1;
        give_color(m);
    }
}

function swap(i,j){
    let temp= document.getElementById(i).innerHTML;
    document.getElementById(i).innerHTML=document.getElementById(j).innerHTML;
    document.getElementById(j).innerHTML=temp;

}