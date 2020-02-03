const container = document.querySelector("#container");
const playArea = document.querySelector("#playArea");
const startBtn = document.querySelector("#start");
const finishBtn = document.querySelector("#finish");
const timerDisplay = document.querySelector("#timer");

// playArea.innerHTML = `
// `;

// Walls
let walls;

function findWalls() {
  walls = container.querySelectorAll(".wall");
}

function activateWalls() {
  walls.forEach(wall => {
    wall.addEventListener("mouseover", touchWall);
  });
  function touchWall() {
    stopTimer();
    // Deactivate walls
    walls.forEach(wall => {
      wall.removeEventListener("mouseover", touchWall);
    });
  }
}

// Game
startBtn.addEventListener("click", startGame);
finishBtn.addEventListener("click", stopTimer);

function startGame(e) {
  e.preventDefault();
  findWalls();
  resetTimer();
  timer();
  activateWalls();
  findTiles();
}

// Rotate
let tiles;

function findTiles() {
  tiles = playArea.querySelectorAll(".tile");
}

function rotateLeft() {
  tiles.forEach(tile => {
    tile.classList.add("rotateActivate");
    // tile.classList.remove('rotateActivate')
  });
  console.log("rotate");
}

function rotate() {
  setTimeout(rotateLeft, 5000);
}

// timer function
let min = 00;
let sec = 00;
let milSec = 00;

function add() {
  milSec += 5;
  if (milSec >= 100) {
    milSec = 0;
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
  }
  timer();
}
function timer() {
  t = setTimeout(add, 50);
  timerDisplay.innerHTML =
    (min ? (min > 9 ? min : "0" + min) : "00") +
    ":" +
    (sec ? (sec > 9 ? sec : "0" + sec) : "00") +
    ":" +
    (milSec > 9 ? milSec : "0" + milSec);
}

function stopTimer() {
  clearTimeout(t);
}

function resetTimer() {
  min = 0;
  sec = 0;
  milSec = 0;
}
