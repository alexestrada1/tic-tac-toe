const container = document.getElementsByClassName("container");
//Gets conainer div, uased to create board from js
const Gameboard = (() => {
  let gameboard = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
  ];
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
  };
  const createGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      var squareDiv = document.createElement("div");
      //Text content for testing, will remove later
      squareDiv.textContent = i;
      squareDiv.classList.add("gameCell");
      container[0].appendChild(squareDiv);
    }
  };
  const setGameboardVal = (row, col, className) => {
    if (className == "o") {
      console.log(gameboard[row][col])
      gameboard[row][col] = "o";
    } else {
      gameboard[row][col] = "x";
    }
  };
  return { getGameboard, resetGameBoard, createGameBoard, setGameboardVal};
})();

function createPlayer(name) {
  var values = [];
  const setPlayerValues = (value) => {
    values.push(value);
  };
  const getPlayerValues = () => {
    return values;
  };
  return {
    name: name,
    getFullName() {
      return name, values, setPlayerValues, getPlayerValues;
    },
  };
}
function playGame() {
  Gameboard.createGameBoard();
  const o = createPlayer("o");
  const x = createPlayer("x");
  let turn = 1;
  const gameCells = document.querySelectorAll(".gameCell");
  gameCells.forEach((cell) => {
    cell.addEventListener("click", function () {
      if (cell.classList.contains("o") || cell.classList.contains("x")) {
        //empty brackets to do nothing if a cell already has a class
      } else {
        let row;
        let cellNum = parseInt(cell.textContent)
        let col = cellNum % 3; //the modular gets the column
        if(cellNum <= 2){row = 0;}
        if(cellNum <= 5 && cellNum > 2){row = 1}
        if(cellNum <= 8 && cellNum > 5){row = 2}
        if (turn % 2 == 0) {
          cell.classList.add("x");
          Gameboard.setGameboardVal(row, col, 'x')
        } else {
          cell.classList.add("o");
          Gameboard.setGameboardVal(row, col, 'o')
        }
        Gameboard.getGameboard();
        turn++;
      }
    });
  });
  console.log(gameCells);
}
const startButton = document.querySelector(".start");
startButton.addEventListener("click", playGame);
const resetButton = document.querySelector(".clear");
resetButton.addEventListener("click", Gameboard.resetGameBoard);
