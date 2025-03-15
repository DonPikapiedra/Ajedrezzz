let board;
let game = new Chess();
let botSkill = 0;
let isDarkMode = false;
let moveSound = new Audio("move.mp3");

function startGame(skill) {
    botSkill = skill;
    game = new Chess();
    board.position("start");
    updateHistory();

    console.log(`Jugando contra Bot ELO ${skill}`);
}

function onDrop(source, target) {
    let move = game.move({ from: source, to: target, promotion: "q" });

    if (!move) return "snapback";

    moveSound.play();  // Sonido de movimiento
    updateHistory();
}

function updateHistory() {
    let history = game.history();
    let historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    history.forEach((move, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${move}`;
        historyList.appendChild(listItem);
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    isDarkMode = !isDarkMode;

    let themeButton = document.getElementById("theme-toggle");
    themeButton.textContent = isDarkMode ? "Modo Claro ☀️" : "Modo Oscuro 🌙";
}

document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

function generateChess960() {
    let pieces = ["r", "n", "b", "q", "k", "b", "n", "r"];
    
    do {
        pieces = pieces.sort(() => Math.random() - 0.5);
    } while (!isValid960(pieces));

    let position = pieces.join("") + "/pppppppp/8/8/8/8/PPPPPPPP/" + pieces.join("").toUpperCase() + " w KQkq - 0 1";
    
    document.getElementById("position960").innerText = position;
}

function isValid960(pieces) {
    let kingIndex = pieces.indexOf("k");
    let rooks = [pieces.indexOf("r"), pieces.lastIndexOf("r")];
    
    return rooks[0] < kingIndex && kingIndex < rooks[1];
}

board = Chessboard("board", {
    draggable: true,
    dropOffBoard: "snapback",
    position: "start",
    onDrop: onDrop
});
