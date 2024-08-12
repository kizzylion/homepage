// Get the computed style of the :root element
const bodyStyle = getComputedStyle(document.body)

// Get the value of the --cell-size variable
const cellSize = parseFloat(bodyStyle.getPropertyValue("--cell-size").trim())

// test
console.log("Cell size:", cellSize)
module.exports = { drawCanvas, cellSize }

function drawCanvas(elem, color) {
  let board = []
  let col = 10
  let row = 10
  let spaceSize = cellSize
  // we will give every space a unique id
  let id = 0
  //so that when i click on a space, i know the space i clicked on

  for (let i = 0; i < row; i++) {
    board[i] = []
    for (let j = 0; j < col; j++) {
      //set id for every space
      board[i][j] = id
      id++

      //draw the space
      elem.strokeStyle = color
      elem.strokeRect(j * spaceSize, i * spaceSize, spaceSize, spaceSize)
    }
  }
}

// dragFunction()
module.exports = { drawCanvas, cellSize }
