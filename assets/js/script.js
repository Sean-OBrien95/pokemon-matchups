
const buttons = document.getElementsByClassName("control");
const rightScore = document.getElementById("score");
const wrongScore = document.getElementById("wrong");
let score = 0;
let wrongAnswers = 0;
let selectedGameType = null;

const pokeTypes = [
    {
        type: "fire",
        strength: "grass",
        weakness: ["water" + "ground"],
        imageSrc: "assets/images/fire-type.png",
        alt: "Fire type image"
    },
    {
        type: "water",
        strength: ["fire" + "ground"],
        weakness: ["grass" + "electric"],
        imageSrc: "assets/images/water-type.png",
        alt: "Water type image"
    },
    {
        type: "grass",
        strength: ["water" + "ground"],
        weakness: ["fire" + "flying"],
        imageSrc: "assets/images/grass-type.png",
        alt: "Grass type image"
    },
    {
        type: "electric",
        strength: ["water" + "flying"],
        weakness: "ground",
        imageSrc: "assets/images/electric-type.png",
        alt: "Electric type image"
    },
    {
        type: "ground",
        strength: ["fire" + "electric"],
        weakness: ["grass" + "water"],
        imageSrc: "assets/images/ground-type.png",
        alt: "Ground type image"
    },
    {
        type: "flying",
        strength: "grass",
        weakness: "electric",
        imageSrc: "assets/images/flying-type.png",
        alt: "Flying type image"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const attackControlButton = document.getElementById("attack-control");
    const defenseControlButton = document.getElementById("def-control");

    const playButton = document.querySelector(".play");

    attackControlButton.addEventListener("click", function () {
        selectedGameType = "attack";
        attackControlButton.classList.add("active");
        defenseControlButton.classList.remove("active");
    });

    defenseControlButton.addEventListener("click", function () {
        selectedGameType = "defense";
        defenseControlButton.classList.add("active");
        attackControlButton.classList.remove("active");
    });

    playButton.addEventListener("click", function () {
        if (selectedGameType === "attack") {
            document.getElementById("attack-game").classList.remove("hidden");
            runGame();
        } else {
            displayDefenseQuestion();
        }
    });
});


function runGame() {
    displayAttackQuestion();
}

function checkAnswer(selectedType, targetedType) {
    const resultElement = document.getElementById("result");
    if (selectedType === targetedType) {
        resultElement.textContent = `You chose ${selectedType}. It's not very effective`;
        incrementWrongAnswer();
    } else if (isStrongAgainst(selectedType, targetedType)) {
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
    const targetImages = document.getElementsByClassName("target-image");
    const targetType = pokeTypes[Math.floor(Math.random() * pokeTypes.length)];

    for (const targetImageElement of targetImages) {
        targetImageElement.setAttribute("src", targetType.imageSrc);
        targetImageElement.setAttribute("alt", targetType.alt);
    }

    const attackButtonsContainer = document.getElementById("attack-buttons");
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