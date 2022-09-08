//login

const form = document.getElementById("form");
let circlePlayer = document.getElementById("circle-player-input");
let xPlayer = document.getElementById("x-player-input");
const errorElement = document.getElementById("error");
loginContainer = document.getElementById("login-container-bg");

const playerOneContainer = document.getElementById("player-one");
const playerTwoContainer = document.getElementById("player-two");

form.addEventListener("submit", (e) => {
  let messages = [];
  if (
    circlePlayer.value === "" ||
    circlePlayer.value == null ||
    xPlayer.value === "" ||
    xPlayer.value == null
  ) {
    messages.push("Enter both players");
  }
  if (xPlayer.value == circlePlayer.value) {
    messages.push("Enter different names");
  }
  if (xPlayer.value.length > 15 || circlePlayer.value.length > 15) {
    messages.push("Names must be less than 15 characters");
  }
  if (xPlayer.value.length < 3 || circlePlayer.value.length < 3) {
    messages.push("Names must be more than 3 characters");
  }
  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerHTML = messages.join("<br>");
  } else {
    e.preventDefault();

    circlePlayer = circlePlayer.value;
    xPlayer = xPlayer.value;
    playerOneContainer.innerHTML = circlePlayer;
    playerTwoContainer.innerHTML = xPlayer;

    startGame();
    loginContainer.classList.add("no-display");
  }
});

// game

const xClass = "x";
const circleClass = "circle";
let circleTurn;
const cells = document.querySelectorAll("[data-cell]");
const winningBanner = document.getElementById("winning-message");
const winningText = document.querySelector("[data-winning-message-text]");
const winnningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const restartBtn = document.getElementById("restart-btn");
const newGameBtn = document.getElementById("new-game-btn");
const resetBtn = document.getElementById("reset-btn");

function startGame() {
  circleTurn = true;
  setBoardHoverClass();
  cells.forEach((cell) => {
    cell.classList.remove(circleClass);
    cell.classList.remove(xClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningBanner.classList.remove("show");
}

function handleClick(e) {
  //condition ? exprIfTrue : exprIfFalse
  let turn = circleTurn ? circleClass : xClass;
  cell = e.target;

  //placeMark
  placeMark(cell, turn);

  //check for win or draw
  if (checkForWin(turn)) {
    console.log("win");
    endGame(false, turn);
  } else {
    if (checkForDraw()) {
      endGame(true);
    }
  }
  //switch turns
  switchTurns();
  setBoardHoverClass();
}
function placeMark(cell, turn) {
  cell.classList.add(turn);
}

function checkForWin(currentClass) {
  return winnningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function checkForDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}

function switchTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  circleTurn ? board.classList.add(circleClass) : board.classList.add(xClass);
}

function endGame(draw, turn) {
  if (draw) {
    winningText.innerText = "Draw!";
  } else {
    let winner;
    if (turn == "circle") {
      winner = circlePlayer;
    } else {
      winner = xPlayer;
    }
    winningText.innerText = `${winner} wins!`;
  }
  winningBanner.classList.remove("no-display");
  winningBanner.classList.add("show");
}

startGame();
