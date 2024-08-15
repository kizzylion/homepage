//Select the button

import { getElementById } from "./utilities"

//check for dark mode preference at the OS level
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
let currentTheme
export function setThemeIcon(themeIcon) {
  if (prefersDarkScheme.matches) {
    themeIcon.innerHTML = '<i class="bi bi-moon-fill"></i>'
  } else {
    themeIcon.innerHTML = '<i class="bi bi-sun-fill"></i>'
  }
  //Get the user's theme preference from the local storage, if it's available
  currentTheme = localStorage.getItem("theme")

  //if user's theme preference in localStorage is dark ...
  if (currentTheme === "dark") {
    //... lets toggle the .dark-theme class on the body
    document.body.classList.toggle("dark-theme")
    themeIcon.innerHTML = '<i class="bi bi-moon-fill"></i>'
  } else if (currentTheme === "light") {
    // ... let's toggle the .light-theme class on the body
    document.body.classList.toggle("light-theme")
    themeIcon.innerHTML = '<i class="bi bi-sun-fill"></i>'
  }
}

//Add an event listener to the button
export function themeSwitcher(themeIcon) {
  let theme
  //if user's OS preference is dark and matches our .dark-mode class ...
  if (prefersDarkScheme.matches) {
    //... toggle the .light-theme class on the body
    document.body.classList.toggle("light-theme")

    //... but use .dark-mode if the .light-mode is already on the body,
    theme = document.body.classList.contains("light-theme") ? "light" : "dark"
    document.body.classList.contains("light-theme")
      ? (themeIcon.innerHTML = '<i class="bi bi-sun-fill"></i>')
      : (themeIcon.innerHTML = '<i class="bi bi-moon-fill"></i>')
  } else {
    //... otherwise, let's do the same thing, but for .dark-mode
    document.body.classList.toggle("dark-theme")

    theme = document.body.classList.contains("dark-theme") ? "dark" : "light"
    document.body.classList.contains("light-theme")
      ? (themeIcon.innerHTML = '<i class="bi bi-moon-fill">')
      : (themeIcon.innerHTML = '<i class="bi bi-sun-fill">')
  }

  //set the user's theme preference in localStorage to keep using it
  localStorage.setItem("theme", theme)
}

//anytime the preferred scheme changes automatically, fix the icon

export function fixThemeIcon(condition, themeIcon) {
  const currentTheme = localStorage.getItem("theme")
  if (currentTheme) return

  if (condition) {
    themeIcon.innerHTML = '<i class="bi bi-moon-fill"></i>'
  } else {
    themeIcon.innerHTML = '<i class="bi bi-sun"></i>'
  }
}
