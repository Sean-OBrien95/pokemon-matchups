
const buttons = document.getElementsByClassName("control");
const rightScore = document.getElementById("score");
const wrongScore = document.getElementById("wrong");
let score = 0;
let wrongAnswers = 0;
let selectedGameType = null;
let defenseTargetType = null;
let difficulty = "easy";
let overallScore = 0;
let overallWrongAnswers = 0;
let usernameInput = "";

const pokeTypes = [
    {
        type: "fire",
        strength: ["grass"],
        weakness: ["water", "ground", "rock"],
        imageSrc: "assets/images/fire-type.png",
        alt: "Fire type image"
    },
    {
        type: "water",
        strength: ["fire", "ground", "rock"],
        weakness: ["grass", "electric"],
        imageSrc: "assets/images/water-type.png",
        alt: "Water type image"
    },
    {
        type: "grass",
        strength: ["water", "ground", "rock"],
        weakness: ["fire", "flying"],
        imageSrc: "assets/images/grass-type.png",
        alt: "Grass type image"
    },
    {
        type: "ground",
        strength: ["fire", "electric"],
        weakness: ["grass", "water"],
        imageSrc: "assets/images/ground-type.png",
        alt: "Ground type image"
    },
    {
        type: "electric",
        strength: ["water", "flying"],
        weakness: ["ground"],
        imageSrc: "assets/images/electric-type.png",
        alt: "Electric type image"
    },
    {
        type: "flying",
        strength: ["grass", "fighting"],
        weakness: ["electric", "rock"],
        imageSrc: "assets/images/flying-type.png",
        alt: "Flying type image"
    },
    {
        type: "rock",
        strength: ["flying"],
        weakness: ["grass", "water", "fighting"],
        imageSrc: "assets/images/rock-type.png",
        alt: "Rock type image"
    },
    {
        type: "fighting",
        strength: ["rock"],
        weakness: ["flying"],
        imageSrc: "assets/images/fighting-type.png",
        alt: "Fighting type image"
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
                runGame(usernameInput, availableTypes);
            } else {
                alert("Please select the game type (attack or defense) before starting.");
            }
        } else {
            alert("Please select both the game type and difficulty before starting.");
        }
    });

    const usernameInputField = document.getElementById("username");
    usernameInputField.addEventListener("input", function () {
        usernameInput = this.value.trim();
        updatePlayButton();
    });

    const easyButton = document.getElementById("e-dif");
    const mediumButton = document.getElementById("m-dif");
    const hardButton = document.getElementById("h-dif");

    easyButton.addEventListener("click", function () {
        difficulty = "easy";
        availableTypes = getTypes(difficulty);
        easyButton.classList.add("active");
        mediumButton.classList.remove("active");
        hardButton.classList.remove("active");
        updatePlayButton();
    });

    mediumButton.addEventListener("click", function () {
        difficulty = "medium";
        availableTypes = getTypes(difficulty);
        easyButton.classList.remove("active");
        mediumButton.classList.add("active");
        hardButton.classList.remove("active");
        updatePlayButton();
    });

    hardButton.addEventListener("click", function () {
        difficulty = "hard";
        availableTypes = getTypes(difficulty);
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

});

function updatePlayButton() {
    const playButton = document.getElementById("playButton");
    const usernameInput = document.getElementById("username").value;

    if (selectedGameType && difficulty && usernameInput.trim() !== "") {
        playButton.disabled = false;
    } else {
        playButton.disabled = true;
    }
}

function runGame(usernameInput, availableTypes) {

    if (selectedGameType === "attack" || selectedGameType === "defense") {
        playRound(usernameInput, availableTypes);
    } else {
        alert("Please select the game type (attack or defense) before starting.");
    }
}

function playRound(usernameInput, availableTypes) {
    document.getElementById("attack-game").classList.add("hidden");
    document.getElementById("def-game").classList.add("hidden");

    if (selectedGameType === "attack") {
        document.getElementById("attack-game").classList.remove("hidden");
    } else if (selectedGameType === "defense") {
        document.getElementById("def-game").classList.remove("hidden");
    }

    displayGeneralQuestion(selectedGameType, usernameInput, availableTypes);
}

function getTypes(difficulty) {
    switch (difficulty) {
        case "easy": return pokeTypes.slice(0, 4);
        case "medium": return pokeTypes.slice(0, 6);
        case "hard": return pokeTypes.slice(0, 8);
        default: return pokeTypes.slice(0, 4);
    }
}

function checkAttackAnswer(selectedType, targetedType, usernameInput) {

    if (selectedType === targetedType) {
        alert(`Sorry ${usernameInput}, you chose ${selectedType}. It's not very effective.`);
        incrementWrongAnswer();

    } else if (isStrongAgainst(selectedType, targetedType)) {
        alert(`Well done ${usernameInput}! You chose ${selectedType}. It's super effective!`);
        incrementScore();

    } else {
        alert(`Sorry ${usernameInput}, you chose ${selectedType}. It's not very effective.`);
        incrementWrongAnswer();

    }

    stopGame();

}

function checkDefenseAnswer(selectedType, targetedType, usernameInput) {

    if (selectedType === targetedType) {
        alert(`Sorry, ${usernameInput}, you chose ${selectedType}.`);
        incrementWrongAnswer();

    } else if (isWeaknessOf(targetedType, selectedType)) {
        alert(`Well done ${usernameInput}! You chose ${selectedType}. It's super effective!`);
        incrementScore();
    } else {
        alert(`Sorry, ${usernameInput}, you chose ${selectedType}. It's not very effective.`);
        incrementWrongAnswer();

    }

    stopGame();

}

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

function displayGeneralQuestion(selectedType, usernameInput, availableTypes) {

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

    let buttonsContainer = null;

    if (selectedType == "attack") {
        buttonsContainer = document.getElementById("attack-buttons");
    } else if (selectedType == "defense") {
        buttonsContainer = document.getElementById("defense-buttons");
    }

    buttonsContainer.innerHTML = "";

    for (const type of availableTypes) {
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
