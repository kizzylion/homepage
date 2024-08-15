import { addBanner } from "./sections/banner"
import { addHeader } from "./sections/header"
import { addHero } from "./sections/hero"
import { getElementById } from "./utilities"

const main = getElementById("main")
export function addHomepage() {
  addHeader(main)
  addBanner(main)
  addHero(main)
}
