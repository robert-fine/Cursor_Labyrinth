const container = document.querySelector("#container");
const playArea = document.querySelector("#playArea");
const startBtn = document.querySelector("#start");
const finishBtn = document.querySelector("#finish");
const timerDisplay = document.querySelector("#timer");

playArea.innerHTML = `
<div class='tile'>
<div class='wall square'>

</div>
</div>
`;

let walls;

function findWalls() {
  walls = container.querySelectorAll(".wall");
}

startBtn.addEventListener("click", startGame);

function startGame(e) {
  e.preventDefault();
  findWalls();
  timer();
  walls.forEach(wall => {
    wall.addEventListener("mouseover", touchWall);
  });

  function touchWall(e) {
    console.log("You touched a wall");
  }
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

finishBtn.addEventListener("click", stopTimer);

// `
// ${min}:${sec}:${milSec}
// `;
