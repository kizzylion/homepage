class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
    this.direction = "horizontal"
    this.hits = 0
    this.sunk = false
    this.top = null
    this.left = null
  }

  hit() {
    this.hits++
  }

  isSunk() {
    this.sunk = this.hits >= this.length
    return this.sunk
  }

  shipUi() {
    const shipPort = document.querySelector(`.${this.name}-port`)

    if (this.top === 0 || this.top)
      shipPort.appendChild(
        createTokenDiv(
          this.name,
          this.direction,
          this.length,
          this.left,
          this.top
        )
      )
    else
      shipPort.appendChild(
        createTokenDiv(
          this.name,
          this.direction,
          this.length,
          this.left,
          this.top
        )
      )
    // return (shipPort.innerHTML = `<div data-name="${this.name}" data-direction="horizontal" data-length="${this.length}" draggable="true" class="${this.name} token"></div>`)
  }
}

module.exports = { Ship, createTokenDiv }

function createTokenDiv(name, direction, length, left, top) {
  // Create a new div element
  const div = document.createElement("div")

  // Set the attributes
  div.setAttribute("data-name", name)
  div.setAttribute("data-direction", direction)
  div.setAttribute("data-length", length)
  div.setAttribute("draggable", "true")
  // div.setAttribute("width", `${length * 36}px`)

  // Set the class
  div.className = `${name} token`

  // Set the style
  div.style.left = `${left}px`
  div.style.top = `${top}px`

  return div
}
