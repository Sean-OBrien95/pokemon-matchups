
const buttons = document.getElementsByClassName("control");
const rightScore = document.getElementById("score");
const wrongScore = document.getElementById("wrong");
const types = ["fire", "water", "grass", "electric", "ground", "flying"]

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                alert("let's play!");
            } else {
                let gameType = this.getAttribute("data-type");
                alert(`You clicked ${gameType}`);
            }
        });
    }
});


function runGame() {

}

function checkAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAttackQuestion() {

}

function displayDefenseQuestion() {

}