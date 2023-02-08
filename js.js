const container = document.getElementsByClassName("gamegrid");
//Gets conainer div, uased to create board from js
const Gameboard = (() => {
  let gameboard = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
  ];
  const getGameboardVal = (row, col) => {
    return gameboard[row][col];
  };
  const getGameboard = () => {
    console.log(gameboard);
    return gameboard;
  };
  const resetGameBoard = () => {
    gameboard = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];
    const gameCells = document.querySelectorAll(".gameCell");
    gameCells.forEach((cell) => {
      cell.classList.remove("o");
      cell.classList.remove("x");
    });
    return false;
  };
  const createGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      var squareDiv = document.createElement("div");
      //Text content for testing, will remove later
      squareDiv.textContent = i;
      squareDiv.id = i;
      squareDiv.classList.add("gameCell");
      container[0].appendChild(squareDiv);
    }
  };
  const setGameboardVal = (row, col, className) => {
    if (className == "o") {
      gameboard[row][col] = "o";
    } else {
      gameboard[row][col] = "x";
    }
  };
  return {
    getGameboard,
    getGameboardVal,
    resetGameBoard,
    createGameBoard,
    setGameboardVal,
  };
})();

function createPlayer(name) {
  var wins = 0;
  var playerWon = false;
  const setPlayerWon = (won) => {
    playerWon = won;
  };
  const getPlayerWon = () => {
    return playerWon;
  };
  const getWins = () => {
    return wins;
  };
  const addWin = () => {
    wins += 1;
  };
  return {
    name: name,
    addWin,
    getWins,
    getPlayerWon,
    setPlayerWon,
  };
}
function checkWinner(gameboard, player1, player2) {
  for (let i = 0; i < 3; i++) {
    var row = [];
    for (let j = 0; j < 3; j++) {
      row.push(gameboard[i][j]);
    }
    var col = gameboard.map(function (value) {
      return value[i];
    });
    var diagonal1 = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
    var diagonal2 = [gameboard[2][0], gameboard[1][1], gameboard[0][2]];

    if (
      col.every((field) => field == "o") ||
      row.every((field) => field == "o") ||
      diagonal1.every((field) => field == "o") ||
      diagonal2.every((field) => field == "o")
    ) {
      player1.setPlayerWon(true);
      player1.addWin();
      return true;
    } else if (
      col.every((field) => field == "x") ||
      row.every((field) => field == "x") ||
      diagonal1.every((field) => field == "x") ||
      diagonal2.every((field) => field == "x")
    ) {
      player2.setPlayerWon(true);
      player2.addWin();
      return true;
    }
  }
  return false;
}
function playGame() {
  Gameboard.createGameBoard();
  const player1 = createPlayer(prompt("Enter player1 Name"));
  const player1Name = document.querySelector(".player1");
  player1Name.textContent = player1.name + " Wins: ";
  const player1Wins = document.querySelector(".player1-wins");

  const player2 = createPlayer(prompt("Enter Player 2 name"));
  const player2Name = document.querySelector(".player2");
  player2Name.textContent = player2.name + " Wins: ";
  const player2Wins = document.querySelector(".player2-wins");

  let turn = 1;
  let gameOver = false;
  resetButton.addEventListener("click", function () {
    gameOver = Gameboard.resetGameBoard();
    displayWinner.textContent = "";
    player1.setPlayerWon(false);
    player2.setPlayerWon(false);
    turn = 1;
  });
  const gameCells = document.querySelectorAll(".gameCell");
  gameCells.forEach((cell) => {
    cell.addEventListener("click", function () {
      if (gameOver != true) {
        if (!cell.classList.contains("o") && !cell.classList.contains("x")) {
          let row;
          let cellNum = parseInt(cell.id);
          let col = cellNum % 3; //the modular gets the column
          if (cellNum <= 2) {
            row = 0;
          }
          if (cellNum <= 5 && cellNum > 2) {
            row = 1;
          }
          if (cellNum <= 8 && cellNum > 5) {
            row = 2;
          }
          if (turn % 2 == 0) {
            cell.classList.add("x");
            Gameboard.setGameboardVal(row, col, "x");
          } else {
            cell.classList.add("o");
            Gameboard.setGameboardVal(row, col, "o");
          }
          turn++;

          gameOver = checkWinner(Gameboard.getGameboard(), player1, player2);
          console.log(gameOver);
        }
      }
      if (player1.getPlayerWon() == true) {
        displayWinner.textContent = player1.name + " wins!";
        player1Wins.textContent = player1.getWins();
      } else if (player2.getPlayerWon() == true) {
        displayWinner.textContent = player2.name + " wins!";
        player2Wins.textContent = player2.getWins();
      } else if (turn > 9) {
        displayWinner.textContent = "No one wins!";
      }
    });
  });
}
const startButton = document.querySelector(".start");
startButton.addEventListener("click", playGame);
const resetButton = document.querySelector(".clear");
const displayWinner = document.querySelector(".display");
