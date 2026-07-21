let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscore=document.querySelector("#user-score");
const compscore=document.querySelector("#comp-score");

const compMove = () => {
    let move = Math.random();
    if (move < 0.33) {
        move = "rock";
    }
    else if (move < 0.66) {
        move = "paper";
    }
    else {
        move = "scissors";
    }
    return move;
};
const gameDraw = () => {
    msg.innerText = "Draw.";
    msg.style.backgroundColor = "#081b31";
}
const determineWinner=(win,userChoice,genCompMove)=>{
    if(win){
        msg.innerText=`Won.Your ${userChoice} beats ${genCompMove}`;
        msg.style.backgroundColor="green";
        userScore++;
        userscore.innerText=userScore;
    }
    else{
        msg.innerText=`Lost.${genCompMove} beats Your ${userChoice}`;
        msg.style.backgroundColor="red";
        compScore++;
        compscore.innerText=compScore;
    }
}
const playgame = (userChoice) => {
    const genCompMove = compMove();
    if (genCompMove === userChoice) {
        gameDraw();
    }
    else{
        let win=true;
        if (userChoice==="rock"){
            if(genCompMove==="paper"){
                win=false;
            }
            else{
                win=true;
            }
        }
        else if(userChoice==="paper"){
            if(genCompMove==="scissors"){
                win=false;
            }
            else{
                win=true;
            }
        }
        else if(userChoice==="scissors"){
            if(genCompMove==="rock"){
                win=false;
            }
            else{
                win=true;
            }
        }
    determineWinner(win,userChoice,genCompMove);

    }

}
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    })
});
