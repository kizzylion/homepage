export function addFooter(elem) {
  let footer = document.createElement("footer")
  footer.classList.add("mt-5")
  footer.id = "footer"
  footer.innerHTML = footerUi()
  elem.appendChild(footer)
}

function footerUi() {
  return `
            <div class="section max-w-7xl flex  items-center mx-auto px-4 py-8 lg:px-8 ">
                <div class="w-full">
                    <p class="text-center mx-auto text-md md:text-lg">
                        <a type="Mail" href="mailto:kztchm@gmail.com">Mail</a> / <a href="https://www.linkedin.com/in/chukwuma-iheanacho-957908155">Linkedin</a> / <a href="https://x.com/chmkzt?s=21&t=KchpXnPpkOuGqEEwyvO-BQ">X(twitter)</a>
                    </p>
                </div>
            </div>
        `
}
