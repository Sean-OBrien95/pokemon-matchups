
const buttons = document.getElementsByClassName("control");
const rightScore = document.getElementById("score");
const wrongScore = document.getElementById("wrong");

const pokeTypes = [
    {
        type: "fire",
        strength: "grass",
        weakness: "water" + "ground",
        imageSrc: "../images/fire-type.png",
        alt: "Fire type image"
    },
    {
        type: "water",
        strength: "fire" + "ground",
        weakness: "grass" + "electric",
        imageSrc: "../images/water-type.png",
        alt: "Water type image"
    },
    {
        type: "grass",
        strength: "water" + "ground",
        weakness: "fire" + "flying",
        imageSrc: "../images/grass-type.png",
        alt: "Grass type image"
    },
    {
        type: "electric",
        strength: "water" + "flying",
        weakness: "ground",
        imageSrc: "../images/electric-type.png",
        alt: "Electric type image"
    },
    {
        type: "ground",
        strength: "fire" + "electric",
        weakness: "grass" + "water",
        imageSrc: "../images/ground-type.png",
        alt: "Ground type image"
    },
    {
        type: "flying",
        strength: "grass",
        weakness: "electric",
        imageSrc: "../images/flying-type.png",
        alt: "Flying type image"
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