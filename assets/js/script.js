
const buttons = document.getElementsByClassName("control");
const rightScore = document.getElementById("score");
const wrongScore = document.getElementById("wrong");
let score = 0;
let wrongAnswers = 0;

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

function checkAnswer(selectedType, targetedType) {
    const resultElement = dosumnet.getElementById("result");
    if (selectedType === targetedType) {
        resultElement.textContent = `You chose ${selectedType}. It's not very effective`;
        incrementWrongAnswer();
    } else if (isStrongAgainst(selectedType, targetType)) {
        resultElement.textContent = `You chose ${selectedType}. It's super effective!`;
        incrementScore();
    } else {
        resultElement.textContent = `You chose ${selectedType}. It's not very effective`;
        incrementWrongAnswer();
    }
}

function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("wrong").innerHTML);
    document.getElementById("wrong").innerText = ++oldScore;
}

function displayAttackQuestion() {
    const targetIndex = Math.floor(Math.random() * pokeTypes.length);
    const targetType = pokeTypes[targetIndex];
    const targetImageElement = document.getElementById("target-image");
    targetImageElement.src = targetType.imageSrc;
    targetImageElement.alt = targetType.alt;
    const attackButtonsContainer = document.getElementById(attack - buttons);
    attackButtonsContainer.innerHTML = "";
    for (const type of pokeTypes) {
        const button = document.createElement("button");
        const typeImage = document.createElement("img");
        typeImage.src = type.imageSrc;
        typeImage.alt = type.alt;
        button.setAttribute("data-type", type.type);
        button.appendChild(typeImage);
        button.addEventListener("click", function () {
            checkAnswer(type.type, targetType.type);
        });
        attackButtonsContainer.appendChild(button);
    }
}

function displayDefenseQuestion() {

}