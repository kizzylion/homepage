import { addBanner } from "./sections/banner";

import { addHero } from "./sections/hero";
import { addDetail } from "./sections/detailPage";
import { emptyElement, getElementById } from "./utilities";
import { addPortfolio } from "./sections/portfolio";
import { addFooter } from "./sections/footerPage";

export function addHomepage(e) {
  emptyElement(e);
  homepageUi(e);
  let home = getElementById("homepage");

  addBanner(home), addHero(home), addPortfolio(home), addFooter(home);
}

function homepageUi(elem) {
  let home = document.createElement("div");
  home.id = "homepage";

  return elem.appendChild(home);
}
