import {
  getElementById,
  createElement,
  playerShoot,
  computerShoot,
  randomCell,
} from "./DOM/utilities"

const { Gameboard } = require("./factories/Gameboard")

import { cellSize, drawCanvas } from "../bin2/domevents"
import { playerboard, computerBoard } from "./playerDom"
import { getRandomDirection, getRandomNumber, canPlaceShip } from "../bin2/game"

let isHunting = true
let targetCells = []
let lastHitCell = null

export function initializeComputer() {
  getElementById("field").classList.replace("flex-col", "flex-row")
  getElementById("field").classList.add("gap-6", "begin")
  generateComputerBoardUi()

  const computerCvs = getElementById("computerboard")
  const computerCtx = computerCvs.getContext("2d")
  const playerCvs = getElementById("playerboard")
  const playerCtx = playerCvs.getContext("2d")

  drawCanvas(computerCtx, "#d4b4b4")
  placeShipsRandomly(computerBoard.ships)

  computerCvs.addEventListener("click", attack)
}

function generateComputerBoardUi() {
  const field = getElementById("field")
  let attackDiv = attackScreen()

  field.appendChild(attackDiv)
  getElementById(
    "attackScreen"
  ).innerHTML = `<canvas id="computerboard" class=" " width="${
    cellSize * 10
  }" height="${cellSize * 10}"></canvas>`
}

function attackScreen() {
  const div = createElement("div")
  div.setAttribute("id", "attackScreen")
  div.setAttribute("class", "attackScreen")
  div.classList.add("relative", "flex", "w-fit")
  return div
}

//function that  check if position has been shoot previously

function placeShipsRandomly(ships) {
  ships.forEach((ship) => {
    let length = ship.length
    let orientation = getRandomDirection()
    ship.direction = orientation

    // console.log(ship, length, orientation)

    let newPosition = {
      x: getRandomNumber(),
      y: getRandomNumber(),
    }

    let wellPlaced = canPlaceShip(
      computerBoard.board,
      newPosition.x * cellSize,
      newPosition.y * cellSize,
      length,
      orientation,
      cellSize
    )

    // console.log(ship, length, newPosition, orientation)

    while (!wellPlaced) {
      newPosition = {
        x: getRandomNumber(),
        y: getRandomNumber(),
      }

      wellPlaced = canPlaceShip(
        computerBoard.board,
        newPosition.x * cellSize,
        newPosition.y * cellSize,
        length,
        orientation,
        cellSize
      )
    }

    ship.left = newPosition.x * cellSize
    ship.top = newPosition.y * cellSize
    computerBoard.placeShip(ship, newPosition.x, newPosition.y, orientation)
  })
  // console.log(computerBoard.board)
}
async function attack(e) {
  const computerCvs = document.getElementById("computerboard")
  const computerCtx = computerCvs.getContext("2d")
  const playerCvs = document.getElementById("playerboard")
  const playerCtx = playerCvs.getContext("2d")

  let playerKill = playerShoot(
    e,
    computerCvs,
    computerCtx,
    cellSize,
    computerBoard.getBoard(),
    document.getElementById("attackScreen"),
    computerBoard
  )

  if (playerKill) return // player plays again

  computerCvs.removeEventListener("click", attack)

  await new Promise((resolve) => setTimeout(resolve, 1500)) // Delay between computer shots

  let cell
  let result

  do {
    if (isHunting) {
      cell = shootCellRandomly(playerboard)
    } else {
      cell = targetCells.shift()
      if (!cell) {
        isHunting = true
        cell = shootCellRandomly(playerboard)
      }
    }

    result = computerShoot(
      playerboard,
      playerCtx,
      cell,
      document.getElementById("strategyscreen")
    )

    if (result) {
      lastHitCell = cell
      isHunting = false
      targetCells = getTargetCells(cell)
    }

    await new Promise((resolve) => setTimeout(resolve, 1500)) // Delay between computer shots
  } while (result) // Continue shooting if hit

  computerCvs.addEventListener("click", attack)
}

function shootCellRandomly(gameBoard) {
  let cell

  do {
    cell = randomCell()
  } while (gameBoard.checkIfPositionHasBeenHit([cell.x, cell.y]))

  return cell
}

function getTargetCells(cell) {
  return getAdjacentCells(cell).filter(
    (c) => !playerboard.checkIfPositionHasBeenHit([c.x, c.y])
  )
}

function getAdjacentCells(cell) {
  let arr = []

  if (cell.x - 1 >= 0) arr.push({ x: cell.x - 1, y: cell.y })
  if (cell.x + 1 < 10) arr.push({ x: cell.x + 1, y: cell.y })
  if (cell.y - 1 >= 0) arr.push({ x: cell.x, y: cell.y - 1 })
  if (cell.y + 1 < 10) arr.push({ x: cell.x, y: cell.y + 1 })

  return arr
}
