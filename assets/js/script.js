// different variables

let selectedGameType = null;
let difficulty = "easy";
let usernameInput = "";
let availableTypes = "";

/**
 * Pokemon type arrays. Each contains strength, weakness, and img source
 * that will be used throughout the application
 */

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
        strength: ["flying", "fire"],
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

// wait for the DOM to be fully loaded before executing any JavaScript

document.addEventListener("DOMContentLoaded", function () {

    /**
     * set up event listeners for the play buttons and keep
     * it diabled initially. checks if username and difficulty
     * are slected
     */

    const attackControlButton = document.getElementById("attack-control");
    const defenseControlButton = document.getElementById("def-control");

    const playButton = document.querySelector(".play");
    playButton.disabled = true;
    updatePlayButton();

    playButton.addEventListener("click", function () {

        const usernameInput = document.getElementById("username").value;

        if (usernameInput === "") {
            return;
        }
        if (selectedGameType && difficulty) {
            document.getElementById("home").classList.add("hidden");
            if (selectedGameType === "attack" || selectedGameType === "defense") {
                runGame(usernameInput, availableTypes);
            }
        }
    });

    const usernameInputField = document.getElementById("username");
    usernameInputField.addEventListener("input", function () {
        usernameInput = this.value.trim();
        updatePlayButton();
    });

    /**
     * Set up event listeners and click events for the
     * various buttons that appear relating to game type and difficulty
     */

    const easyButton = document.getElementById("e-dif");
    const mediumButton = document.getElementById("m-dif");
    const hardButton = document.getElementById("h-dif");

    easyButton.addEventListener("click", function () {
        difficulty = "easy";
        availableTypes = getTypes(difficulty);
        easyButton.classList.add("active");
        mediumButton.classList.remove("active");
        hardButton.classList.remove("active");
        easyButton.classList.add("selected-difficulty");
        mediumButton.classList.remove("selected-difficulty");
        hardButton.classList.remove("selected-difficulty");
        updatePlayButton();
    });

    mediumButton.addEventListener("click", function () {
        difficulty = "medium";
        availableTypes = getTypes(difficulty);
        easyButton.classList.remove("active");
        mediumButton.classList.add("active");
        hardButton.classList.remove("active");
        easyButton.classList.remove("selected-difficulty");
        mediumButton.classList.add("selected-difficulty");
        hardButton.classList.remove("selected-difficulty");
        updatePlayButton();
    });

    hardButton.addEventListener("click", function () {
        difficulty = "hard";
        availableTypes = getTypes(difficulty);
        easyButton.classList.remove("active");
        mediumButton.classList.remove("active");
        hardButton.classList.add("active");
        easyButton.classList.remove("selected-difficulty");
        mediumButton.classList.remove("selected-difficulty");
        hardButton.classList.add("selected-difficulty");
        updatePlayButton();
    });

    attackControlButton.addEventListener("click", function () {
        selectedGameType = "attack";
        attackControlButton.classList.add("active");
        attackControlButton.classList.add("selected-attack");
        defenseControlButton.classList.remove("active");
        defenseControlButton.classList.remove("selected-defense");

        updatePlayButton();
    });

    defenseControlButton.addEventListener("click", function () {
        selectedGameType = "defense";
        defenseControlButton.classList.add("active");
        defenseControlButton.classList.add("selected-defense");
        attackControlButton.classList.remove("active");
        attackControlButton.classList.remove("selected-attack");


        updatePlayButton();
    });

});

/**
 * update state of play button based on usr inputs.
 * checks if play button disabled/enabled
 */

function updatePlayButton() {
    const playButton = document.getElementById("playButton");
    const usernameInput = document.getElementById("username").value;

    if (selectedGameType && difficulty && usernameInput.trim() !== "") {
        playButton.disabled = false;
    } else {
        playButton.disabled = true;
    }
}

/** 
 * runs game based on users input. Check which game and how many types to
 * generate based on selected difficulty
 */

function runGame(usernameInput, availableTypes) {

    if (selectedGameType === "attack" || selectedGameType === "defense") {
        playRound(usernameInput, availableTypes);
    }
}

/**
 * starts game type based on user input and hides sections that
 * would not be needed for the selected game type
 */

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

