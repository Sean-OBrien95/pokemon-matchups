
const buttons = document.getElementsByClassName("control");
const rightScore = document.getElementById("score");
const wrongScore = document.getElementById("wrong");
let score = 0;
let wrongAnswers = 0;
let selectedGameType = null;
let defenseTargetType = null;
let numRounds = 3;
let currentRound = 1;
let difficulty = "easy";
let timerDuration = getTimerDuration(difficulty);
let timerInterval;
let overallScore = 0;
let overallWrongAnswers = 0;

const pokeTypes = [
    {
        type: "fire",
        strength: ["grass"],
        weakness: ["water", "ground"],
        imageSrc: "assets/images/fire-type.png",
        alt: "Fire type image"
    },
    {
        type: "water",
        strength: ["fire", "ground"],
        weakness: ["grass", "electric"],
        imageSrc: "assets/images/water-type.png",
        alt: "Water type image"
    },
    {
        type: "grass",
        strength: ["water", "ground"],
        weakness: ["fire", "flying"],
        imageSrc: "assets/images/grass-type.png",
        alt: "Grass type image"
    },
    {
        type: "electric",
        strength: ["water", "flying"],
        weakness: ["ground"],
        imageSrc: "assets/images/electric-type.png",
        alt: "Electric type image"
    },
    {
        type: "ground",
        strength: ["fire", "electric"],
        weakness: ["grass", "water"],
        imageSrc: "assets/images/ground-type.png",
        alt: "Ground type image"
    },
    {
        type: "flying",
        strength: ["grass"],
        weakness: ["electric"],
        imageSrc: "assets/images/flying-type.png",
        alt: "Flying type image"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const attackControlButton = document.getElementById("attack-control");
    const defenseControlButton = document.getElementById("def-control");

    const playButton = document.querySelector(".play");

    const easyButton = document.getElementById("e-dif");
    const mediumButton = document.getElementById("m-dif");
    const hardButton = document.getElementById("h-dif");

    easyButton.addEventListener("click", function () {
        difficulty = "easy";
        timerDuration = getTimerDuration(difficulty);
        easyButton.classList.add("active");
        mediumButton.classList.remove("active");
        hardButton.classList.remove("active");
    });

    mediumButton.addEventListener("click", function () {
        difficulty = "medium";
        timerDuration = getTimerDuration(difficulty);
        easyButton.classList.remove("active");
        mediumButton.classList.add("active");
        hardButton.classList.remove("active");
    });

    hardButton.addEventListener("click", function () {
        difficulty = "hard";
        timerDuration = getTimerDuration(difficulty);
        easyButton.classList.remove("active");
        mediumButton.classList.remove("active");
        hardButton.classList.add("active");
    });

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
        if (selectedGameType && difficulty) {
            document.getElementById("home").classList.add("hidden");
            runGame();
        } else {
            alert("Please select both the game type and difficulty before starting.");
        }
    });
});

function runGame() {
    currentRound = 1;
    overallScore = 0;
    overallWrongAnswers = 0;
    startTimer();
    playNextRound();
}

function playNextRound() {
    if (currentRound <= numRounds) {
        if (selectedGameType === "attack") {
            document.getElementById("attack-game").classList.remove("hidden");
            document.getElementById("def-game").classList.add("hidden");
            displayGeneralQuestion(selectedGameType);
        } else if (selectedGameType === "defense") {
            document.getElementById("def-game").classList.remove("hidden");
            document.getElementById("attack-game").classList.add("hidden");
            displayGeneralQuestion(selectedGameType);
        }
    } else {
        if (overallScore > overallWrongAnswers) {
            alert("Congratulations! You won the best of 3 series.");
        } else if (overallScore < overallWrongAnswers) {
            alert("You lost the best of 3 series. Try again!");
        }
    }
    currentRound = 1;
    overallScore = 0;
    overallWrongAnswers = 0;
    selectedGameType = null;
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("result").textContent = "";
    document.getElementById("score").innerText = overallScore;
    document.getElementById("wrong").innerText = overallWrongAnswers;
}

function getTimerDuration(difficulty) {
    switch (difficulty) {
        case "easy": return 30;
        case "medium": return 20;
        case "hard": return 10;
        default: return 30;
    }
}

function startTimer() {
    let timeRemaining = timerDuration;
    timerInterval = setInterval(function () {
        document.getElementById("timer").innerText = timeRemaining;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            currentRound++;
            playNextRound();
        }
    }, 1000);
}

