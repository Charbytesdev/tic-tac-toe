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
    displayController.insertAt(position, mark);
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

const displayController = (() => {
  const _board = document.querySelectorAll(".board-position");

  const getBoard = () => _board;
  const setBoard = (board) => {
    _board = board;
  };

  const refreshDisplayController = () =>
    _board.forEach((position, index) => {
      position.textContent = _board[index];
    });

  const insertAt = (position, mark) => {
    _board.item(position).textContent = mark;
  };

  const clear = () => {
    _board.forEach((position) => (position.textContent = ""));
  };

  const clickHandlerBoard = (position) => {
    const positionIndex = position.classList[1].split("-")[1] - 1;
    if (gameBoard.getSize() < 9 && !gameBoard.getBoard()[positionIndex]) {
      gameController.playTurn(positionIndex);
      const winner = gameController.checkWinner();
      if (winner) {
        console.log(winner);
      }
      gameController.changeTurn();
    }
  };

  return {
    getBoard,
    setBoard,
    insertAt,
    refreshDisplayController,
    clickHandlerBoard,
    clear,
  };
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
    gameBoard.insertAt(position, _currentlyPlaying.getMark());
    displayController.insertAt(position, _currentlyPlaying.getMark());
  };
  const checkWinner = () => {
    const winnerCombs = [
      //rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //cols
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diag
      [0, 4, 8],
      [2, 4, 6],
    ];
    const board = gameBoard.getBoard();
    for (const win of winnerCombs) {
      if (
        board[win[0]] != undefined &&
        board[win[0]] === board[win[1]] &&
        board[win[1]] === board[win[2]]
      ) {
        return _currentlyPlaying.getName();
      }
    }
  };

  const startGame = () => {
    setPlayerOne("boss", "x");
    setPlayerTwo("noob", "o");
    _currentlyPlaying = _playerOne;

    displayController.getBoard().forEach((position) => {
      position.addEventListener("click", () =>
        displayController.clickHandlerBoard(position)
      );
    });
  };

  return {
    setPlayerOne,
    setPlayerTwo,
    changeTurn,
    playTurn,
    startGame,
    checkWinner,
  };
})();

gameController.startGame();
