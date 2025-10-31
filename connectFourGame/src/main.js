const player1 = "red";
const player2 = "yellow";
const rows = 6;
const cols = 7;
let interval;

let board = Array.from({ length: rows }, () => Array(cols).fill(null));

function turn(player, column, slot) {
  let logicProtector = document.querySelector("#logic-protector");
  logicProtector.style.display = "block";
  document.querySelector(player === player1 ? ".score1" : ".score2").dataset
    .value++;
  board[slot][column] = player;
  let winArr = checkWin(slot, column);
  if (winArr) {
    for (const [row, col] of winArr) {
      let spot = document.querySelector(
        `[data-column="${col + 1}"] [data-row="${row + 1}"]`
      );
      spot.classList.add("slot--win");
    }
    document.body.dataset.state = "win";
    clearInterval(interval);
    clearEvents();
    setTimeout(() => {
      reset();
    }, 2000);
    return;
  }
  document.body.dataset.player = player === player1 ? "2" : "1";
  document.querySelector(".timer").dataset.value = "26";
  clearInterval(interval);
  startTimer();
  setTimeout(() => {
    logicProtector.style.display = "none";
  }, 100);
}

function checkWin(row, col) {
  const player = board[row][col];

  if (!player) return false;

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [currentRow, currentCol] of directions) {
    const line = [[row, col]];
    line.push(...countInDirection(row, col, currentRow, currentCol, player));
    line.push(...countInDirection(row, col, -currentRow, -currentCol, player));
    if (line.length >= 4) return line;
  }
  return false;
}

function countInDirection(row, col, directionRow, directionCol, player) {
  let collection = [];
  let currentRow = row + directionRow;
  let currentCol = col + directionCol;

  while (
    currentRow >= 0 &&
    currentRow < rows &&
    currentCol >= 0 &&
    currentCol < cols &&
    board[currentRow][currentCol] === player
  ) {
    collection.push([currentRow, currentCol]);
    currentRow += directionRow;
    currentCol += directionCol;
  }
  return collection;
}

function findFirstEmptySpotInColumn(col) {
  for (let i = board.length - 1; i >= 0; i--) {
    if (!board[i][col]) return i;
  }
  return -1;
}

function reset() {
  document.body.dataset.player = "1";
  document.querySelector(".timer").dataset.value = "26";
  board = Array.from({ length: rows }, () => Array(cols).fill(null));
  clearBoard();
}

function clearBoard() {
  const columns = document.querySelectorAll(".column");
  columns.forEach((col) => {
    col.classList.remove("column--selected");
  });
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot) => {
    slot.classList.remove("slot--p1");
    slot.classList.remove("slot--p2");
    slot.classList.remove("slot--win");
  });
  document.querySelector(".score1").dataset.value = 0;
  document.querySelector(".score2").dataset.value = 0;
}

function clearEvents() {
  const columns = document.querySelectorAll(".column");
  const slots = document.querySelectorAll(".slot");

  columns.forEach((col) => {
    col.removeEventListener("mouseover", handleMouseOver);
    col.removeEventListener("mouseout", handleMouseOut);
  });

  slots.forEach((slot) => {
    slot.removeEventListener("click", handleSlotClick);
  });
}

function startTimer() {
  interval = setInterval(() => {
    document.querySelector(".timer").dataset.value--;
    if (document.querySelector(".timer").dataset.value === "0") {
      clearInterval(interval);
      document.body.dataset.player =
        document.body.dataset.player === "1" ? "2" : "1";
      document.querySelector(".timer").dataset.value = "26";
      startTimer();
    }
  }, 1000);
}

function handleMouseOver(e) {
  e.currentTarget.classList.add("column--selected");
}

function handleMouseOut(e) {
  e.currentTarget.classList.remove("column--selected");
}

function handleSlotClick(e) {
  const slot = e.currentTarget;
  let col = +slot.parentElement.dataset.column - 1;
  let emptySpot = findFirstEmptySpotInColumn(col);
  if (emptySpot === -1) return;

  let currentPlayer = document.body.dataset.player;
  turn(currentPlayer === "1" ? player1 : player2, col, emptySpot);
  document
    .querySelector(`[data-column="${col + 1}"] [data-row="${emptySpot + 1}"]`)
    .classList.add(`slot--p${currentPlayer}`);
}

function initLogicProtector() {
  const logicProtector = document.createElement("div");
  logicProtector.id = "logic-protector";
  logicProtector.style.display = "none";
  logicProtector.style.width = "100vw";
  logicProtector.style.height = "100vh";
  logicProtector.style.position = "absolute";
  logicProtector.style.top = "0";
  logicProtector.style.left = "0";
  logicProtector.style.zIndex = "10";
  document.body.insertAdjacentElement("afterbegin", logicProtector);
}

function startGame() {
  const columns = document.querySelectorAll(".column");
  const slots = document.querySelectorAll(".slot");

  columns.forEach((col) => {
    col.addEventListener("mouseover", handleMouseOver);
    col.addEventListener("mouseout", handleMouseOut);
  });

  slots.forEach((slot) => {
    slot.addEventListener("click", handleSlotClick);
  });
}

function restart() {
  document.body.dataset.state = "playing";
  clearInterval(interval);
  reset();
  startGame();
  startTimer();
}

initLogicProtector();

let startBtn = document.querySelector("#play");
startBtn.addEventListener("click", () => {
  document.body.dataset.state = "playing";
  document.body.dataset.player = "1";
  startGame();
  startTimer();
});

let restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", restart);

let menuBtn = document.querySelector("#menu");
menuBtn.addEventListener("click", () => {
  window.location.href =
    "https://badr-eddine-slaoui.github.io/YouCodeFirstYearSprintTwoBriefOne/";
});
