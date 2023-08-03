
const buttons = document.getElementsByClassName("control");
const rightScore = document.getElementById("score");
const wrongScore = document.getElementById("wrong");

const pokeTypes = [
    {
        "type": "fire",
        "strength": "grass",
        "weakness": "water" + "ground"
    },
    {
        "type": "water",
        "strength": "fire" + "ground",
        "weakness": "grass" + "electric"
    },
    {
        "type": "grass",
        "strength": "water" + "ground",
        "weakness": "fire" + "flying"
    },
    {
        "type": "electric",
        "strength": "water" + "flying",
        "weakness": "ground"
    },
    {
        "type": "ground",
        "strength": "fire" + "electric",
        "weakness": "grass" + "water"
    },
    {
        "type": "flying",
        "strength": "grass",
        "weakness": "electric"
    }
];

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