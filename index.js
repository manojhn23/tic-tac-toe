const cells = document.querySelectorAll(".col");
const currentPlayer = document.getElementById("player");
const restart = document.getElementById("restart");

let player = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let active = true;

function mark(e) {
  const cell = e.currentTarget;
  index = Array.from(cells).indexOf(cell);
  if (board[index] === "" && active) {
    if (player === "X") {
      cell.textContent = "X";
      cell.style.backgroundColor = "yellow";
      currentPlayer.textContent = "Player O turns";
    } else {
      cell.textContent = "O";
      cell.style.backgroundColor = "orange";
      currentPlayer.textContent = "Player X turns";
    }
    board[index] = player;
    player = player === "X" ? "O" : "X";
    checkWin();
    checkDraw();
  }
}

function checkWin() {
  for (let combo of win) {
    const [a, b, c] = combo;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      active = false;
      player = player === "O" ? "X" : "O";
      currentPlayer.textContent = "Player " + player + " Wins";
    }
  }
}

function checkDraw() {
  if (!board.includes("") && active) {
    active = false;
    currentPlayer.textContent = "It's Draw";
  }
}

function restartGame() {
  player = "X";
  currentPlayer.textContent = "Player X turns";
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.style.backgroundColor = "rgb(161, 161, 161)"));
  cells.forEach((cell) => (cell.textContent = ""));
  location.reload();
}

cells.forEach((cell) => cell.addEventListener("click", mark));
restart.addEventListener("click", restartGame);
