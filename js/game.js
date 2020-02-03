const container = document.querySelector('#container');
const playArea = document.querySelector('#playArea');
const startBtn = document.querySelector('#start');
const finishBtn = document.querySelector('#finish');
const timerDisplay = document.querySelector('#timer');

// playArea.innerHTML = `
// `;

// Walls
let walls;

function findWalls() {
  walls = container.querySelectorAll('.wall');
}

function activateWalls() {
  walls.forEach(wall => {
    wall.addEventListener('mouseover', touchWall);
  });
  function touchWall() {
    stopTimer();
    stopRotate();
    // Deactivate walls
    walls.forEach(wall => {
      wall.removeEventListener('mouseover', touchWall);
    });
  }
}

// Game
startBtn.addEventListener('click', startGame);
finishBtn.addEventListener('click', stopTimer);

function startGame(e) {
  e.preventDefault();
  findWalls();
  resetTimer();
  timer();
  activateWalls();
  findTiles();
  resetTileRotation();
  rotateTimer();
}

// Rotate
let tiles;

function findTiles() {
  tiles = playArea.querySelectorAll('.tile');
}

function rotate() {
  tiles.forEach(tile => {
    // if (tile.classList != 'rotate1') {
    //   console.log('adding rotate1');
    //   tile.classList.add('rotate1');
    // } else if (tile.classList !== 'rotate2') {
    //   console.log('adding rotate2');
    //   tile.classList.add('rotate2');
    // }

    // MAYBE USE A SWITCH STATEMENT?
    switch (tile.classList.remove) {
      case 'rotate3':
        resetTileRotation();
        tile.classList.add('rotate0');
        rotateTimer();
        break;
      case 'rotate2':
        tile.classList.add('rotate3');
        rotateTimer();
        break;
      case 'rotate1':
        tile.classList.add('rotate2');
        rotateTimer();
        break;
      case 'rotate0':
        tile.classList.add('rotate1');
        rotateTimer();
    }
  });
  console.log('rotate');
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
    tile.classList.remove('rotate1', 'rotate2', 'rotate3');
  });
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
    (min ? (min > 9 ? min : '0' + min) : '00') +
    ':' +
    (sec ? (sec > 9 ? sec : '0' + sec) : '00') +
    ':' +
    (milSec > 9 ? milSec : '0' + milSec);
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
