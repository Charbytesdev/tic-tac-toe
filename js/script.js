const gameBoard = (() => {
  let _currentBoard = Array(9);
  const getCurrentBoard = () => _currentBoard;
  const setCurrentBoard = (board) => (_currentBoard = board);
  const insertAt = (mark, position) => (_currentBoard[position] = mark);

  return { getCurrentBoard, setCurrentBoard, insertAt };
})();

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
