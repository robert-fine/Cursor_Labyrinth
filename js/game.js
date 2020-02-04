const container = document.querySelector("#container");
const playArea = document.querySelector("#playArea");
const startBtn = document.querySelector("#start");
const finishBtn = document.querySelector("#finish");
const timerDisplay = document.querySelector("#timer");
let tiles = document.querySelectorAll(".tile");
let paths = document.querySelectorAll(".path");

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
    stopRotate();
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
  // findTiles();
  resetTileRotation();
  rotateTimer();
}

tiles.forEach(tile => {
  tile.onmouseenter = function(e) {
    e.target.classList.add("mouseIsOver");
  };
  tile.onmouseleave = function(e) {
    e.target.classList.remove("mouseIsOver");
  };

  // tile.addEventListener("mouseover", console.log("mouseisover"));
  // tile.addEventListener("mouseout", removeMouseIsOver);

  // function mouseIsOver() {
  //   tile.classList.add("mouseIsOver");
  // }

  // function removeMouseIsOver() {
  //   tile.classList.remove("mouseIsOver");
  // }
});

// Paths
// paths.forEach(path => {

// })

// Tiles

function findTiles() {
  tiles = playArea.querySelectorAll(".tile");
}
// Tile Rotation
let deg = 0;
function rotate() {
  deg += 90;
  tiles.forEach(tile => {
    if (!tile.classList.contains("mouseIsOver")) {
      tile.setAttribute("style", `transform: rotate(${deg}deg)`);
    }
  });
  console.log("rotate");
  rotateTimer();
}

function rotateTimer() {
  rt = setTimeout(rotate, 5000);
}

function stopRotate() {
  clearTimeout(rt);
}

function resetTileRotation() {
  tiles.forEach(tile => {
    tile.setAttribute("style", "transform: rotate(0deg)");
  });
  deg = 0;
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

// add rotate1 (90deg), rotate2 (180deg), rotate3 (270deg) then erase for rotate4 and start over (use if statements)
