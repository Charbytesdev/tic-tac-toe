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

  return {
    getName,
    getMark,
    getScore,
    increaseScore,
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
  const _boardElement = document.getElementById("board");
  const _playerScores = document.querySelectorAll(".player-score");

  const increaseScore = (playerIndex) => {
    _playerScores.item(playerIndex).textContent =
      parseInt(_playerScores.item(playerIndex).textContent) + 1;
  };

  const clearScores = () => {
    _playerScores.forEach((playerScore) => {
      playerScore.textContent = 0;
    });
  };

  const insertAt = (position, mark) => {
    _boardElement.children.item(position).textContent = mark;
  };

  const clearBoard = () => {
    for (boardPosition of _boardElement.children) {
      boardPosition.textContent = "";
    }
  };

  const addClickListeners = () => {
    _boardElement.addEventListener("click", clickHandlerBoard);
  };

  const removeClickListeners = () => {
    _boardElement.removeEventListener("click", clickHandlerBoard);
  };

  const clickHandlerBoard = (e) => {
    const currentPlayer = gameController.getCurrentlyPlaying();
    const positionIndex = e.target.dataset.position;
    if (!positionIndex) return;
    if (gameBoard.getSize() < 9 && !gameBoard.getBoard()[positionIndex]) {
      gameController.playTurn(positionIndex);
      insertAt(positionIndex, currentPlayer.getMark());
      const winner = gameController.checkWinner();
      if (winner) {
        increaseScore(parseInt(winner.getName()) - 1);
        clearBoard();
        gameController.endRound();
        if (gameController.checkGameWinner(winner)) {
          clearScores();
          gameController.endGame();
          gameController.startGame();
        }
        gameController.startRound();
      }
      gameController.changeTurn();
    }
    if (gameController.checkTie()) clearBoard();
  };

  return {
    addClickListeners,
    removeClickListeners,
  };
})();

const gameController = (() => {
  let _playerOne = null;
  let _playerTwo = null;
  let _currentlyPlaying = null;
  const setPlayerOne = (name, mark) => {
    _playerOne = Player(name, mark);
  };
  const setPlayerTwo = (name, mark) => {
    _playerTwo = Player(name, mark);
  };

  const getCurrentlyPlaying = () => _currentlyPlaying;
  const changeTurn = () => {
    _currentlyPlaying === _playerOne
      ? (_currentlyPlaying = _playerTwo)
      : (_currentlyPlaying = _playerOne);
  };
  const playTurn = (position) => {
    gameBoard.insertAt(position, _currentlyPlaying.getMark());
  };

  const startRound = () => {
    _currentlyPlaying = _playerOne;
    gameBoard.clear();

    displayController.addClickListeners();
  };

  const endRound = () => {
    gameBoard.clear();
  };

  const checkTie = () => {
    if (gameBoard.getSize() >= 9 && !gameController.checkWinner()) {
      endRound();
      startRound();
      return true;
    }
    return false;
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
        _currentlyPlaying.increaseScore();
        return _currentlyPlaying;
      }
    }
  };

  const checkGameWinner = (winner) => {
    if (winner.getScore() >= 3) return true;
    return false;
  };

  const startGame = () => {
    setPlayerOne("1", "x");
    setPlayerTwo("2", "o");
    startRound();
  };

  const endGame = () => {
    setPlayerOne(null, null);
    setPlayerTwo(null, null);
  };

  return {
    setPlayerOne,
    setPlayerTwo,
    getCurrentlyPlaying,
    changeTurn,
    playTurn,
    startGame,
    endGame,
    checkWinner,
    checkGameWinner,
    checkTie,
    startRound,
    endRound,
  };
})();

gameController.startGame();
