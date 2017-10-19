const board = document.getElementById("board");
let boxes = document.getElementsByClassName("box");
let activePlayerNumber = 0;
let = activePlayerDiv = "";
// const boxes = document.getElementsByClassName("boxes");

function hideBoard(){
  board.setAttribute("style", "display: none");
};

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
  // const div = document.createElement("div");
  // const header = document.createElement("header");
  // const h1 = document.createElement("h1");
  // div.id = "board";
  // div.className = "board";
  //
  // h1.textContent = "Tic Tac Toe";
  // body.appendChild(div);
  // div.appendChild(header);
  // header.appendChild(h1);
};

function getRandomPlayer(){
  const randomNumber = Math.floor(Math.random() * 2 + 1);
  return randomNumber;
};

function setActivePlayerNumber(){

  if(activePlayerNumber === 0){
    activePlayerNumber = getRandomPlayer();
    activePlayerDiv = document.getElementById("player" + String(activePlayerNumber));
    activePlayerDiv.classList.add("active");

  } else if(activePlayerNumber === 1){
    activePlayerDiv.classList.toggle("active");
    activePlayerNumber = 2;
    activePlayerDiv = document.getElementById("player" + String(activePlayerNumber));
    activePlayerDiv.classList.toggle("active");

  } else {
    activePlayerDiv.classList.toggle("active");
    activePlayerNumber = 1;
    activePlayerDiv = document.getElementById("player" + String(activePlayerNumber));

    activePlayerDiv.classList.toggle("active");
  };

  console.log(activePlayerNumber);
};

// function displayedActivePlayer(){
//   activePlayerDiv = document.getElementById("player" + String(activePlayerNumber));
//   activePlayerDiv.classList.add("active");
// };

function startGame(){
  hideStartScreen();
  showBoard();
  setActivePlayerNumber();
};

function boxHover(){

  boxes = document.getElementsByClassName("box");

  for (let i = 0; i < boxes.length; i++){

    if (!boxes[i].classList.contains("box-filled-1") || !boxes[i].classList.contains("box-filled-2")){
      boxes[i].addEventListener("mouseover", function(event) {
        toggleBoxBackground(event.target);
      });

      boxes[i].addEventListener("mouseout", function(event) {
        toggleBoxBackground(event.target);
      });
    };
  };
};

function boxClick(){

  boxes = document.getElementsByClassName("box");

  for (let i = 0; i < boxes.length; i++){

    if (!boxes[i].classList.contains("box-filled-1") || !boxes[i].classList.contains("box-filled-2")){
      boxes[i].addEventListener("click", function(event) {
        playerMove(event.target);
      });
    };
    // boxes[i].addEventListener("click", function(event) {
    //   if(activePlayer === 1 && !event.target.classList.contains("box-filled-1") || !event.target.classList.contains("box-filled-2")){
    //     event.target.classList.add("box-filled-1");
    //     activePLayer = 2;
    //   } else if (activePlayer === 2 && event.target.classList.contains("box-2") || !event.target.classList.contains("box-filled-2")) {
    //     event.target.classList.add("box-filled-2");
    //     activePLayer = 1;
    //   };
    // });

  };
};

function toggleBoxBackground(box){
  if(activePlayerNumber === 1 && !box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
    box.classList.toggle("box-1");
  }
  if (activePlayerNumber === 2 && !box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
    box.classList.toggle("box-2");
  };
};

function playerMove(box){
  addBoxClassName(box);
  setActivePlayerNumber();
  // boxHover();
  // boxClick();
};

function addBoxClassName(box){
  box.classList.add("box-filled-" + activePlayerNumber);
};

function runProgram(){
  hideBoard();
  showStartScreen();
  boxHover();
  boxClick();
};

runProgram();
