const Ship = require("./Ship")
const { Gameboard } = require("./Gameboard")
const Player = require("./Player")

//Testing the Ship initialization
test("ship initializes correctly", function () {
  const ship = new Ship("cruiser", 5)
  expect(ship.length).toBe(5)
  expect(ship.hits).toBe(0)
  expect(ship.sunk).toBe(false)
})

//Testing the 'hit' method
test("ship registers the hit correctly", () => {
  const ship = new Ship("cruiser", 5)
  ship.hit()
  expect(ship.hits).toBe(1)
  ship.hit()
  expect(ship.hits).toBe(2)
})

//Testing the 'isSunk' method
test("ship registers the isSunk correctly", () => {
  const ship = new Ship("cruiser", 3)
  expect(ship.isSunk()).toBe(false)
  ship.hit()
  ship.hit()
  expect(ship.isSunk()).toBe(false)
  ship.hit()
  expect(ship.isSunk()).toBe(true)
})

//Testing the sunk state after hit
test("ship updates sunk state", () => {
  const ship = new Ship("cruiser", 2)
  ship.hit()
  expect(ship.isSunk()).toBe(false)
  ship.hit()
  expect(ship.isSunk()).toBe(true)
  expect(ship.sunk).toBe(true)
})

//Testing Gameboard Initialization

test("gameboard initializes completely", () => {
  const gameboard = new Gameboard()
  expect(gameboard.ships.length).toBe(5)
  expect(gameboard.missedShots.length).toBe(0)
  expect(gameboard.board.length).toBe(10)
  expect(gameboard.board[0].length).toBe(10)
})

//testing 'placeShip' Method
test("places ship correctly", () => {
  const gameboard = new Gameboard()
  const ship = new Ship("submarine", 3)

  gameboard.placeShip(ship, 0, 0, "horizontal")

  expect(gameboard.board[0][0]).toMatchObject(ship)
  expect(gameboard.board[0][1]).toMatchObject(ship)
  expect(gameboard.board[0][2]).toMatchObject(ship)
})

//testing the 'receiveAttack' Method
test("receive attack correctly", () => {
  const gameboard = new Gameboard()
  const ship = new Ship("submarine", 3)

  gameboard.placeShip(ship, 0, 0, "vertical")
  gameboard.receiveAttack(0, 0)
  expect(ship.hits).toBe(1)
  gameboard.receiveAttack(1, 1)
  expect(gameboard.missedShots.length).toBe(1)
  expect(gameboard.missedShots).toContainEqual([1, 1])
})

//testing the 'allShipSunk' Method
test("reports all ships sunk correctly", () => {
  const gameboard = new Gameboard()
  const ship1 = new Ship("patrol", 2)
  const ship2 = new Ship("destroyer", 3)

  gameboard.placeShip(ship1, 0, 0, "horizontal")
  gameboard.placeShip(ship2, 1, 1, "vertical")

  gameboard.receiveAttack(0, 0)
  gameboard.receiveAttack(1, 0)
  expect(gameboard.allShipSunk()).toBe(false)
  expect(ship1.isSunk()).toBe(true)

  gameboard.receiveAttack(1, 1)
  gameboard.receiveAttack(1, 2)
  expect(ship2.isSunk()).toBe(false)

  gameboard.receiveAttack(1, 3)
  expect(ship2.isSunk()).toBe(true)
  expect(gameboard.allShipSunk()).toBe(false)
})

//Testing the Player Class

test("player initializes correctly", () => {
  const player = new Player()

  expect(player.type).toBe("human")
  expect(player.gameboard).toBeDefined()
  expect(player.gameboard.ships.length).toBe(5)
})

test("Computer initializes correctly", () => {
  const player = new Player("computer")

  expect(player.type).toBe("computer")
  expect(player.gameboard).toBeDefined()
  expect(player.gameboard.ships.length).toBe(5)
})

//Test the Attack Method for Human Player

test("human player attacks correctly", () => {
  const player1 = new Player()
  const compPlayer = new Player("computer")

  const ship = new Ship("destroyer", 3)
  compPlayer.gameboard.placeShip(ship, 0, 0, "horizontal")

  player1.attack(compPlayer, 0, 0)
  player1.attack(compPlayer, 0, 5)

  expect(ship.hits).toBe(1)

  expect(compPlayer.gameboard.missedShots.length).toBe(1)
  expect(compPlayer.gameboard.missedShots).toContainEqual([0, 5])
})

//Testing the Attack Method for Computer Player

test("computer Player attacks correctly", () => {
  const comPlayer = new Player("computer")
  const player1 = new Player()
  const ship = new Ship(3)

  player1.gameboard.placeShip(ship, 1, 1, "vertical")
  comPlayer.attack(player1, 1, 1)

  // Since the attack is random, we just check if either hits or missed shots increased
  expect(ship.hits + player1.gameboard.missedShots.length).toBe(1)
})

//Testing the Random Co-ordinate method
test("computer player generates random co-ordinates correctly", () => {
  const comPlayer = new Player("computer")
  let [x, y] = comPlayer.getRandomCoordinates()

  expect(x).toBeGreaterThanOrEqual(0)
  expect(x).toBeLessThanOrEqual(10)
  expect(y).toBeGreaterThanOrEqual(0)
  expect(y).toBeLessThanOrEqual(10)
})
