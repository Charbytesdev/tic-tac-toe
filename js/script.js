const playerIdSetter = (() => {
  let id = 0;
  generateId = () => {
    id < 2 ? id : (id = 0);
    return id++;
  };
  return { generateId };
})();

const Player = (name, mark) => {
  let _name = name;
  let _mark = mark;
  const _id = playerIdSetter.generateId();
  let _score = 0;
  const getName = () => _name;
  const getMark = () => _mark;
  const getId = () => _id;
  const getScore = () => _score;
  const increaseScore = () => {
    _score++;
  };
  const resetScore = () => {
    _score = 0;
  };

  return {
    getName,
    getMark,
    getId,
    getScore,
    increaseScore,
    resetScore,
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

const gameDisplay = (() => {
  const _gameScreen = document.getElementById("game-screen");
  const _playerOneName = document.getElementById("p1-name");
  const _playerTwoName = document.getElementById("p2-name");

  const enable = () => {
    _gameScreen.style.display = "flex";
  };

  const disable = () => {
    _gameScreen.style.display = "none";
  };

  const setPlayerOneName = (name) => {
    _playerOneName.textContent = name;
  };

  const setPlayerTwoName = (name) => {
    _playerTwoName.textContent = name;
  };

  return { enable, disable, setPlayerOneName, setPlayerTwoName };
})();

const startDisplay = (() => {
  const _playerOneNameInput = document.getElementById("p1-name-input");
  const _playerTwoNameInput = document.getElementById("p2-name-input");

  const _startButton = document.getElementById("start-btn");

  const _startScreen = document.getElementById("start-screen");

  _startButton.onclick = () => {
    gameDisplay.setPlayerOneName(_playerOneNameInput.value);
    gameDisplay.setPlayerTwoName(_playerTwoNameInput.value);

    gameController.setPlayerOne(_playerOneNameInput.value, "x");
    gameController.setPlayerTwo(_playerTwoNameInput.value, "o");
    disable();
    gameDisplay.enable();
    displayController.startGame();
  };

  const enable = () => {
    _startScreen.style.display = "flex";
  };

  const disable = () => {
    _startScreen.style.display = "none";
  };
  return { enable, disable };
})();

const endDisplay = (() => {
  const _winnerText = document.getElementById("winner-text");
  const _playAgainButton = document.getElementById("play-again-btn");
  const _changePlayersButton = document.getElementById("change-players-btn");
  const _endScreen = document.getElementById("end-screen");

  _playAgainButton.onclick = () => {
    disable();
    gameDisplay.enable();
    displayController.startGame();
  };

  _changePlayersButton.onclick = () => {
    disable();
    startDisplay.enable();
  };

  const setWinnerText = (winner) => {
    _winnerText.textContent += winner;
  };

  const enable = () => {
    _endScreen.style.display = "grid";
  };

  const disable = () => {
    _endScreen.style.display = "none";
  };
  return { setWinnerText, enable, disable };
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

  const startGame = () => {
    clearScores();
    addClickListeners();
    gameController.startGame();
  };

  const endGame = () => {
    removeClickListeners();
    gameDisplay.disable();
    endDisplay.setWinnerText(gameController.getCurrentlyPlaying().getName());
    endDisplay.enable();
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

  const playTurn = (position) => {
    const currentPlayer = gameController.getCurrentlyPlaying();

    const roundWon = gameController.isRoundWon();
    const tie = gameController.isTie();

    if (tie) {
      clearBoard();
      gameController.resetRound();
    }
    if (roundWon || tie) {
      if (roundWon) {
        increaseScore(currentPlayer.getId());
        currentPlayer.increaseScore();
        const gameWon = gameController.isGameWon();

        if (gameWon) {
          endGame();
        }
      }
      clearBoard();
      gameController.resetRound();
    } else {
      insertAt(position, currentPlayer.getMark());
      gameController.changeTurn();
    }
  };

  const clickHandlerBoard = (e) => {
    const position = e.target.dataset.position;
    if (!position) return;
    if (gameBoard.getSize() < 9 && !gameBoard.getBoard()[position]) {
      gameController.playTurn(position);
      playTurn(position);
    }
  };

  return {
    startGame,
    endGame,
  };
})();

const gameController = (() => {
  let _playerOne = null;
  let _playerTwo = null;
  let _currentlyPlaying = null;
  const setPlayerOne = (name, mark) => {
    _playerOne = Player(name, mark);
    _currentlyPlaying = _playerOne;
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

  const clearScores = () => {
    _playerOne.resetScore();
    _playerTwo.resetScore();
  };

  const startGame = () => {
    clearScores();
    resetRound();
  };

  const resetRound = () => {
    gameBoard.clear();
    _currentlyPlaying = _playerOne;
  };

  const isTie = () => {
    if (gameBoard.getSize() >= 9 && !gameController.isRoundWon()) {
      return true;
    }
    return false;
  };

  const isRoundWon = () => {
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
        return true;
      }
    }
    return false;
  };

  const isGameWon = () => {
    if (_currentlyPlaying.getScore() >= 3) return true;
    return false;
  };

  return {
    setPlayerOne,
    setPlayerTwo,
    getCurrentlyPlaying,
    changeTurn,
    resetRound,
    playTurn,
    isRoundWon,
    isGameWon,
    isTie,
    startGame,
  };
})();
