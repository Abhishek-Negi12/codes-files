let timer = 10;
let score = 0;
let hitrn = 0;

function makebubble() {

    let clutter = "";
    for (let i = 1; i <= 152; i++) {
        let rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble"> ${rn} </div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}

function getNewHit(){
   hitrn =  Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = hitrn;
}

function runTimer() {
    let timerint = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        }
        else{
            clearInterval(timerint);
            document.querySelector("#pbtm").innerHTML = `<h1> Game Over </h1>`
        }
    }, 1000)

}

function increaseScore(){
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

document.querySelector("#pbtm").addEventListener("click" , function(dets){
    let clickednum = Number(dets.target.textContent);
    if (clickednum === hitrn){
        increaseScore();
        makebubble();
        getNewHit();
    }
})


makebubble();
getNewHit();
runTimer();
document.querySelector("#scoreval").textContent = score;
// increaseScore();
