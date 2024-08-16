import { addBanner } from "./sections/banner"

import { addHero } from "./sections/hero"
import { addDetail } from "./sections/detailPage"
import { emptyElement } from "./utilities"
import { addPortfolio } from "./sections/portfolio"

export function addHomepage(e) {
  emptyElement(e)
  addBanner(e)
  addHero(e)
  addPortfolio(e)
  // addDetail(e)
}
