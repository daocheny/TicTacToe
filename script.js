let instructions;
let start;
let cell = new Array(3);
let cur;
let s;
let counter;

function handleLoad () {
  function startUp () {
    function onClick (i,j) {
      function checkWin () {
        let win = new Array(8);
        for (let i = 0; i <= 2; i++) {
          win[i] = [cell[i][0].textContent,
          cell[i][1].textContent, cell[i][2].textContent];
          win[i+3] = [cell[0][i].textContent,
          cell[1][i].textContent, cell[2][i].textContent];
        }
        win[6] = [cell[0][0].textContent,
        cell[1][1].textContent, cell[2][2].textContent];
        win[7] = [cell[2][0].textContent,
        cell[1][1].textContent, cell[0][2].textContent];
        let winning = false;
        for (let i = 0; i <= 7; i++) {
          winning = true;
          for (let j = 0; j <= 2; j++) {
            if (win[i][j] !== s) {
              winning = false;
              break;
            }
          }
          if (winning) {
            handleClick = (i,j) => null;
            for (let i = 0; i <= 2; i++) {
              for (let j = 0; j <= 2; j++) {
                if (cell[i][j].textContent === "") {
                  cell[i][j].classList.remove("movable");
                }
              }
            }
            instructions.textContent =
            `${s} won! Click "Reset" to start a new game!`;
            return;
          }
        }
        if (counter === 9) {
            handleClick = (i,j) => null;
            instructions.textContent = "It's a draw!";
            return;
        }        
      }
      if (cell[i][j].textContent !== "") {
        return;
      }
      let opp;
      if (s === "X") {
        opp = "O";
      } else {
        opp = "X";
      }
      cell[i][j].textContent = s;
      cell[i][j].classList.add("clicked");
      instructions.textContent = opp + "'s turn!";
      counter++;
      if (counter >= 5) {
        checkWin();
      }
      s = opp;
    }
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        cell[i][j].textContent = "";
        cell[i][j].classList.add("movable");
      }
    }
    counter = 0;
    handleStart = reset;
    handleClick = (i,j) => onClick(i,j);
    start.textContent = "Reset";
    instructions.textContent = s + "'s turn!";
  }

  function reset () {
    handleStart = startUp;
    handleClick = (i,j) => null;
    s = "X";
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        cell[i][j].textContent = "";
        cell[i][j].classList.remove("movable", "clicked");
      }
    }
    start.textContent = "Start"
    instructions.textContent = 'Click "Start" to start a game!'
  }
  s = "X";
  let handleStart = startUp;
  let handleClick = (i,j) => null;
  for (let i = 0; i <= 2; i++) {
    cell[i] = new Array(3);
    for (let j = 0; j <= 2; j++) {
      cell[i][j] = document.getElementById("["+i+","+j+"]");
      cell[i][j].addEventListener('click', () => handleClick(i,j));
    }
  }
  instructions = document.getElementById('instructions');
  start = document.getElementById('start');
  start.addEventListener('click', () => handleStart());
}
window.addEventListener('load', handleLoad);