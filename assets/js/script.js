
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
// let timerDuration = getTimerDuration(difficulty);
let timerInterval;
let overallScore = 0;
let overallWrongAnswers = 0;
// let correctAnswersThisRound = 0;
// let wrongAnswersThisRound = 0;
// let answersGivenThisRound = 0;

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
    playButton.disabled = true;
    updatePlayButton();

    playButton.addEventListener("click", function () {
        const usernameInput = document.getElementById("username").value;

        console.log("Username:", usernameInput);
        if (usernameInput === "") {
            alert("Please enter your name before starting.");
            return;
        }

        if (selectedGameType && difficulty) {
            document.getElementById("home").classList.add("hidden");
            if (selectedGameType === "attack" || selectedGameType === "defense") {
                runGame(usernameInput);
            } else {
                alert("Please select the game type (attack or defense) before starting.");
            }
        } else {
            alert("Please select both the game type and difficulty before starting.");
        }
    });

    const easyButton = document.getElementById("e-dif");
    const mediumButton = document.getElementById("m-dif");
    const hardButton = document.getElementById("h-dif");

    easyButton.addEventListener("click", function () {
        difficulty = "easy";
        timerDuration = getTimerDuration(difficulty);
        easyButton.classList.add("active");
        mediumButton.classList.remove("active");
        hardButton.classList.remove("active");
        updatePlayButton();
    });

    mediumButton.addEventListener("click", function () {
        difficulty = "medium";
        timerDuration = getTimerDuration(difficulty);
        easyButton.classList.remove("active");
        mediumButton.classList.add("active");
        hardButton.classList.remove("active");
        updatePlayButton();
    });

    hardButton.addEventListener("click", function () {
        difficulty = "hard";
        timerDuration = getTimerDuration(difficulty);
        easyButton.classList.remove("active");
        mediumButton.classList.remove("active");
        hardButton.classList.add("active");
        updatePlayButton();
    });

    attackControlButton.addEventListener("click", function () {
        selectedGameType = "attack";
        attackControlButton.classList.add("active");
        defenseControlButton.classList.remove("active");
        updatePlayButton();
    });

    defenseControlButton.addEventListener("click", function () {
        selectedGameType = "defense";
        defenseControlButton.classList.add("active");
        attackControlButton.classList.remove("active");
        updatePlayButton();
    });

    playButton.addEventListener("click", function () {
        if (selectedGameType && difficulty) {
            document.getElementById("home").classList.add("hidden");
            if (selectedGameType === "attack" || selectedGameType === "defense") {
                runGame(usernameInput);
            } else {
                alert("Please select the game type (attack or defense) before starting.");
            }
        } else {
            alert("Please select both the game type and difficulty before starting.");
        }
    });

});

function updatePlayButton() {
    const playButton = document.getElementById("playButton");

    if (selectedGameType && difficulty) {
        playButton.disabled = false;
    } else {
        playButton.disabled = true;
    }
}

// function runGame(usernameInput) {
//     console.log("Running game with username:", usernameInput);
//     if (selectedGameType && difficulty) {
//         playRound(usernameInput);
//     }
// }

function runGame(usernameInput) {
    console.log("Running game with username:", usernameInput);
    if (selectedGameType === "attack" || selectedGameType === "defense") {
        playRound(usernameInput);
    } else {
        alert("Please select the game type (attack or defense) before starting.");
    }
}

function playRound(usernameInput) {
    document.getElementById("attack-game").classList.add("hidden");
    document.getElementById("def-game").classList.add("hidden");

    if (selectedGameType === "attack") {
        document.getElementById("attack-game").classList.remove("hidden");
    } else if (selectedGameType === "defense") {
        document.getElementById("def-game").classList.remove("hidden");
    }

    displayGeneralQuestion(selectedGameType, usernameInput);
}

function getTimerDuration(difficulty) {
    switch (difficulty) {
        case "easy": return 30;
        case "medium": return 20;
        case "hard": return 10;
        default: return 30;
    }
}

