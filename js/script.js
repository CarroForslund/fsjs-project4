const board = document.getElementById("board")

function hideBoard(){
  board.setAttribute("style", "display: none");
};

// Show Start Screen
function showStartScreen(){
  const body = document.body;
  const div = document.createElement("div");
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const a = document.createElement("a");

  div.id = "start";
  div.className = "screen screen-start";
  body.appendChild(div);

  div.appendChild(header);

  h1.textContent = "Tic Tac Toe";
  header.appendChild(h1);

  a.href = "#";
  a.className = "button";
  a.text= "Start game";
  a.onclick = function(){
    startGame();
  };
  header.appendChild(a);
};

function hideStartScreen(){
  const startScreen = document.getElementById("start");
  startScreen.setAttribute("style", "display: none");
};

function showBoard(){
  board.setAttribute("style", "display: block");
};

function getRandomPlayer(){
  const randomNumber = Math.floor(Math.random() * 2 + 1);
  const randomPlayer = "player" + String(randomNumber);
  return randomPlayer;
};

function startGame(){
  hideStartScreen();
  showBoard();
  const startingPlayer = document.getElementById(getRandomPlayer());
  startingPlayer.setAttribute("class", "players active");
};

function runProgram(){
  hideBoard();
  showStartScreen();
};

runProgram();
