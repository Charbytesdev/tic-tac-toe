


const gameBoard = (() => {
  const _boardPositions = document.querySelectorAll(".board-position");
  let _arrayBoard = new Array(9);
  const getCurrentBoard = () => _currentBoard;
  const setCurrentBoard = (board) => {
    _arrayBoard = board;
  };
  const refreshGameBoard = () =>
    _boardPositions.forEach((position, index) => {
      position.textContent = _arrayBoard[index];
    });

  const clear = () => {
    _boardPositions.forEach((position) => (position.textContent = ""));
  };
  const insertAt = (position, mark) => {
    _arrayBoard[position] = mark;
    _boardPositions.item(position).textContent = mark;
  };

  return {
    getCurrentBoard,
    setCurrentBoard,
    refreshGameBoard,
    clear,
    insertAt,
  };
})();

gameBoard.insertAt("2", "x");

const playerFactory = (name, mark) => {
  let _name = name;
  let _mark = mark;
  let _score = 0;
  const getName = () => _name;
  const getMark = () => _mark;
  const getScore = () => _score;
  const increaseScore = () => {
    _score++;
  };
  return {
    getName,
    getMark,
    getScore,
    increaseScore,
  };
};
