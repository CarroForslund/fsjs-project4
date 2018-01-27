/*jshint esversion: 6 */
!function(){

  let activePlayer = 0;
  let occupiedBoxes = 0;
  let playerName;

  // DISPLAY SCREEN OVERLAY DIV
  //gameState = new/one/two/tie
  function displayScreenOverlay(gameState){
    //Variables
    const body = document.body;
    const screenOverlay = document.createElement('div');
    const screenHeader = document.createElement('header');
    const screenH1 = document.createElement('h1');
    const screenButton = document.createElement('a');
    const message = document.createElement('p');

    //Screen (Overlay Div)
    if (gameState === 'new'){
      screenOverlay.id = 'start';
    }
    else {
      screenOverlay.id = 'finish';
    }
    screenOverlay.className = 'screen';
    body.appendChild(screenOverlay);

    //Add class to screen overlay depending of game is starting or ended
    if (gameState !== 'new'){
      screenOverlay.classList.add('screen-win');

      message.className = 'message';

      if (gameState === 'one'){
        screenOverlay.classList.add('screen-win-one');
        message.textContent = `${playerName}, you are a winner!`;
      }
      else if (gameState === 'two') {
        screenOverlay.classList.add('screen-win-two');
        message.textContent = 'Winner!';
      }
      else {
        screenOverlay.classList.add('screen-win-tie');
        message.textContent = 'It\'s a draw!';
      }
    }
    else {
      screenOverlay.classList.add('screen-start');
    }

    //Screen header
    screenOverlay.appendChild(screenHeader);

    //Screen-start h1
    screenH1.textContent = 'Tic Tac Toe';
    screenHeader.appendChild(screenH1);

    //Message
    screenHeader.appendChild(message);

    //Player Name
    const playerOptions = document.createElement('div');
    const inputField = document.createElement('input');
    inputField.placeholder = 'Your Name';
    playerOptions.className = 'player-options';
    playerOptions.appendChild(inputField);
    screenHeader.appendChild(playerOptions);

    //Button to start/restart game by reloading page
    screenButton.href='#';
    screenButton.className = 'button';

    //Button text
    if (gameState === 'new'){
      screenButton.text= 'Start game';
    }
    else {
      screenButton.text= 'New game';
    }

    //Start/reset game button functionality
    screenButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (inputField.value) {
        playerName = inputField.value;
        const playerNameDiv = document.getElementById('player-name');
        playerNameDiv.textContent = playerName;
        screenOverlay.remove();
        if (gameState === 'new'){
          newGame();
        }
        else {
          resetGame();
        }

      }
      else {
        alert('Please enter your name');
      }
    });

    //Display button
    screenHeader.appendChild(screenButton);
  }

  //RETURN A RANDOM NUMBER TO SET PLAYER TO START
  function getRandomNumber(amountOfNumbers){
    const randomNumber = Math.floor(Math.random() * amountOfNumbers + 1);
    return randomNumber;
  }

  //SET ACTIVE PLAYER FROM START
  //AND CHANGE ACTIVE PLAYER DURING THE GAME
  function setActivePlayer(){
    const activePlayerDiv = document.getElementById('player' + String(activePlayer));
    const playerDiv1 = document.getElementById('player1');
    const playerDiv2 = document.getElementById('player2');

    if (activePlayer === 0){

      //reset active player
      playerDiv1.classList.remove('active');
      playerDiv2.classList.remove('active');

      activePlayer = getRandomNumber(2);
      const newActivePlayerDiv = document.getElementById('player' + String(activePlayer));
      newActivePlayerDiv.classList.add('active');
      if (activePlayer === 2){
        makeMove();
      }

    } else if (activePlayer === 1){
      activePlayerDiv.classList.toggle('active');
      activePlayer = 2;
      const newActivePlayerDiv = document.getElementById('player' + String(activePlayer));
      newActivePlayerDiv.classList.toggle('active');
      makeMove();

    } else {
      activePlayerDiv.classList.toggle('active');
      activePlayer = 1;
      const newActivePlayerDiv = document.getElementById('player' + String(activePlayer));
      newActivePlayerDiv.classList.toggle('active');
    }
    setBoxClass();
  }

  //SET CLASS TO BOXES TO GET THE RIGHT HOVER STATE
  function setBoxClass(){
    const boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++){
      const box = boxes[i];
      if (!box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
        if (activePlayer === 1){
          box.classList.remove('box-2');
          box.classList.add('box-1');
        }
        else {
          box.classList.remove('box-1');
          box.classList.add('box-2');
        }
      }
      else {
        box.classList.remove('box-1');
        box.classList.remove('box-2');
      }
    }
  }

  //COMPUTER MAKES A MOVE
  function makeMove(){
    //Get all empty boxes in array
    const boxes = document.getElementsByClassName('box');
    let emptyBoxes = [];

    for (let i = 0; i < boxes.length; i++){
      const box = boxes[i];
      if (!box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
        emptyBoxes.push(box);
      }
    }

    //occupy random box
    const boxNumber = getRandomNumber(emptyBoxes.length);
    console.log('emptyBoxes[boxNumber -1]', emptyBoxes[boxNumber -1]);
    const boxToClick = document.getElementById(emptyBoxes[boxNumber -1].id);

    boxToClick.classList.add('box-filled-2');
    boxToClick.setAttribute('style', 'cursor: auto');
    occupiedBoxes++;
    checkResult();
    setActivePlayer();

  }

  //MAKE SURE THE BOXES CAN BE CLICKED
  function makeBoxesClickable(){

    const boxes = document.getElementsByClassName('boxes')[0];

    //On click check if there's a final result, if not change active player
    boxes.addEventListener('click', (event) => {
      const box = event.target;
      //If it's a non occupied clickable box, occupy box and change active player
      if (box.tagName === 'LI' && !box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
        box.classList.add('box-filled-' + activePlayer);
        box.setAttribute('style', 'cursor: auto');
        occupiedBoxes++;
        checkResult();
        setActivePlayer();
      }
    });
  }

  //CHECK IF GAME IS OVER - WIN OR TIE
  function checkResult(){
    let winner = false;
    let player;
    const player1 = 'box-filled-1'; //O
    const player2 = 'box-filled-2'; //X
    const boxes = document.getElementsByClassName('box');

    //Check who is playing
    if (activePlayer === 1){
      player = player1;
    }
    else {
      player = player2;
    }

    /* Possible 3 in a row boxes:
    ** Horizontal [1 2 3] or [4 5 6] or [7 8 9]
    ** Vertical [1 4 7] or [2 5 8] or [3 6 9]
    ** Diagonal [1 5 9] or [3 5 7] */

    //If all boxes in a row has the same class ('box-filled-1' or 'box-filled-2')
    //Announce winner in screen overlay
    if (boxes[0].classList.contains(player) &&  boxes[1].classList.contains(player) && boxes[2].classList.contains(player) ||
      boxes[3].classList.contains(player) && boxes[4].classList.contains(player) && boxes[5].classList.contains(player) ||
      boxes[6].classList.contains(player) && boxes[7].classList.contains(player) && boxes[8].classList.contains(player) ||
      boxes[0].classList.contains(player) && boxes[3].classList.contains(player) && boxes[6].classList.contains(player) ||
      boxes[1].classList.contains(player) && boxes[4].classList.contains(player) && boxes[7].classList.contains(player) ||
      boxes[2].classList.contains(player) && boxes[5].classList.contains(player) && boxes[8].classList.contains(player) ||
      boxes[0].classList.contains(player) && boxes[4].classList.contains(player) && boxes[8].classList.contains(player) ||
      boxes[2].classList.contains(player) && boxes[4].classList.contains(player) && boxes[6].classList.contains(player)){

          winner = true;
          if (player === player1){
            setTimeout(displayScreenOverlay('one'), 1000);
          }
          else {
            setTimeout(displayScreenOverlay('two'), 1000);
          }
    }
    //If all boxes have been checked and there is no winner display, announce it's a tie in screen overlay
    if (occupiedBoxes === 9 && !winner){
      setTimeout(displayScreenOverlay('tie'), 1000);
    }
  }

  //START A GAME
  function newGame(){
    //playerOptions
    getRandomNumber(2);
    setActivePlayer();
    makeBoxesClickable();
  }

  //START NEW GAME AFTER A GAME IS FINISHED
  function resetGame(){

    const boxes = document.getElementsByClassName('box');

    //remove className 'box-filled-1' and 'box-filled-2' from all boxes
    for (let i = 0; i < boxes.length; i++){
      if (boxes[i].classList.contains('box-filled-1')) {
        boxes[i].classList.remove('box-filled-1');
      }
      if (boxes[i].classList.contains('box-filled-2')) {
        boxes[i].classList.remove('box-filled-2');
      }
    }

    activePlayer = 0;
    occupiedBoxes = 0;
    newGame();

  }

  //ON PAGE LOAD, LOAD OVERLAY WITH OPTION TO START THE GAME
  displayScreenOverlay('new');


}();
