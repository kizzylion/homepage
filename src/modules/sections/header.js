import { getElementById } from "../utilities";
import { themeSwitcher, setThemeIcon, fixThemeIcon } from "../themeSwitching";

export function addHeader(elem) {
  let header = document.createElement("header");
  // header
  header.innerHTML = headerUi();
  header.id = "header";
  header.classList.add("z-60");
  elem.appendChild(header);

  const themeBtn = getElementById("themeSwitcher");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  logoEvent();
  themeInitializer(prefersDarkScheme, themeBtn);
}

function headerUi() {
  return `
    <div class="section max-w-7xl flex  items-center mx-auto px-4 py-2 lg:px-8 lg:py-4">
                <div id="logo" class="py-2">
                    <h1 class="text-base font-medium text-center">Chukwuma Kizito Iheanacho</h1>
                </div>
                <a  href="https://github.com/kizzylion" class="inline-block ml-auto mr:1 md:mr-2 text-2xl"><i class="bi bi-github"></i> </a>
                <button id="themeSwitcher" class="px-4 py-2 text-2xl" ></button>
            </div>
  `;
}

function logoEvent() {
  // add event listener to logo. onclick, reload window
  const logo = getElementById("logo");
  logo.addEventListener("mouseover", (e) => {
    //change cursor to pointer
    logo.style.cursor = "pointer";
  });
  logo.addEventListener("click", (e) => {
    window.location.reload();
  });
}

function themeInitializer(preferredScheme, btn) {
  setThemeIcon(btn);

  btn.addEventListener("click", function () {
    themeSwitcher(btn);
  });
  preferredScheme.onchange = function (event) {
    fixThemeIcon(preferredScheme.matches, btn);
  };
}
