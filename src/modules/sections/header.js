import { getElementById } from "../utilities"
import { themeSwitcher, setThemeIcon, fixThemeIcon } from "../themeSwitching"

export function addHeader(elem) {
  let header = document.createElement("header")
  header
  header.innerHTML = headerUi()
  elem.appendChild(header)

  const themeBtn = getElementById("themeSwitcher")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  themeInitializer(prefersDarkScheme, themeBtn)
}

function headerUi() {
  return `
    <div class="section max-w-7xl flex justify-between items-center mx-auto px-4 py-2 lg:px-8 lg:py-4">
                <div id="logo" class="py-2">
                    <h1 class="text-base font-medium text-center">Chukwuma Kizito Iheanacho</h1>
                </div>

                <button id="themeSwitcher" class="px-4 py-2 text-2xl" ></button>
            </div>
  `
}

function themeInitializer(preferredScheme, btn) {
  setThemeIcon(btn)

  btn.addEventListener("click", function () {
    themeSwitcher(btn)
  })
  preferredScheme.onchange = function (event) {
    fixThemeIcon(preferredScheme.matches, btn)
  }
}
