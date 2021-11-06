// Global Objects
const GameBoard = (function () {
  // using 2D array for simplicity
  const _gameBoard = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  let _currentTurn = 0;

  // Methods
  const _checkWin = () => {
    // column check
    console.log(_gameBoard);
    for (let i = 0; i < 3; i++) {
      if (_gameBoard[i][0] === _gameBoard[i][1]
        && _gameBoard[i][1] === _gameBoard[i][2]) {
        let winner;
        if (player1.getMarker() === _gameBoard[i][0]) {
          winner = player1.getName();
        } else {
          winner = player2.getName();
        }
        console.log(winner);
        _clear();
        generateBoard();
        _currentTurn = 0;
      }
    }
    return null;
  }

  const _placeMarker = (e) => {
    let row = Number(e.target.getAttribute('data-row'));
    let column = Number(e.target.getAttribute('data-column'));
    if (_checkValidBlock(row, column)) {
      let block = document.querySelector(`div[data-row="${row}"][data-column="${column}"`);
      block.textContent = (_currentTurn === 0 ? player1.getMarker() : player2.getMarker());
      _gameBoard[row][column] = (_currentTurn === 0 ? player1.getMarker() : player2.getMarker());
      if (_currentTurn === 0) {
        _currentTurn = 1;
      } else {
        _currentTurn = 0;
      }
      console.log(_checkWin());
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
    //reset array and call generateBoard
    for (let i = 0; i < 3; i++) {
      for(let j =0;j<3;j++){
        _gameBoard[i][j] = 3*i + j;
      }
    }
    gameBoardDiv.innerHTML = '';
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

  // checks if the block is empty
  // it is empty if it contains value equal to its index
  const _checkValidBlock = (row, column) => {
    return _gameBoard[row][column] === 3 * row + column;
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
const player1 = Player("jeff", "O");
const player2 = Player("bob", "X");

GameBoard.generateBoard();