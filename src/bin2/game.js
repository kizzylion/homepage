export function htmlStructure() {
  return (document.body.innerHTML = `

    <Header class="flex items-center max-w-7xl  w-full mx-auto mt-10 mb-4" >
        <h1 id="Logo" class="text-2xl mr-5"><img id="logo"/>Kiz BattleShip </h1>
        <div class="screen flex px-4 py-3 bg-gray-200 text-sm max-w-xl w-full rounded-md">
            <p id="message">Start editing to see some magic happen </p>
        </div>
    </Header>
    
    <main id="body-container" class=" flex max-xl mx-auto max-w-7xl w-full h-full mt-12">
        
        <div id="battlefield-2" class="hidden board w-1/2">
            <canvas id="computerboard" class="" width="360" height="360"></canvas>
        </div>

    </main>


    <footer class=" max-w-7xl w-full mx-auto py-1">
        <p class="text-center text-sm">
           
            <a target="_blank" href="https://github.com/kizzylion/battleship"><i class="fa-brands fa-github"></i> Kizzylion</a>
        </p>
    </footer>

    `)
}
export function getRandomDirection() {
  return Math.random() < 0.5 ? "horizontal" : "vertical"
}
export function getRandomNumber() {
  return Math.floor(Math.random() * 10)
}

export function canPlaceShip(
  board,
  xPosition,
  yPosition,
  shipLength,
  direction,
  cellSize
) {
  let xCord = parseInt(xPosition / cellSize)
  let yCord = parseInt(yPosition / cellSize)

  if (direction === "horizontal") {
    //check if ship can fit horizontal
    if (xCord % 10 <= 10 - shipLength) {
      for (let i = 0; i < shipLength; i++) {
        let space = board[yCord][xCord + i]
        if (space) {
          return false
        }
      }
      return true
    }
    return false
  } else if (direction === "vertical") {
    //check if ship can fit vertical
    if (yCord % 10 <= 10 - shipLength) {
      for (let i = 0; i < shipLength; i++) {
        let space = board[yCord + i][xCord]
        if (space) {
          return false
        }
      }
      return true
    }
    return false
  }
}
