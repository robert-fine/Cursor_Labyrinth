const container = document.querySelector("#container");
const playArea = document.querySelector("#playArea");
const startBtn = document.querySelector("#start");
const finishBtn = document.querySelector("#finish");
const timerDisplay = document.querySelector("#timer");
let tiles = document.querySelectorAll(".tile");
let paths = document.querySelectorAll(".path");
const messageContainer = container.querySelector("#message");
const messageText = messageContainer.querySelector("#messageContent");
const close = messageContainer.querySelector("#close");
const spotlight = document.querySelector("#spotlight");

// Message Box
function displayMsgBox() {
  messageContainer.setAttribute("style", "display: block");
  startBtn.disabled = true;
}

function closeMsgBox(e) {
  e.preventDefault();
  messageContainer.setAttribute("style", "display: none");

  // enable start button
  startBtn.disabled = false;
}

close.addEventListener("click", closeMsgBox);
messageContainer.addEventListener("blur", closeMsgBox);

function gameOverMsg() {
  messageText.innerHTML = `
    <h2>Game Over</h2>
    <p>Try again!</p>
  `;
  displayMsgBox();
}

function winMsg() {
  messageText.innerHTML = `
    <h2>You win!</h2>
    <p>It took you ${(min ? (min > 9 ? min : "0" + min) : "00") +
      "m : " +
      (sec ? (sec > 9 ? sec : "0" + sec) : "00") +
      "s : " +
      (milSec > 9 ? milSec : "0" + milSec)}ms to finish</p>
  `;
  displayMsgBox();
}

// Walls
let walls;

// find function in case multiple levels are made in individual js files
function findWalls() {
  walls = container.querySelectorAll(".wall");
}

function activateWalls() {
  walls.forEach(wall => {
    wall.setAttribute("style", "background: var(--wall-color)");
    wall.addEventListener("mouseover", touchWall);
  });
}

// ends current game if wall is touched after game starts
function touchWall() {
  stopTimer();
  stopRotate();
  // Deactivate walls & change color
  walls.forEach(wall => {
    wall.setAttribute("style", "background: var(--fail)");
  });
  deactivateWalls();
  gameOverMsg();
  window.removeEventListener("blur", touchWall);
  window.removeEventListener("resize", touchWall);
}

function deactivateWalls() {
  walls.forEach(wall => {
    wall.removeEventListener("mouseover", touchWall);
  });
}

// spotlight
// function lightsOut(e) {
//   const { offsetX: x, offsetY: y } = e;
// }

// Game
startBtn.addEventListener("click", startGame);
finishBtn.addEventListener("click", finishGame);

function startGame(e) {
  e.preventDefault();
  findWalls();
  resetTimer();
  timer();
  activateWalls();
  // findTiles();
  resetTileRotation();
  rotateTimer1();
  rotateTimer2();
  rotateTimer3();
  window.addEventListener("resize", touchWall);
}

function finishGame(e) {
  e.preventDefault();
  winMsg();
  stopTimer();
  stopRotate();
  deactivateWalls();
  window.removeEventListener("blur", touchWall);
  window.removeEventListener("resize", touchWall);
}

window.addEventListener("blur", touchWall);

tiles.forEach(tile => {
  tile.onmouseenter = function(e) {
    e.target.classList.add("mouseIsOver");
  };
  tile.onmouseleave = function(e) {
    e.target.classList.remove("mouseIsOver");
  };
});

function findTiles() {
  tiles = playArea.querySelectorAll(".tile");
}
// Tile Rotation
let left1Deg = 0;
let left2Deg = 0;
let left3Deg = 0;
let right1Deg = 0;
let right2Deg = 0;
let right3Deg = 0;

function rotate1() {
  left1Deg -= 90;
  right1Deg += 90;
  tiles.forEach(tile => {
    deactivateWalls();
    setTimeout(activateWalls, 250);
    if (
      !tile.classList.contains("mouseIsOver") &&
      tile.classList.contains("rotateLeft1")
    ) {
      tile.setAttribute("style", `transform: rotate(${left1Deg}deg)`);
    } else if (
      !tile.classList.contains("mouseIsOver") &&
      tile.classList.contains("rotateRight1")
    ) {
      tile.setAttribute("style", `transform: rotate(${right1Deg}deg)`);
    }
  });
  rotateTimer1();
}
function rotate2() {
  left2Deg -= 90;
  right2Deg += 90;
  tiles.forEach(tile => {
    if (
      !tile.classList.contains("mouseIsOver") &&
      tile.classList.contains("rotateLeft2")
    ) {
      tile.setAttribute("style", `transform: rotate(${left2Deg}deg)`);
    } else if (
      !tile.classList.contains("mouseIsOver") &&
      tile.classList.contains("rotateRight2")
    ) {
      tile.setAttribute("style", `transform: rotate(${right2Deg}deg)`);
    }
  });
  rotateTimer2();
}
function rotate3() {
  left3Deg -= 90;
  right3Deg += 90;
  tiles.forEach(tile => {
    if (
      !tile.classList.contains("mouseIsOver") &&
      tile.classList.contains("rotateLeft3")
    ) {
      tile.setAttribute("style", `transform: rotate(${left3Deg}deg)`);
    } else if (
      !tile.classList.contains("mouseIsOver") &&
      tile.classList.contains("rotateRight3")
    ) {
      tile.setAttribute("style", `transform: rotate(${right3Deg}deg)`);
    }
  });
  rotateTimer3();
}

function rotateTimer1() {
  r1 = setTimeout(rotate1, 1888);
}
function rotateTimer2() {
  r2 = setTimeout(rotate2, 2777);
}
function rotateTimer3() {
  r3 = setTimeout(rotate3, 3444);
}

function stopRotate() {
  clearTimeout(r1);
  clearTimeout(r2);
  clearTimeout(r3);
}

function resetTileRotation() {
  tiles.forEach(tile => {
    deactivateWalls();
    setTimeout(activateWalls, 250);
    tile.setAttribute("style", "transform: rotate(0deg)");
  });
  left1Deg = 0;
  left2Deg = 0;
  left3Deg = 0;
  right1Deg = 0;
  right2Deg = 0;
  right3Deg = 0;
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
