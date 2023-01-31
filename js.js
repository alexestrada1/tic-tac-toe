const container = document.getElementsByClassName("container")
//Gets conainer div, uased to create board from js
    const Gameboard  = (() => {
        let gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
        const getGameboard = () => {
            console.log(gameboard);
            return gameboard;
        }
        const resetGameBoard = () => {
            gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
            const gameCells = document.querySelectorAll('.gameCell')
            gameCells.forEach((cell) =>{
              cell.classList.remove('player1')
              cell.classList.remove('player2')
                });
        }
        const createGameBoard = () =>{
            for(let i=0; i<9; i++){
                var squareDiv = document.createElement('div')
                //Text content for testing, will remove later
                squareDiv.textContent = i;
                squareDiv.classList.add('gameCell')
                container[0].appendChild(squareDiv)
            }
            
        }
        return {getGameboard, resetGameBoard, createGameBoard}
    })();

    function createPlayer(name) {
        var values = [];
        const setPlayerValues = (value) =>{
            values = value;
        }
        const getPlayerValues = () => {
            return values
        }
        return {
          name: name,
          getFullName() {
            return name,
            values,
            setPlayerValues,
            getPlayerValues;
          },
        };
      }
    function playGame(){
        Gameboard.createGameBoard();
        const player1 = createPlayer('player1') 
        const player2 = createPlayer('player2')
        let turn = 1;
        const gameCells = document.querySelectorAll('.gameCell')
        gameCells.forEach((cell) =>{
            cell.addEventListener(('click'), function(){
              if(turn % 2 == 0){
                cell.classList.add("player2");
              } 
              else{
                cell.classList.add('player1')
              }
              turn++;
              console.log(turn)
            })
            });
        console.log(gameCells)
    }
    const startButton = document.querySelector(".start")
    startButton.addEventListener('click', playGame)
    const resetButton = document.querySelector('.clear')
    resetButton.addEventListener('click', Gameboard.resetGameBoard)

