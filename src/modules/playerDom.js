import logoSrc from "../asset/images/logo.png"
import oceanSoundSrc from "../asset/sound/ocean.mp3"

const {
  htmlStructure,
  getRandomDirection,
  getRandomNumber,
  canPlaceShip,
} = require("../bin2/game")
const { drawCanvas, cellSize } = require("../bin2/domevents")
const { Gameboard } = require("./factories/Gameboard")

import {
  querySelectorAll,
  getElementById,
  hideElement,
  flexElement,
  newMessage,
} from "./DOM/utilities"
import { initializeComputer } from "./comDom"

export const playerboard = new Gameboard()
export const computerBoard = new Gameboard()

playerboard.setOpponentName("Computer")
computerBoard.setOpponentName("Player")
;(function () {
  htmlStructure()
  getElementById("logo").src = logoSrc

  setupPlayerField()
  const oceanSound = new Audio(oceanSoundSrc)

  const playerCvs = document.getElementById("playerboard")
  const playerCtx = playerCvs.getContext("2d")

  const startMessage = [
    "Begin by setting up a formation",
    "Drag and Drop your ships in your country water",
    "You can arrange your ships in a vertical or horizontal position by using the X axis or Y axis Button",
    "All the best with your formation",
  ]

  newMessage("message", startMessage)

  //draw player canvas
  drawCanvas(playerCtx, "#b4b4ff")

  //axis
  let xAxis = document.getElementById("axis-x")
  let yAxis = document.getElementById("axis-y")

  let orientation = "horizontal"

  xAxis.addEventListener("click", () => {
    horizontalAxis()
    console.log(orientation)
  })
  yAxis.addEventListener("click", () => {
    verticalAxis()
    console.log(orientation)
  })

  // draw player ships and add ships
  playerboard.ships.forEach((ship) => {
    ship.shipUi()
  })

  let shipTokens = querySelectorAll("token")
  console.log(shipTokens)
  let wellPlaced = true
  let allShipPlaced = checkAllTokenPlaced

  shipTokens.forEach((token) => {
    token.addEventListener("dragstart", dragStart)
    token.addEventListener("dragend", dragEnd)
  })

  const strategyscreen = document.getElementById("strategyscreen")
  const packs = document.querySelectorAll(".pack")

  strategyscreen.addEventListener("dragover", dragOverBoard)

  strategyscreen.addEventListener("drop", dropOnBoard)

  packs.forEach((pack) => {
    pack.addEventListener("dragover", dragOverPack)
  })

  let randomBTN = getElementById("randomBTN")
  randomBTN.addEventListener("click", () => {
    let tokens = document.querySelectorAll(".token")
    let strategyscreen = document.getElementById("strategyscreen")
    let placedTokens = document.querySelectorAll("#strategyscreen .onboard")
    let packedTokens = document.querySelectorAll(".pack .token")
    packedTokens.forEach((token) => token.remove())
    placedTokens.forEach((token) => token.remove())
    playOceanSound()

    playerboard.clearBoard()

    tokens.forEach((token) => {
      let wellPlaced = true
      let tokenName = token.getAttribute("data-name")
      let orientation = getRandomDirection()
      let length = parseInt(token.getAttribute("data-length"))

      //add the orientation class to draggedToken

      let newPosition = {
        x: getRandomNumber() * cellSize,
        y: getRandomNumber() * cellSize,
      }

      wellPlaced = canPlaceShip(
        playerboard.board,
        newPosition.x,
        newPosition.y,
        length,
        orientation,
        cellSize
      )

      while (!wellPlaced) {
        newPosition = {
          x: getRandomNumber() * cellSize,
          y: getRandomNumber() * cellSize,
        }

        wellPlaced = canPlaceShip(
          playerboard.board,
          newPosition.x,
          newPosition.y,
          length,
          orientation,
          cellSize
        )
      }

      token.style.top = `${newPosition.y}px`
      token.style.left = `${newPosition.x}px`
      token.style.position = "absolute"
      token.setAttribute("data-direction", orientation)
      if (orientation === "vertical") {
        token.classList.add("vertical")
      } else {
        token.classList.remove("vertical")
      }
      token.classList.add("onboard")
      strategyscreen.appendChild(token)

      let draggedShip = playerboard.getShip(tokenName)
      draggedShip.left = newPosition.x
      draggedShip.top = newPosition.y
      draggedShip.direction = orientation
      playerboard.placeShip(
        draggedShip,
        newPosition.x / cellSize,
        newPosition.y / cellSize,
        orientation
      )
    })
    const randomFormation = [
      "Your Ships have been placed randomly",
      "Not fine with the formation? click Random, else, Start! now",
    ]

    newMessage("message", randomFormation)
    // console.log(playerboard.board)
  })

  let startBTN = getElementById("startBTN")
  startBTN.addEventListener("click", () => {
    if (allShipPlaced() && wellPlaced) {
      hideElement(getElementById("port"))
      hideElement(getElementById("axis-section"))
      hideElement(getElementById("cta"))
      flexElement(getElementById("restartDiv"))

      querySelectorAll("token").forEach((token) => {
        removeDragEvents(token)
      })

      const startMessage = [
        "Fight!!! Now",
        "Shoot any position on your enemies water to destroy enemies ship",
        "Remember, Ships are placed Horizontally and Vertically Only",
      ]

      newMessage("message", startMessage, true)

      getElementById("playerboard").classList.add("bringFront")
      initializeComputer()
      playOceanSound()
    } else {
      alert("Fix Board: click 'Random' button to set up ships randomly")
    }
  })

  function playOceanSound() {
    oceanSound.play().catch((error) => {
      console.error("Error playing the sound:", error)
    })
    oceanSound.loop = true
  }

  function dragStart(e) {
    this.classList.add("dragging")
  }

  function dragEnd(e) {
    this.classList.remove("dragging")
  }

  function dragOverBoard(e) {
    e.preventDefault()

    const draggedToken = document.querySelector(".dragging")
    const currentX = parseInt(draggedToken.style.left) / cellSize
    const currentY = parseInt(draggedToken.style.top) / cellSize
    const length = parseInt(draggedToken.getAttribute("data-length"))
    const direction = draggedToken.getAttribute("data-direction")
    const shipName = draggedToken.getAttribute("data-name")

    //if the token is already on the board,
    // Remove it from its current position
    if (
      draggedToken.classList.contains("onboard") &&
      draggedToken.classList.contains(draggedToken.getAttribute("data-name"))
    ) {
      playerboard.removeShip(shipName, currentX, currentY, length, direction)
    }

    let newPosition = playerboard.calculateNewPosition(
      e,
      playerCvs,
      draggedToken
    )

    //get the cell position of the dragged token in the canvas

    if (orientation === "vertical") {
      draggedToken.classList.add("vertical")
    } else {
      draggedToken.classList.remove("vertical")
    }
    //add the orientation class to draggedToken

    //check if canPlace ship
    //if it not return to previous state
    if (
      !canPlaceShip(
        playerboard.board,
        newPosition.x,
        newPosition.y,
        length,
        orientation,
        cellSize
      )
    ) {
      draggedToken.classList.add("errorBorder")
      let draggedShip = playerboard.getShip(
        draggedToken.getAttribute("data-name")
      )
      draggedToken.setAttribute("data-direction", direction)
      //set previous direction
      if (direction === "vertical") {
        draggedToken.classList.add("vertical")
        draggedToken.classList.remove("errorBorder")
      } else {
        draggedToken.classList.remove("vertical")
        draggedToken.classList.remove("errorBorder")
      }
      console.log(wellPlaced)
      playerboard.placeShip(draggedShip, currentX, currentY, direction)
      return
    }
    draggedToken.classList.remove("errorBorder")
  }

  function dropOnBoard(e) {
    const draggedToken = document.querySelector(".dragging")
    const length = parseInt(draggedToken.getAttribute("data-length"))

    let newPosition = playerboard.calculateNewPosition(
      e,
      playerCvs,
      draggedToken
    )

    if (
      canPlaceShip(
        playerboard.board,
        newPosition.x,
        newPosition.y,
        length,
        orientation,
        cellSize
      )
    ) {
      console.log(draggedToken)
      draggedToken.classList.remove("errorBorder")
      draggedToken.style.top = `${newPosition.y}px`
      draggedToken.style.left = `${newPosition.x}px`
      draggedToken.style.position = "absolute"
      draggedToken.setAttribute("data-direction", orientation)
      draggedToken.classList.add("onboard")
      strategyscreen.appendChild(draggedToken)

      let draggedShip = playerboard.getShip(
        draggedToken.getAttribute("data-name")
      )
      draggedShip.left = newPosition.x
      draggedShip.top = newPosition.y
      draggedShip.direction = orientation
      playerboard.placeShip(
        draggedShip,
        newPosition.x / cellSize,
        newPosition.y / cellSize,
        orientation
      )
      wellPlaced = true
      console.log(wellPlaced)
    }

    console.log(playerboard.board)
    // console.log(draggedShip)
  }

  function dragOverPack(e) {
    e.preventDefault()

    const draggedToken = document.querySelector(".dragging")
    const length = parseInt(draggedToken.getAttribute("data-length"))
    const currentX = parseInt(draggedToken.style.left) / cellSize
    const currentY = parseInt(draggedToken.style.top) / cellSize
    const direction = draggedToken.getAttribute("data-direction")
    const shipName = draggedToken.getAttribute("data-name")

    if (this.children.length > 0) return
    playerboard.removeShip(shipName, currentX, currentY, length, direction)
    draggedToken.style.top = 0
    draggedToken.style.left = 0
    draggedToken.style.position = ""
    draggedToken.classList.remove("vertical", "onboard")
    draggedToken.setAttribute("data-direction", "horizontal")
    this.appendChild(draggedToken)

    let draggedShip = playerboard.getShip(shipName)
    draggedShip.left = 0
    draggedShip.top = 0
    draggedShip.direction = "horizontal"
  }

  //switch buttons
  const switchActive = (off, on) => {
    off.classList.remove("active")
    on.classList.add("active")
  }

  const horizontalAxis = () => {
    yAxis.style.backgroundColor = ""
    switchActive(yAxis, xAxis)
    return (orientation = "horizontal")
  }
  const verticalAxis = () => {
    xAxis.style.backgroundColor = ""
    switchActive(xAxis, yAxis)
    return (orientation = "vertical")
  }

  function checkAllTokenPlaced() {
    let shipTokens = document.querySelectorAll("#strategyscreen .token")
    return shipTokens.length === 5
  }

  function playerFieldUi() {
    return `

            <div id="battlefield" class="board w-full">
            <div id="port" class="hidden md:inline-flex flex-col float-left flex-wrap w-52 gap-x-5 gap-y-10 mr-6">
                <div class="carrier-port pack placeable  h-9 ">
                    
                </div>
                <div class="battleship-port pack placeable  h-9 ">
                    
                </div>
                <div class="destroyer-port pack placeable  h-9">
                    
                </div>
                <div class="submarine-port pack placeable  h-9 ">
                    
                    
                </div>
                <div class="patrol-port pack placeable  h-9 ">
                    
                    
                    
                </div>
                
            </div>
            <div id="field" class="flex flex-col justify-items-center">
              <div id="axis-section" class="hidden md:flex gap-4 w-[360px] justify-center mb-4">
                <div id="axis-x" class="btn axis-x px-6 py-1 border border-1 border-blue-600 rounded-lg active">X axis</div>
                <div id="axis-y" class="btn axis-y px-6 py-1 border border-1 border-blue-600 rounded-lg">Y axis</div>
              </div>
              <div id="strategyscreen" class="placeable relative flex w-fit">
                  <canvas id="playerboard" class=" " width="${
                    cellSize * 10
                  }" height="${cellSize * 10}"></canvas>
              </div>
              <div id="cta" class="flex gap-4 w-[360px] justify-center mt-4">
                <div id="randomBTN" class="btn  px-6 py-1 border border-1 border-blue-600 rounded-lg">Random</div>
                <div id="startBTN" class="btn  px-6 py-1 border border-1 border-green-600 rounded-lg play">Start</div>
              </div>
            </div>
            <div id="restartDiv" class="flex gap-4 justify-center mt-4">
                
                <div id="restartBTN" onclick = "location.reload()" class="btn  px-6 py-1 text-white bg-red-600 border border-1 border-red-600 rounded-lg restart">Restart</div>
              </div>

        </div>
        
        `
  }

  function setupPlayerField() {
    const main = getElementById("body-container")
    main.innerHTML = playerFieldUi()
    hideElement(getElementById("restartDiv"))
  }

  //function that removes all events from token
  function removeDragEvents(token) {
    token.removeEventListener("dragstart", dragStart)
    token.removeEventListener("dragend", dragEnd)
    token.setAttribute("draggable", "false")
    token.style.cursor = "default"
  }
})()
