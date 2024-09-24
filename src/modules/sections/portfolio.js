import { createPortfolioCard, getElementById, log } from "../utilities";
import { addDetail } from "./detailPage";
import { listItems } from "./portfolioList";

export function addPortfolio(elem) {
  let section = document.createElement("section");
  section.id = "portfolio";

  section.innerHTML = portfolioUi();
  elem.appendChild(section);

  for (const item of listItems) {
    addCardToContainer(getElementById("portfolioContent"), item);
  }

  // log(listItems[0].pic)
  cardAnimation(".card", "in-view");
}

function portfolioUi() {
  return `
    <div class="section flex flex-col  max-w-7xl mx-auto px-4 py-5  lg:px-8 lg:py-12 gap-5">
      <div id="portfolioHeading" class="py-3 flex w-full">
          <h2 id="portfolioTitle">SELECTED WORK</h2>
      </div>

      <div id="portfolioContent" class="portfolioContent w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-4" md:gap-y-8>
          
      </div>
    </div>
  `;
}

function addCardToContainer(container, item) {
  const card = createPortfolioCard(item);
  container.appendChild(card);
}

function cardAnimation(allElementClass, inViewClass) {
  // Select all the cards
  const cards = document.querySelectorAll(allElementClass);

  // Create an IntersectionObserver to detect when the cards enter the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the 'in-view' class to the card when it enters the viewport
        entry.target.classList.add(inViewClass);
      } else {
        entry.target.classList.remove(inViewClass);
      }
    });
  });

  // Observe each card
  cards.forEach((card) => {
    observer.observe(card);
  });
}
