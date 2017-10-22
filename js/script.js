const board = document.getElementById("board");
let boxes = document.getElementsByClassName("box");
let activePlayerNumber = 0;
let = activePlayerDiv = "";

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
};

function startGame(){
  hideStartScreen();
  showBoard();
  setActivePlayerNumber();
};

function boxEvents(){

  boxes = document.getElementsByClassName("box");

  for (let i = 0; i < boxes.length; i++){

    if (!boxes[i].classList.contains("box-filled-1") || !boxes[i].classList.contains("box-filled-2")){
      boxes[i].addEventListener("mouseover", function(event) {
        toggleBoxBackground(event.target);
      });

      boxes[i].addEventListener("mouseout", function(event) {
        toggleBoxBackground(event.target);
      });

      boxes[i].addEventListener("click", function clickableBox(event) {
        const box = event.target;
        box.classList.add("box-filled-" + activePlayerNumber);
        setActivePlayerNumber();
        box.removeEventListener("click", clickableBox);
        box.setAttribute("style", "cursor: auto");
      });
    };
  };
};

function toggleBoxBackground(box){

  if(activePlayerNumber === 1 && !box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
    box.classList.toggle("box-1");
  };

  if (activePlayerNumber === 2 && !box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
    box.classList.toggle("box-2");
  };

};

//If these boxes have the same value we have a winner
  //Horizontal
    //1, 2, 3
    //4, 5, 6
    //7, 8, 9
  //Vertical
    //1, 4, 7
    //2, 5, 8
    //3, 6, 9
  //Diagonal
    //1, 5, 9
    //3, 5, 7
//If there isn't a winner it's a draw

function runProgram(){
  hideBoard();
  showStartScreen();
  boxEvents();
};

runProgram();
