import Typed from "typed.js"
import { addDetail } from "./sections/detailPage"

export function getElementById(id, element = document) {
  return element.getElementById(id)
}
export function querySelector(name, element = document) {
  return element.querySelector(name)
}

export function emptyElement(e) {
  e.innerHTML = ""
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

export function createPortfolioCard(item) {
  const main = getElementById("main")
  const card = document.createElement("article")
  card.classList.add("card")

  card.innerHTML = addCardUi(item)
  const imageBox = querySelector(".imageBox", card)
  for (const image of item.pic) {
    const imgGlass = document.createElement("div")
    imgGlass.classList.add("img-glass")
    imgGlass.appendChild(image)
    imageBox.appendChild(imgGlass)
  }

  card.addEventListener("click", function (e) {
    addDetail(main)
  })

  function addCardUi(item) {
    return `
                <header class="card-image flex justify-center items-center aspect-[16/10] w-full rounded-lg mb-4">
                    <div class="imageBox aspect-[16/10] w-3/4 h-auto relative" role="img" aria-label="Portfolio Image"></div>
                </header>
                <section class="card-content flex justify-between gap-6 items-start">
                    <div class="title flex flex-col flex-nowrap">
                        <h2 class="text-nowrap">${item.title}</h2>
                        <p>${item.group}</p>
                    </div>
                    <p class="description hidden lg:block">
                        ${item.description}
                    </p>
                    <time class="year">${item.year}</time>
                </section>
    `
  }

  return card
}
