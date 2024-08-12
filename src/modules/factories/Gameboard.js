const { data } = require("autoprefixer")
const { Ship } = require("./Ship")
const { isColliding, isWithinBounds, orientation } = require("../playerDom")
class Gameboard {
  constructor() {
    this.opponentName,
      (this.ships = [
        new Ship("carrier", 4),
        new Ship("battleship", 3),
        new Ship("destroyer", 2),
        new Ship("submarine", 2),
        new Ship("patrol", 1),
      ])
    this.missedShots = new Set()
    this.positionShot = new Set()
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null))
    this.hitShot = new Set()
  }

  setOpponentName(name) {
    this.playerName = name
  }
  getOpponentName() {
    return this.playerName
  }
  _hash(key) {
    if (key === "carrier") return 0
    if (key === "battleship") return 1
    if (key === "destroyer") return 2
    if (key === "submarine") return 3
    if (key === "patrol") return 4
  }

  placeShip(ship, startX, startY, direction) {
    const shipLength = ship.length

    // Check if the ship placement is within bounds
    if (direction === "horizontal") {
      if (
        startX + shipLength > this.board[0].length ||
        startY >= this.board.length
      )
        return false
    } else if (direction === "vertical") {
      if (
        startY + shipLength > this.board.length ||
        startX >= this.board[0].length
      )
        return false
    }

    // Check if the placement is not colliding with another ship
    for (let i = 0; i < shipLength; i++) {
      if (direction === "horizontal") {
        if (this.board[startY][startX + i]) return false
      } else if (direction === "vertical") {
        if (this.board[startY + i][startX]) return false
      }
    }

    if (direction === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        this.board[startY][startX + i] = ship
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        this.board[startY + i][startX] = ship
      }
    }

    this.ships.push(ship)
  }

  receiveAttack(x, y) {
    const target = this.board[y][x]
    if (target) {
      this.addToPositionShot([x, y])
      this.hitShot.add([x, y].toString())
      target.hit()
    } else {
      this.missedShots.add([x, y].toString())
      this.addToPositionShot([x, y])
    }
  }

  addToPositionShot(array) {
    const string = array.toString()
    this.positionShot.add(string)
  }
  removeShip(shipName, x, y, shipLength, direction) {
    const ship = this.getShip(shipName)

    for (let i = 0; i < shipLength; i++) {
      if (direction === "horizontal" && this.board[y][x + i] === ship) {
        this.board[y][x + i] = null
      } else if (direction === "vertical" && this.board[y + i][x] === ship) {
        this.board[y + i][x] = null
      }
    }
  }

  allShipSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }

  getShip(key) {
    return this.ships[this._hash(key)]
  }

  calculateNewPosition(e, canvas, draggedToken) {
    let newX = e.clientX - canvas.getBoundingClientRect().x
    let newY = e.clientY - canvas.getBoundingClientRect().y

    const width = draggedToken.clientWidth
    const height = draggedToken.clientHeight

    newX = Math.max(0, Math.min(newX, canvas.width - width))
    newY = Math.max(0, Math.min(newY, canvas.height - height))

    newX = Math.floor(newX / 36) * 36
    newY = Math.floor(newY / 36) * 36

    return { x: newX, y: newY }
  }

  clearBoard() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null))
  }

  getBoard() {
    return this.board
  }

  checkIfPositionHasBeenHit(position) {
    return this.positionShot.has(position.toString())
  }
}

module.exports = { Gameboard }
