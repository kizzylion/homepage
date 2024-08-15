import Typed from "typed.js"

export function getElementById(id) {
  return document.getElementById(id)
}

let typedInstance = null
export function typedMessage(element, array, loop = false, typeSpeed = 50) {
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

export function log(...content) {
  console.log(...content)
}