function checkAttackAnswer(selectedType, targetedType) {
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

function checkDefenseAnswer(selectedType, targetedType) {
    const resultElement = document.getElementById("result");
    if (selectedType === targetedType) {
        resultElement.textContent = `You chose ${selectedType}. It's not very effective`;
        incrementWrongAnswer();
    } else if (isWeaknessOf(selectedType, targetedType)) {
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

// function displayAttackQuestion() {

//     const resultElement = document.getElementById("result");
//     resultElement.textContent = "";

//     const targetImages = document.getElementsByClassName("target-image");
//     const targetType = pokeTypes[Math.floor(Math.random() * pokeTypes.length)];

//     for (const targetImageElement of targetImages) {
//         targetImageElement.setAttribute("src", targetType.imageSrc);
//         targetImageElement.setAttribute("alt", targetType.alt);
//     }

//     const randomTypeImage = document.querySelector(".random-type-image");
//     randomTypeImage.src = targetType.imageSrc;
//     randomTypeImage.alt = targetType.alt;

//     const attackButtonsContainer = document.getElementById("attack-buttons"); /**move up */
//     attackButtonsContainer.innerHTML = "";

//     for (const type of pokeTypes) {
//         const button = document.createElement("button");
//         const typeImage = document.createElement("img");
//         typeImage.src = type.imageSrc;
//         typeImage.alt = type.alt;
//         button.setAttribute("data-type", type.type);
//         button.appendChild(typeImage);
//         button.addEventListener("click", function () {
//             checkAttackAnswer(type.type, targetType.type);
//         });
//         attackButtonsContainer.appendChild(button);
//     }
// }

function isStrongAgainst(selectedType, targetedType) {
    const type = pokeTypes.find((t) => t.type === selectedType);
    return type.strength.includes(targetedType);
}

// function displayDefenseQuestion() {

//     const resultElement = document.getElementById("result");
//     resultElement.textContent = "";

//     const targetImages = document.getElementsByClassName("target-image");
//     const defenseTargetType = pokeTypes[Math.floor(Math.random() * pokeTypes.length)];

//     for (const targetImageElement of targetImages) {
//         targetImageElement.setAttribute("src", defenseTargetType.imageSrc);
//         targetImageElement.setAttribute("alt", defenseTargetType.alt);
//     }

//     const randomTypeImage = document.querySelector(".random-type-def");
//     randomTypeImage.src = defenseTargetType.imageSrc;
//     randomTypeImage.alt = defenseTargetType.alt;

//     const defenseButtonsContainer = document.getElementById("def-buttons");
//     defenseButtonsContainer.innerHTML = "";

//     for (const type of pokeTypes) {
//         const button = document.createElement("button");
//         const typeImage = document.createElement("img");
//         typeImage.src = type.imageSrc;
//         typeImage.alt = type.alt;
//         button.setAttribute("data-type", type.type);
//         button.appendChild(typeImage);
//         button.addEventListener("click", function () {
//             checkDefenseAnswer(type.type, defenseTargetType.type);
//         });
//         defenseButtonsContainer.appendChild(button);
//     }

// }

function isWeaknessOf(selectedType, targetedType) {
    const type = pokeTypes.find((t) => t.type === targetedType);
    return type.weakness.includes(selectedType);
}

function displayGeneralQuestion(selectedType) {

    const resultElement = document.getElementById("result");
    resultElement.textContent = "";

    const targetImages = document.getElementsByClassName("target-image");
    const targetType = pokeTypes[Math.floor(Math.random() * pokeTypes.length)];

    for (const targetImageElement of targetImages) {
        targetImageElement.setAttribute("src", targetType.imageSrc);
        targetImageElement.setAttribute("alt", targetType.alt);
    }

    const randomTypeImage = document.querySelector(".random-type-image");

    randomTypeImage.src = targetType.imageSrc;
    randomTypeImage.alt = targetType.alt;

    let buttonsContainer = "";

    if (selectedType == "attack") {
        buttonsContainer = document.getElementById("attack-buttons");
    } else if (selectedType == "defense") {
        buttonsContainer = document.getElementById("defense-buttons");
    }

    buttonsContainer.innerHTML = "";

    for (const type of pokeTypes) {
        const button = document.createElement("button");
        const typeImage = document.createElement("img");
        typeImage.src = type.imageSrc;
        typeImage.alt = type.alt;
        button.setAttribute("data-type", type.type);
        button.appendChild(typeImage);
        button.addEventListener("click", function () {
            if (selectedType == "attack") {
                checkAttackAnswer(type.type, targetType.type);
            } else if (selectedType == "defense") {
                checkDefenseAnswer(type.type, targetType.type);
            }
        });
        buttonsContainer.appendChild(button);
    }
}
