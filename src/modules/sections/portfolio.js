import { createPortfolioCard, getElementById, log } from "../utilities"
import { addDetail } from "./detailPage"
import { listItems } from "./portfolioList"

export function addPortfolio(elem) {
  let section = document.createElement("section")
  section.id = "portfolio"

  section.innerHTML = portfolioUi()
  elem.appendChild(section)

  for (const item of listItems) {
    addCardToContainer(getElementById("portfolioContent"), item)
  }

  log(listItems[0].pic)
}

function portfolioUi() {
  return `
    <div class="section flex flex-col  max-w-7xl mx-auto px-4 py-5  lg:px-8 lg:py-12 gap-5">
      <div id="portfolioHeading" class="py-3 flex w-full">
          <h2 id="portfolioTitle">SELECTED WORK</h2>
      </div>

      <div id="portfolioContent" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-4" md:gap-y-8>
          
      </div>
    </div>
  `
}

function addCardToContainer(container, item) {
  const card = createPortfolioCard(item)
  container.appendChild(card)
}
