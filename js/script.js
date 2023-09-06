const Player = (name, mark) => {
  let _name = name;
  let _mark = mark;
  let _score = 0;
  const getName = () => _name;
  const getMark = () => _mark;
  const getScore = () => _score;
  const increaseScore = () => {
    _score++;
  };
  const play = (position) => {
    gameBoard.insertAt(position, mark);
    boardDisplay.insertAt(position, mark);
  };
  return {
    getName,
    getMark,
    getScore,
    increaseScore,
    play,
  };
};

const gameBoard = (() => {
  let _board = new Array(9);
  let _size = 0;

  const getBoard = () => _board;
  const setBoard = (board) => {
    _board = board;
  };
  const getSize = () => _size;

  const refreshGameBoard = () =>
    _board.forEach((position, index) => {
      position.textContent = _board[index];
    });

  const clear = () => {
    _board = new Array(9);
    _size = 0;
  };

  const insertAt = (position, mark) => {
    _board[position] = mark;
    _size++;
  };

  return {
    getBoard,
    setBoard,
    getSize,
    refreshGameBoard,
    clear,
    insertAt,
  };
})();

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

const gameController = (() => {
  let _playerOne = Player(null, null);
  let _playerTwo = Player(null, null);
  let _currentlyPlaying = Player(null, null);
  const setPlayerOne = (name, mark) => {
    _playerOne = Player(name, mark);
  };
  const setPlayerTwo = (name, mark) => {
    _playerTwo = Player(name, mark);
  };
  const changeTurn = () => {
    _currentlyPlaying === _playerOne
      ? (_currentlyPlaying = _playerTwo)
      : (_currentlyPlaying = _playerOne);
  };
  const playTurn = (position) => {
    if (gameBoard.getBoard()[position]) return;
    gameBoard.insertAt(position, _currentlyPlaying.getMark());
    boardDisplay.insertAt(position, _currentlyPlaying.getMark());
  };

  const startGame = () => {
    setPlayerOne("boss", "x");
    setPlayerTwo("noob", "o");
    _currentlyPlaying = _playerOne;

    boardDisplay.getBoard().forEach((position) => {
      position.addEventListener("click", () => {
        const positionIndex = position.classList[1].split("-")[1] - 1;
        if (gameBoard.getSize() < 9 && !gameBoard.getBoard()[positionIndex]) {
          playTurn(positionIndex);
          changeTurn();
        }
      });
    });
  };
  return { setPlayerOne, setPlayerTwo, changeTurn, playTurn, startGame };
})();

gameController.startGame();
