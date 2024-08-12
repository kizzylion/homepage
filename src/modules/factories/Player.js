const { Gameboard } = require("./Gameboard")

class Player {
  constructor(type = "human") {
    this.type = type
    this.gameboard = new Gameboard()
  }

  attack(opponent, x, y) {
    if (this.type === "computer") {
      let [randomX, randomY] = this.getRandomCoordinates()
      opponent.gameboard.receiveAttack(randomX, randomY)
    } else {
      opponent.gameboard.receiveAttack(x, y)
    }
  }

  getRandomCoordinates() {
    const randomX = Math.floor(Math.random() * 10)
    const randomY = Math.floor(Math.random() * 10)

    return [randomX, randomY]
  }
}

module.exports = Player
