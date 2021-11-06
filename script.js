// Global Objects
const GameBoard = (function () {
  // using 2D array for simplicity
  const _gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  let _currentTurn = 0;
  // 0 means player, and 1 means PC

  // Methods
  const _checkWin = () => {
    // some code
  }

  const _placeMarker = (e) => {
    // some code
    let row = e.target.getAttribute('data-row');
    let column = e.target.getAttribute('data-column');
    if(_checkValidBlock(row,column)){
      let block = document.querySelector(`div[data-row="${row}"][data-column="${column}"`);
      block.textContent = (_currentTurn === 0? user.getMarker() : pc.getMarker());
      _gameBoard[row][column] = (_currentTurn === 0? user.getMarker() : pc.getMarker());
      if(_currentTurn === 0){
        _currentTurn = 1;
      } else{
        _currentTurn = 0;
      }
    }
  }

  const _addListeners = (e) => {
    // call from generate board
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let block = document.querySelector(`div[data-row="${i}"][data-column="${j}"]`);
        block.addEventListener('click', _placeMarker);
      }
    }
  }

  const _clear = () => {
    // clear array and call generateBoard
  }

  const generateBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let block = document.createElement('div');
        block.classList.add('board-block');
        block.setAttribute('data-row', i);
        block.setAttribute('data-column', j);
        gameBoardDiv.appendChild(block);
      }
    }
    _addListeners();
  }

  const _checkValidBlock = (row, column) => {
    return _gameBoard[row][column] === 0;
    // 0 means it was empty
  }

  return {
    generateBoard
  }
})();

const Player = function (chosenName, chosenMarker) {
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