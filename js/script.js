const boardDisplay = (() => {
  const _board = document.querySelectorAll(".board-position");

  const getBoard = () => _board;
  const setBoard = (board) => {
    _board = board;
  };

  const refreshBoardDisplay = () =>
    _board.forEach((position, index) => {
      position.textContent = _board[index];
    });

  const insertAt = (position, mark) => {
    _board.item(position).textContent = mark;
  };

  const clear = () => {
    _board.forEach((position) => (position.textContent = ""));
  };

  return { getBoard, setBoard, insertAt, refreshBoardDisplay, clear };
})();

const gameBoard = (() => {
  let _board = new Array(9);

  const getBoard = () => _board;
  const setBoard = (board) => {
    _board = board;
  };

  const refreshGameBoard = () =>
    _board.forEach((position, index) => {
      position.textContent = _board[index];
    });

  const clear = () => {
    _board = new Array(9);
  };

  const insertAt = (position, mark) => {
    _board[position] = mark;
  };

  return {
    getBoard,
    setBoard,
    refreshGameBoard,
    clear,
    insertAt,
  };
})();

boardDisplay.insertAt("2", "x");

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
