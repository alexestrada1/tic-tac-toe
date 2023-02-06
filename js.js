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
    return false
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
  var playerWon = false;
  const setPlayerWon = () => {
    playerWon = true;
  };
  const getPlayerWon = () => {
    return playerWon;
  };
  return {
    name: name,
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
    if (
      col.every((field) => field == "o") ||
      row.every((field) => field == "o") ||
      col.every((field) => field == "x") ||
      row.every((field) => field == "x")
    ) {
      return true;
    }
  }
  return false;
}
function playGame() {
  Gameboard.createGameBoard();
  //const player1 = createPlayer(prompt("Enter player1 Name"));
  //const player2 = createPlayer(prompt("Enter Player 2 name"));
  let turn = 1;
  let gameOver = false;
  resetButton.addEventListener("click", function(){
    gameOver = Gameboard.resetGameBoard();
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

          gameOver = checkWinner(Gameboard.getGameboard());
          console.log(gameOver);
        }
      }
    });
  });
}
const startButton = document.querySelector(".start");
startButton.addEventListener("click", playGame);
const resetButton = document.querySelector(".clear");
