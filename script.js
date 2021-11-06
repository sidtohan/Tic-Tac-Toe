// Global Objects
const GameBoard = (function () {
  // using 2D array for simplicity
  const arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const checkWin = () => {
    // some code
  }

  const updateBlock = (e) => {
    // some code
  }

  const addListeners = (e) => {
    // call from generate board
  }

  const clear = () => {
    // clear array and call generateBoard
  }

  const generateBoard = () => {
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        let block = document.createElement('div');
        block.classList.add('board-block');
        block.setAttribute('data-row',i);
        block.setAttribute('data-column',j);
        gameBoardDiv.appendChild(block);
      }
    }
  }

  const checkValidBlock = () => {
    // checks if space clicked was empty
  }

  return {
    generateBoard,
    updateBlock
  }
})();

const Player = function (chosenName,chosenMarker) {
  let score = 0;
  let marker = chosenMarker;
  let name = chosenName;

  const getName = () => {
    return name;
  }
  
  const getMarker = () => {
    return marker;
  }

  return {
    getName,
    getMarker
  }
};


// Global Constants
const gameBoardDiv = document.querySelector('.game-board');
const user = Player("jeff", "O");
const pc = Player("pc", "X");

GameBoard.generateBoard();