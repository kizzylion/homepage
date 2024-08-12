import { cellSize } from "../../bin2/domevents"
import xSrc from "../../asset/images/X.png"
import dotSrc from "../../asset/images/dot.png"
import dot2Src from "../../asset/images/dot2.png"
import shotSoundSrc from "../../asset/sound/shot.mp3"
import hitSoundSrc from "../../asset/sound/hit.mp3"
import missSoundSrc from "../../asset/sound/miss.mp3"
import { createTokenDiv } from "../factories/Ship"
import Typed from "typed.js"
import { info } from "autoprefixer"

//load x and dot images for canvas
const xImage = new Image()
xImage.src = xSrc
const dotImage = new Image()
dotImage.src = dotSrc
const dot2Image = new Image()
dot2Image.src = dot2Src
//load audios
const hitSound = new Audio(hitSoundSrc)
hitSound.playbackRate = 1.5
const shotSound = new Audio(shotSoundSrc)
shotSound.playbackRate = 1.5
const missSound = new Audio(missSoundSrc)
missSound.playbackRate = 1.5

// function that returns an element by id from the dom
export function getElementById(id) {
  return document.getElementById(id)
}
//function that gets all the class
export function querySelectorAll(className) {
  return document.querySelectorAll(`.${className}`)
}
//function that get element by class
function getElementByClass(className) {
  return [...document.getElementsByClassName(className)]
}
// function that hides a element
export function hideElement(element) {
  element.style.display = "none"
}
function showElement(element) {
  element.style.display = "block"
}
export function flexElement(element) {
  element.style.display = "flex"
}
function resetMain() {
  const main = getElementById("body-container")
  main = ""
}

export function createElement(string) {
  return document.createElement(string)
}
export function playerShoot(
  event,
  canvas,
  ctx,
  cellSize,
  board,
  placeable,
  gameboard
) {
  //   if (game_over) return
  //X & Y position of the mouse click relative to the canvas
  //event.client show the click position relative to the viewport
  //cvs.getBoundaringClientRec show the position of the canvas in the view port
  let X = event.clientX - canvas.getBoundingClientRect().x
  let Y = event.clientY - canvas.getBoundingClientRect().y

  //we calculated i & j of the clicked canvas
  let top = Math.floor(Y / cellSize)
  let left = Math.floor(X / cellSize)
  let position = [left, top]
  //check if position have been hit
  if (gameboard.checkIfPositionHasBeenHit(position)) return true

  let id = board[top][left]
  // console.log(`top= ${top} , left = ${left}`, `id =`, id)
  playShotSound()
  return drawOnBoard(id, ctx, left, top, placeable, gameboard)
}

export function computerShoot(opponent, ctx, position, placeable) {
  let randomPosition = position

  while (opponent.checkIfPositionHasBeenHit(Object.values(randomPosition))) {
    console.log("position has been shot")
    randomPosition = randomCell()
  }

  const top = position.y
  const left = position.x

  let id = opponent.board[top][left]

  console.log(`top= ${top} , left = ${left}, id = ${id}`)
  playShotSound()
  return drawOnBoard(id, ctx, left, top, placeable, opponent)
}

function drawOnBoard(result, ctx, left, top, placeable, gameboard) {
  const img = result
    ? xImage
    : gameboard.getOpponentName() === "Computer"
    ? dot2Image
    : dotImage
  ctx.drawImage(img, left * cellSize, top * cellSize, cellSize, cellSize)
  gameboard.receiveAttack(left, top)
  if (result) {
    if (result.isSunk()) {
      const tokenDiv = createTokenDiv(
        result.name,
        result.direction,
        result.length,
        result.left,
        result.top
      )
      tokenDiv.style.position = "absolute"
      tokenDiv.setAttribute("draggable", false)
      tokenDiv.style.cursor = "default"
      tokenDiv.classList.add("bgImg")
      if (result.direction === "vertical") tokenDiv.classList.add("vertical")
      placeable.classList.add("bringFront")
      placeable.appendChild(tokenDiv)
    }
    playHitSound()
    if (gameboard.allShipSunk()) {
      displayGameOverDialogue(gameboard)
    }
    return true
  }

  playMissSound()
  return false
}
export function randomCell() {
  const randomX = Math.floor(Math.random() * 10)
  const randomY = Math.floor(Math.random() * 10)
  return { x: randomX, y: randomY }
}

function playHitSound() {
  hitSound.currentTime = 0
  hitSound.play()
}

function playMissSound() {
  missSound.currentTime = 0
  missSound.play()
}

function playShotSound() {
  shotSound.currentTime = 0
  shotSound.play()
}

function displayGameOverDialogue(gameboard) {
  const dialog = createElement("dialogue")
  dialog.setAttribute("id", "dialogue")
  dialog.setAttribute("class", "dialogue")
  dialog.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "bg-blue-900/80"
  )
  getElementById("body-container").appendChild(dialog)

  dialog.innerHTML = `
        <div class="sm:w-3/4 lg:w-3/4 h-fit p-10 bg-gray-900/60 border bottom-1 border-blue-600/50 rounded-2xl shadow-2xl">
            <h1 class="text-center text-5xl text-blue-100 mb-4 font-semibold">Game Over!</h1>
            <p id="winnerInfo" class="text-center text-2xl text-blue-500 mb-12 mt-10 font-mono"></p>
            <div id="restartBtn" class="flex w-fit px-5 py-2 bg-gray-900 hover:bg-white hover:text-gray-950 rounded-lg  mt-4 shadow-md mx-auto text-white font-thin cursor-pointer">Restart</div>
        </div>
    `

  const winnerMessage = [`${gameboard.getOpponentName()} has won the battle`]
  newMessage("winnerInfo", winnerMessage)
  document.body.classList.add("no-scroll")
  const restartBtn = getElementById("restartBtn")
  restartBtn.addEventListener("click", () => {
    location.reload()
  })
}

let typedInstance = null
export function newMessage(element, array, loop = false, typeSpeed = 50) {
  if (typedInstance) {
    typedInstance.destroy()
    typedInstance = null
  }

  typedInstance = new Typed(getElementById(element), {
    strings: array,
    typeSpeed: typeSpeed,
    backSpeed: 25, // Speed of backspacing
    backDelay: 3000, // Delay before starting to backspace
    loop: loop,
  })
}