// function startTimer() {
//     let timeRemaining = timerDuration;
//     const timerElement = document.getElementById("timer");
//     timerInterval = setInterval(function () {
//         document.getElementById("timer").innerText = timeRemaining;
//         timeRemaining--;
//         if (timeRemaining < 0) {
//             clearInterval(timerInterval);
//             currentRound++;
//             playNextRound();
//         }
//     }, 1000);
// }

function checkAttackAnswer(selectedType, targetedType, usernameInput) {
    const resultElement = document.getElementById("result");
    if (selectedType === targetedType) {
        alert(`Sorry ${usernameInput}, you chose ${selectedType}. It's not very effective`);
        incrementWrongAnswer();
        // wrongAnswersThisRound++;
    } else if (isStrongAgainst(selectedType, targetedType)) {
        alert(`Well done ${usernameInput}! You chose ${selectedType}. It's super effective!`);
        incrementScore();
        // correctAnswersThisRound++;
    } else {
        alert(`Sorry ${usernameInput}, you chose ${selectedType}. It's not very effective`);
        incrementWrongAnswer();
        // wrongAnswersThisRound++;
    }

    stopGame();

    // answersGivenThisRound++;
    // if (answersGivenThisRound >= 3) {
    //     stopRound();
    // }
}

function checkDefenseAnswer(selectedType, targetedType, usernameInput) {
    const resultElement = document.getElementById("result");
    if (selectedType === targetedType) {
        alert(`Sorry, ${usernameInput}, you chose ${selectedType}. It's not very effective.`);
        incrementWrongAnswer();

    } else if (isWeaknessOf(targetedType, selectedType)) {
        alert(`Well done ${usernameInput}! You chose ${selectedType}. It's super effective!`);
        incrementScore();
    } else {
        alert(`Sorry, ${usernameInput}, you chose ${selectedType}. It's not very effective.`);
        incrementWrongAnswer();
        // wrongAnswersThisRound++;
    }

    stopGame();

    // answersGivenThisRound++; 
    // if (answersGivenThisRound >= 3) {
    //     stopRound();
    // }
}

// function stopRound() {
//     clearInterval(timerInterval);
//     answersGivenThisRound = 0;
//     selectedGameType = null;
//     resetButtons();
//     currentRound++;
//     playNextRound();
// }

function stopGame() {
    resetButtons();
    updatePlayButton();

    selectedGameType = null;
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("attack-game").classList.add("hidden");
    document.getElementById("def-game").classList.add("hidden");
    document.getElementById("result").textContent = "";
}

function resetButtons() {
    const buttons = document.querySelectorAll(".control");
    buttons.forEach(button => button.classList.remove("active"));
}

function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("wrong").innerHTML);
    document.getElementById("wrong").innerText = ++oldScore;
}

function isStrongAgainst(selectedType, targetedType) {
    const type = pokeTypes.find((t) => t.type === selectedType);
    return type.strength.includes(targetedType);
}

function isWeaknessOf(selectedType, targetedType) {
    const type = pokeTypes.find((t) => t.type === targetedType);
    return type.weakness.includes(selectedType);
}

function displayGeneralQuestion(selectedType, usernameInput) {

    const resultElement = document.getElementById("result");
    resultElement.textContent = "";

    const targetImages = document.getElementsByClassName("target-image");
    const targetType = pokeTypes[Math.floor(Math.random() * pokeTypes.length)];

    for (const targetImageElement of targetImages) {
        targetImageElement.setAttribute("src", targetType.imageSrc);
        targetImageElement.setAttribute("alt", targetType.alt);
    }

    if (selectedType == "attack") {
        const randomTypeImage = document.getElementById("random-type-a");
        randomTypeImage.src = targetType.imageSrc;
        randomTypeImage.alt = targetType.alt;
    } else if (selectedType == "defense") {
        const randomTypeImage = document.getElementById("random-type-b");
        randomTypeImage.src = targetType.imageSrc;
        randomTypeImage.alt = targetType.alt;
    }

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
                checkAttackAnswer(type.type, targetType.type, usernameInput);
            } else if (selectedType == "defense") {
                checkDefenseAnswer(type.type, targetType.type, usernameInput);
            }
        });
        buttonsContainer.appendChild(button);
    }
}
