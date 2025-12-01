let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score")
const compScorePara = document.querySelector("#comp-score")

const genCompchoice = () => {
    const options = ["rock" , "paper", "scissors"];
    const rendIdx = Math.floor(Math.random()*3);
    return options[rendIdx];
};

const drowGame = () =>{
    msg.innerText = "game was drow. Play again";
    msg.style.backgroundColor = "#081b31"
}

const showWinner = (userwin , userchoice , compChoice) => {
    if(userwin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `you win! ${userchoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `you win! ${compChoice} beats ${userchoice}`;
        msg.innerText = `you lose `;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userchoice) =>{
    const compChoice = genCompchoice();

    if (userchoice === compChoice){
        drowGame();
    }else{
        let userwin = true;
        if (userwin === "rock"){
            userwin = compChoice ==="paper" ? false : true;
        } else if (userchoice === "paper"){
            userwin = compChoice === "scissors" ? false : true;
        } else {
            userwin = compChoice ==="rock" ? false : true;
        }
        showWinner(userwin , userchoice ,compChoice);
    }

};

choices.forEach((choice) => {
    choice.addEventListener("click" , () =>{
        const userchoice = choice.getAttribute("id");
        playGame(userchoice);
    });
});