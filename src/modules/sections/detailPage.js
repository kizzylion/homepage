import { addHomepage } from "../homepage";
import { emptyElement, getElementById, log, querySelector } from "../utilities";
import $ from "jquery";
import "magnific-popup/dist/magnific-popup.css";
import "magnific-popup";
import { addFooter } from "./footerPage";

export function addDetail(elem, data) {
  emptyElement(getElementById("main"));
  let detail = document.createElement("section");
  detail.id = "cardDetail";
  detail.classList.add("mt-16", "h-fill", "lg:mt-20");
  detail.innerHTML = cardDetailUi(data);

  // elem.innerHTML = ""

  const imageBox = querySelector(".imageBox", detail);
  for (const image of data.pic) {
    const imgGlass = document.createElement("div");
    imgGlass.classList.add("img-glass");
    imgGlass.setAttribute("href", `${image.src}`);
    imgGlass.appendChild(image);
    imageBox.appendChild(imgGlass);
  }
  elem.appendChild(detail);
  addFooter(getElementById("main"));
  addEvents();
}

function addEvents() {
  const main = getElementById("main");
  const back = getElementById("goBack");
  back.addEventListener("click", function (e) {
    addHomepage(main);

    //scroll into view
    const targetSection = getElementById("portfolio");
    targetSection.scrollIntoView({
      behavior: "instant", // Enables instant scrolling
    });
  });

  // For a gallery
  $(".img-glass").magnificPopup({
    // delegate: "a", // Child items selector, by clicking on it popup will open
    type: "image",
    gallery: {
      enabled: true, // Enable gallery mode
    },
  });
}

function cardDetailUi(data) {
  return `
    <div class="section  relative max-w-7xl w-full  mx-auto px-5 lg:px-8 py-5 gap-5 lg:gap-16 md:py-10  lg:py-12 lg:rounded-3xl ">
      <div id="cardDetailHeading" class="py-3 flex w-full px-4 py-2 mb-8">
        <button id="goBack">
          <i class="bi bi-arrow-left mr-2"></i> SEE ALL PROJECTS
        </button>
      </div>
      <div class="content grid grid-cols-1 lg:grid-cols-2 w-full gap-5 lg:gap-8">
        <header class="card-image flex justify-center items-center aspect-[16/10] w-full rounded-lg mb-4">
          <div class="imageBox aspect-[16/10] w-3/4 h-auto relative" role="img" aria-label="Portfolio Image"></div>
        </header>

        <section class="card-content flex flex-col gap-6 items-start lg:my-12">
          <div class=" flex justify-between w-full">
            <div class="title">
              <h2>${data.title}</h2>
              <p>${data.group}</p>
            </div>
          
            <time class="year">${data.year}</time>
          </div>
          

          <p class="description">
            ${data.description}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full" >
            <a  href="${data.repository}" class="btn btn-secondary w-full flex text-base"><i class="bi bi-github mr-3"></i> View Code</a>
            <a  href="${data.liveLink}" class="btn btn-primary w-full flex text-base"> View Project <i class="bi bi-box-arrow-up-right ml-3"></i></a>
          </div>
       </section>
        <footer>
          
        </footer>
      
      </div>
    </div>
  `;
}
