import Typed from "typed.js"
import { addDetail } from "./sections/detailPage"

export function getElementById(id) {
  return document.getElementById(id)
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

export function createPortfolioCard(title, group, description, year) {
  const main = getElementById("main")
  const card = document.createElement("article")
  card.classList.add("card")

  card.innerHTML = addCardUi()

  card.addEventListener("click", function (e) {
    addDetail(main)
  })

  function addCardUi() {
    return `
                <header class="card-image flex justify-center items-center aspect-[16/10] w-full rounded-lg mb-4">
                    <div class="imageBox aspect-[16/10] w-3/4 h-auto" role="img" aria-label="Portfolio Image"></div>
                </header>
                <section class="card-content flex justify-between gap-6 items-start">
                    <div class="title">
                        <h2 class="text-nowrap">Portfolio Title</h2>
                        <p>Group</p>
                    </div>
                    <p class="description hidden lg:block">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quisquam omnis dolorem?
                    </p>
                    <time class="year">2024</time>
                </section>
    `
  }

  return card
}
