let instructions;
let start;
let undo;
let cell = new Array(3);
let cur;
let s;
let counter;
let toggleClick = false;
let toggleStarted = false;
let toggleReset = true;
let moveList = new Array(9);

function handleLoad () {
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
        toggleClick = false;
        for (let i = 0; i <= 2; i++) {
          for (let j = 0; j <= 2; j++) {
            if (cell[i][j].textContent === "") {
              cell[i][j].classList.remove("movable");
            }
          }
        }
        instructions.textContent =
        `${s} won! Click "Reset" to start a new game or click "Undo" to go back!`;
        return;
      }
    }
    if (counter === 9) {
      toggleClick = false;
      instructions.textContent =
      `It's a draw! Click "Reset" to start a new game or click "Undo" to go back!`;
      return;
    }        
  }  
  function onClick (i,j) {
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
    cell[i][j].classList.remove("movable");
    instructions.textContent = opp + "'s turn!";
    moveList[counter] = [i,j];
    counter++;
    if (counter >= 5) {
      checkWin();
    }
    s = opp;
  }
  
  function startUp () {
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        cell[i][j].textContent = "";
        cell[i][j].classList.add("movable");
      }
    }
    counter = 0;
    toggleStarted = true;
    toggleClick = true;
    toggleReset = false;
    undo.classList.add("clickable");
    start.textContent = "Reset";
    instructions.textContent = s + "'s turn!";
  }

  function reset () {
    toggleStarted = false;
    toggleClick = false;
    toggleReset = true;
    s = "X";
    undo.classList.remove("clickable");
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        cell[i][j].textContent = "";
        cell[i][j].classList.remove("movable", "clicked");
      }
    }
    start.textContent = "Start"
    instructions.textContent = 'Click "Start" to start a game!'
  }

  function doUndo () {
    if (counter === 0) {
      return;
    } else {
      if (s === "X") {
        s = "O";
      } else {
        s = "X";
      }
      counter--;
      toggleClick = true;
      let tmp = moveList[counter];
      let i = tmp[0];
      let j = tmp[1];    
      cell[i][j].textContent = "";
      cell[i][j].classList.remove("clicked");
      cell[i][j].classList.add("movable");
      instructions.textContent = s + "'s turn!";
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          if (cell[i][j].textContent === "") {
            cell[i][j].classList.add("movable");
          }
        }
      }
    }
  }


  s = "X";
  const handleStart = () => {if (toggleReset) {startUp();}
                              else {reset();}}
  const handleClick = (i,j) => {if (toggleClick) {onClick(i,j);}
                              else {return;}}
  const handleUndo = () => {
    if (toggleStarted) {doUndo();} else {return;}
  }
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
  undo = document.getElementById('undo');
  undo.addEventListener('click', () => handleUndo());
}
window.addEventListener('load', handleLoad);