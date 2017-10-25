const board = document.getElementById("board");
// let boxes = document.getElementsByClassName("box");
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

  const boxes = document.getElementsByClassName("box");

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
        resultTracking();
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

function resultTracking (){
  let winner = "";
  const playerO = "box-filled-1";
  const playerX = "box-filled-2";
  const box1 = document.getElementById("box1");
  const box2 = document.getElementById("box2");
  const box3 = document.getElementById("box3");
  const box4 = document.getElementById("box4");
  const box5 = document.getElementById("box5");
  const box6 = document.getElementById("box6");
  const box7 = document.getElementById("box7");
  const box8 = document.getElementById("box8");
  const box9 = document.getElementById("box9");

  if (box1.classList.contains(playerO) && box2.classList.contains(playerO) && box3.classList.contains(playerO)
    || box4.classList.contains(playerO) && box5.classList.contains(playerO) && box6.classList.contains(playerO)
    || box7.classList.contains(playerO) && box8.classList.contains(playerO) && box9.classList.contains(playerO)
    || box1.classList.contains(playerO) && box4.classList.contains(playerO) && box7.classList.contains(playerO)
    || box2.classList.contains(playerO) && box5.classList.contains(playerO) && box8.classList.contains(playerO)
    || box3.classList.contains(playerO) && box6.classList.contains(playerO) && box9.classList.contains(playerO)
    || box1.classList.contains(playerO) && box5.classList.contains(playerO) && box9.classList.contains(playerO)
    || box3.classList.contains(playerO) && box5.classList.contains(playerO) && box7.classList.contains(playerO)){
        console.log("O won!");
        winner = "O";
  } else if (box1.classList.contains(playerX) && box2.classList.contains(playerX) && box3.classList.contains(playerX)
    || box4.classList.contains(playerX) && box5.classList.contains(playerX) && box6.classList.contains(playerX)
    || box7.classList.contains(playerX) && box8.classList.contains(playerX) && box9.classList.contains(playerX)
    || box1.classList.contains(playerX) && box4.classList.contains(playerX) && box7.classList.contains(playerX)
    || box2.classList.contains(playerX) && box5.classList.contains(playerX) && box8.classList.contains(playerX)
    || box3.classList.contains(playerX) && box6.classList.contains(playerX) && box9.classList.contains(playerX)
    || box1.classList.contains(playerX) && box5.classList.contains(playerX) && box9.classList.contains(playerX)
    || box3.classList.contains(playerX) && box5.classList.contains(playerX) && box7.classList.contains(playerX)){
        console.log("X won!");
  };
  //If three boxes in a row have the same value, then we have a winner
    //Horizontal rows
      //1, 2, 3
      //4, 5, 6
      //7, 8, 9
    //Vertical rows
      //1, 4, 7
      //2, 5, 8
      //3, 6, 9
    //Diagonal rows
      //1, 5, 9
      //3, 5, 7
  //If there isn't a winner it's a draw

};

function runProgram(){
  hideBoard();
  showStartScreen();
  boxEvents();
};

runProgram();