/**
 * returns established array of pokemon types based on
 * the selected difficulty
 */

function getTypes(difficulty) {
    switch (difficulty) {
        case "easy": return pokeTypes.slice(0, 4);
        case "medium": return pokeTypes.slice(0, 6);
        case "hard": return pokeTypes.slice(0, 8);
        default: return pokeTypes.slice(0, 4);
    }
}

// check user answers and displays appropriate alert

function checkAnswer(selectedType, targetedType, usernameInput, selectedGameType) {

    if (selectedGameType === "attack") {
        if (selectedType === targetedType) {
            alert(`Sorry ${usernameInput}, you chose ${selectedType}. Try another round!`);
            incrementWrongAnswer();
        } else if (isStrongAgainst(selectedType, targetedType)) {
            alert(`Well done ${usernameInput}! You chose ${selectedType}. It's super effective!`);
            incrementScore();
        } else {
            alert(`Sorry ${usernameInput}, you chose ${selectedType}. Try another round!`);
            incrementWrongAnswer();

        }
    } else if (selectedGameType === "defense") {
        if (selectedType === targetedType) {
            alert(`Sorry, ${usernameInput}, you chose ${selectedType}. Try another round!`);
            incrementWrongAnswer();

        } else if (isWeaknessOf(targetedType, selectedType)) {
            alert(`Well done ${usernameInput}! You chose ${selectedType}. Thats correct!`);
            incrementScore();
        } else {
            alert(`Sorry, ${usernameInput}, you chose ${selectedType}. Try another round!`);
            incrementWrongAnswer();

        }
    }

    stopGame();

}

/**
 * stops the game and resets buttons and user interface
 */

function stopGame() {
    updatePlayButton();

    selectedGameType = null;
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("attack-game").classList.add("hidden");
    document.getElementById("def-game").classList.add("hidden");
    document.getElementById("result").textContent = "";

    const difficultyButtons = document.querySelectorAll(".control");
    difficultyButtons.forEach(button => button.classList.remove("selected-difficulty"));

    const attackButton = document.getElementById("attack-control");
    attackButton.classList.remove("selected-attack");

    const defenseButton = document.getElementById("def-control");
    defenseButton.classList.remove("selected-defense");

    const buttons = document.querySelectorAll(".control");
    buttons.forEach(button => button.classList.remove("active"));
}

// increments correct answers

function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerText = ++oldScore;

}

// increments incorrect answers

function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("wrong").innerHTML);
    document.getElementById("wrong").innerText = ++oldScore;

}

// checks if the selected type is strong against the target type

function isStrongAgainst(selectedType, targetedType) {

    const type = pokeTypes.find((t) => t.type === selectedType);
    return type.strength.includes(targetedType);

}

// checks if the selected type is weak against the target type

function isWeaknessOf(selectedType, targetedType) {

    const type = pokeTypes.find((t) => t.type === targetedType);
    return type.weakness.includes(selectedType);

}

/**
 * Display the selected question from the user. Takes information from
 * the selected game type(attack/defense), inputted name, and available types
 */

function displayGeneralQuestion(selectedType, usernameInput, availableTypes, selectedGameType) {

    const resultElement = document.getElementById("result");
    resultElement.textContent = "";

    const targetImages = document.getElementsByClassName("target-image");

    // Get maximum index based on difficulty

    let maxIndex = 0;

    if (difficulty === "easy") {
        maxIndex = 3;
    } else if (difficulty === "medium") {
        maxIndex = 5;
    } else if (difficulty === "hard") {
        maxIndex = 7;
    }

    // select a random type and update images

    const randomIndex = Math.floor(Math.random() * maxIndex);
    const targetType = pokeTypes[randomIndex];

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

    // Creates buttons for available types

    for (const type of availableTypes) {
        const button = document.createElement("button");
        const typeImage = document.createElement("img");
        typeImage.src = type.imageSrc;
        typeImage.alt = type.alt;
        button.setAttribute("data-type", type.type);
        button.appendChild(typeImage);
        button.addEventListener("click", function () {
            checkAnswer(type.type, targetType.type, usernameInput, selectedType);
        });
        buttonsContainer.appendChild(button);
    }
}
