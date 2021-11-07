// Global Objects
const GameBoard = (function () {
  const _gameBoard = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  let _currentTurn = 0;

  // Methods
  const _checkColumns = () => {
    for (let i = 0; i < 3; i++) {
      if (_gameBoard[i][0] === _gameBoard[i][1]
        && _gameBoard[i][1] === _gameBoard[i][2]) {
        let winner;
        if (player1.getMarker() === _gameBoard[i][0]) {
          winner = player1.getName();
        } else {
          winner = player2.getName();
        }
        return winner;
      }
    }
    return null;
  }

  const _checkRows = () => {
    for (let i = 0; i < 3; i++) {
      if (_gameBoard[0][i] === _gameBoard[1][i]
        && _gameBoard[1][i] === _gameBoard[2][i]) {
        let winner;
        if (player1.getMarker() === _gameBoard[0][i]) {
          winner = player1.getName();
        } else {
          winner = player2.getName();
        }
        return winner;
      }
    }
    return null;
  }

  const _checkDiagonals = () => {
    if ((_gameBoard[0][0] === _gameBoard[1][1] && _gameBoard[1][1] === _gameBoard[2][2])
      || (_gameBoard[0][2] === _gameBoard[1][1] && _gameBoard[1][1] === _gameBoard[2][0])) {
      let winner;
      if (player1.getMarker() === _gameBoard[1][1]) {
        winner = player1.getName();
      } else {
        winner = player2.getName();
      };
      return winner;
    }
    return null;
  }

  const _checkRoundWin = () => {
    let rowCheck = _checkRows();
    if (rowCheck !== null) {
      return rowCheck;
    }

    let columnCheck = _checkColumns();
    if (columnCheck !== null) {
      return columnCheck;
    }

    let diagonalCheck = _checkDiagonals();
    if (diagonalCheck !== null) {
      return diagonalCheck;
    }
    return null;
  }

  // checks if the board is full
  const _checkFull = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (_checkValidBlock(i, j)) {
          return false;
        }
      }
    }
    return true;
  }


  const _placeMarker = (e) => {
    let row = Number(e.target.getAttribute('data-row'));
    let column = Number(e.target.getAttribute('data-column'));
    if (_checkValidBlock(row, column)) {
      let block = document.querySelector(`div[data-row="${row}"][data-column="${column}"`);
      let cloneImage = _currentTurn === 0 ? player1.getImageMarker().cloneNode() : player2.getImageMarker().cloneNode();
      block.appendChild(cloneImage);
      _gameBoard[row][column] = (_currentTurn === 0 ? player1.getMarker() : player2.getMarker());
      if (_currentTurn === 0) {
        _currentTurn = 1;
      } else {
        _currentTurn = 0;
      }

      _updateCardsAndResult();
      _resetIfFull();
    }
  }

  const _updateCardsAndResult = () => {
    let value = _checkRoundWin();
    if (value !== null) {
      if (value === player1.getName()) {
        player1.updateScore();
      } else {
        player2.updateScore();
      }
      resultScreen.textContent = `${value} won this round`;
      resultScreen.classList.add('active');
      gameDisplay.classList.add('blur');
      _checkGameWin();
      _clear();
      generateBoard();
      _currentTurn = 0;
      return;
    }
  }

  const _checkGameWin = () => {
    if (player1.getScore() === 5) {
      resultScreen.textContent = `${player1.getName()} won the game`;
      resultScreen.classList.add('active');
      gameDisplay.classList.add("blur");
      player1.resetScore();
      player2.resetScore();
    }
    else if (player2.getScore() === 5) {
      resultScreen.textContent = `${player1.getName()} won the game`;
      resultScreen.classList.add('active');
      gameDisplay.classList.add("blur");
      player1.resetScore();
      player2.resetScore();
    }
  }

  const _resetIfFull = () => {
    if (_checkFull()) {
      resultScreen.textContent = "DRAW";
      resultScreen.classList.add("active");
      gameDisplay.classList.add("blur");
      _clear();
      generateBoard();
      _currentTurn = 0;
      return;
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
      for (let j = 0; j < 3; j++) {
        _gameBoard[i][j] = 3 * i + j;
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

const Player = function (chosenName, chosenMarker, chosenScoreCard) {
  let _marker = chosenMarker;
  let _name = chosenName;
  let _score = 0;
  let _scoreCard = chosenScoreCard;

  let _imageMarker = (function () {
    let temp = document.createElement('img');
    if (_marker == "O") {
      temp.src = oPath;
    } else {
      temp.src = xPath;
    }
    temp.classList.add('marker-image');
    return temp;
  })();


  const setUpScoreCard = () => {
    _scoreCard.children[1].textContent = _name;
  }
  
  const resetScore = () => {
    _score = 0;
    _scoreCard.children[0].textContent = _score;
  }

  const getImageMarker = () => {
    return _imageMarker;
  }

  const getScoreCard = () => {
    return _scoreCard;
  }

  const getScore = () => {
    return _score;
  }

  const getName = () => {
    return _name;
  }

  const getMarker = () => {
    return _marker;
  }

  const updateScore = () => {
    _score += 1;
    _scoreCard.children[0].textContent = _score;
  }


  return {
    getName,
    getMarker,
    getScoreCard,
    getScore,
    getImageMarker,
    updateScore,
    resetScore,
    setUpScoreCard,
  }
};


// Global Constants
const oPath = "assets/o.png";
const xPath = "assets/x.png"
const gameDisplay = document.querySelector('.game-display');
const gameBoardDiv = document.querySelector('.game-board');
const scoreCard1 = document.querySelector('.score-card.p1');
const scoreCard2 = document.querySelector('.score-card.p2');
const resultScreen = document.querySelector('.result-screen');
const player1 = Player("jeff", "O", scoreCard1);
const player2 = Player("bob", "X", scoreCard2);

player1.setUpScoreCard();
player2.setUpScoreCard();

GameBoard.generateBoard();
resultScreen.addEventListener('animationend', (e) => {
  resultScreen.textContent = "";
  resultScreen.classList.remove('active');
  gameDisplay.classList.remove('blur');
})