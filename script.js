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

  const clear = () => {
    // clear array and call generateBoard
  }

  const generateBoard = () => {
    // some code
  }

  const checkValidBlock = () => {
    // checks if space clicked was empty
  }

  return {
    // just one function, will call clear and checkWin automatically
    updateBlock
  }
})();

const Player = (function (chosenName,chosenMarker) {
  let score = 0;
  let marker = chosenMarker;
  let name = chosenName;

  const getName = () => {
    return name;
  }
  
  const getScore = () => {
    return score;
  }

  const updateScore = () => {
    // logic for updating score, when checkIfWin is called
  }


})();

const user = Player("jeff", "O");
const pc = Player("pc", "X");

