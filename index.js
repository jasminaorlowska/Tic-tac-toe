const board = document.getElementById("board");
const X_Class = "x";
const Circle_Class = "circle";
const cells = document.querySelectorAll("[data-cell]");
let circleTurn;
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
const restartBtn = document.getElementById("restart-button");
function startGame() {
  circleTurn = true;
  setBoardHoverClass();
  cells.forEach((cell) => {
    cell.classList.remove(Circle_Class);
    cell.classList.remove(X_Class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningBanner.classList.remove("show");
}

startGame();

function handleClick(e) {
  //condition ? exprIfTrue : exprIfFalse
  let turn = circleTurn ? Circle_Class : X_Class;
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
      cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    );
  });
}
function switchTurns() {
  //   console.log(circleTurn);
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_Class);
  board.classList.remove(Circle_Class);
  circleTurn ? board.classList.add(Circle_Class) : board.classList.add(X_Class);
}
function endGame(draw, turn) {
  if (draw) {
    winningText.innerText = "Draw!";
  } else {
    winningText.innerText = `${turn} wins!`;
  }
  winningBanner.classList.add("show");
}

restartBtn.addEventListener("click", startGame);
