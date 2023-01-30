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
        }
        const createGameBoard = () =>{
            for(let i=0; i<9; i++){
                var squareDiv = document.createElement('div')
                //Text content for testing, will remove later
                squareDiv.textContent = i;
                container[0].appendChild(squareDiv)
            }
            
        }
        return {getGameboard, resetGameBoard, createGameBoard}
    })();

    function createPlayer(name) {
        return {
          name: name,
          getFullName() {
            return name;
          },
        };
      }
    function playGame(){
        Gameboard.createGameBoard();
        const player1 = createPlayer('player1') 
        const player2 = createPlayer('player2')

    }
    const startButton = document.querySelector(".start")
    startButton.addEventListener('click', playGame)
