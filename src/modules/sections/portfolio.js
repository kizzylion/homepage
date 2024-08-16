import { createPortfolioCard, getElementById } from "../utilities"
import { addDetail } from "./detailPage"

export function addPortfolio(elem) {
  let section = document.createElement("section")
  section.id = "portfolio"

  section.innerHTML = portfolioUi()
  elem.appendChild(section)

  addCardToContainer(getElementById("portfolioContent"))
  addCardToContainer(getElementById("portfolioContent"))
  addCardToContainer(getElementById("portfolioContent"))
  addCardToContainer(getElementById("portfolioContent"))
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

function addCardToContainer(container, title, group, description, year) {
  const card = createPortfolioCard(title, group, description, year)
  container.appendChild(card)
}
