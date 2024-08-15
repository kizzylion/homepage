import chimaSrc from "../../asset/images/kizito.jpg"
import { getElementById, log, typedMessage } from "../utilities"

const chimaPhoto = new Image()
chimaPhoto.src = chimaSrc
export function addHero(elem) {
  let section = document.createElement("section")
  section.id = "hero"
  section.classList.add("relative", "lg:py-20", "lg:px-8")
  section.innerHTML = heroUi()
  elem.appendChild(section)

  checkReduceMotion()
  const imageContainer = getElementById("portrait")
  imageContainer.appendChild(chimaPhoto)
  typedMessage(
    "myName",
    ["HEY, I’M CHUKWUMA IHEANACHO 👋 <br> WELCOME TO MY CREATIVE CORNER"],
    false,
    150
  )
}

function heroUi() {
  return `
       <svg id="backgroundGrid" class="absolute mx-auto" width="1440" height="680" viewBox="0 0 1440 680" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                <mask id="mask0_28_16" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="1440">
                <rect width="1440" height="1440" fill="url(#paint0_radial_28_16)"/>
                </mask>
                <g mask="url(#mask0_28_16)">
                <g clip-path="url(#clip0_28_16)">
                <rect width="1920" height="1920" transform="translate(-240)" fill="#F2F4F7"/>
                <line x1="-240" y1="79.5" x2="1680" y2="79.5" stroke="#D0D5DD"/>
                <line x1="-240" y1="159.5" x2="1680" y2="159.5" />
                <line x1="-240" y1="239.5" x2="1680" y2="239.5" />
                <line x1="-240" y1="319.5" x2="1680" y2="319.5" />
                <line x1="-240" y1="399.5" x2="1680" y2="399.5" />
                <line x1="-240" y1="479.5" x2="1680" y2="479.5" />
                <line x1="-240" y1="559.5" x2="1680" y2="559.5" />
                <line x1="-240" y1="639.5" x2="1680" y2="639.5" />
                <line x1="0.500305" y1="2.18557e-08" x2="0.500221" y2="1920" />
                <line x1="80.5004" y1="2.18557e-08" x2="80.5003" y2="1920" />
                <line x1="160.501" y1="2.18557e-08" x2="160.5" y2="1920" />
                <line x1="240.501" y1="2.18557e-08" x2="240.501" y2="1920" />
                <line x1="320.501" y1="2.18557e-08" x2="320.501" y2="1920" />
                <line x1="400.501" y1="2.18557e-08" x2="400.501" y2="1920" />
                <line x1="480.501" y1="2.18557e-08" x2="480.501" y2="1920" />
                <line x1="560.501" y1="2.18557e-08" x2="560.501" y2="1920" />
                <line x1="640.501" y1="2.18557e-08" x2="640.501" y2="1920" />
                <line x1="720.501" y1="2.18557e-08" x2="720.501" y2="1920" />
                <line x1="800.501" y1="2.18557e-08" x2="800.501" y2="1920" />
                <line x1="880.501" y1="2.18557e-08" x2="880.501" y2="1920" />
                <line x1="960.501" y1="2.18557e-08" x2="960.501" y2="1920" />
                <line x1="1040.5" y1="2.18557e-08" x2="1040.5" y2="1920" />
                <line x1="1120.5" y1="2.18557e-08" x2="1120.5" y2="1920" />
                <line x1="1200.5" y1="2.18557e-08" x2="1200.5" y2="1920" />
                <line x1="1280.5" y1="2.18557e-08" x2="1280.5" y2="1920" />
                <line x1="1360.5" y1="2.18557e-08" x2="1360.5" y2="1920" />
                </g>
                </g>
                </g>
                <defs>
                <radialGradient id="paint0_radial_28_16" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(720) rotate(90) scale(1440 720)">
                <stop/>
                <stop offset="1" stop-opacity="0"/>
                </radialGradient>
                <clipPath id="clip0_28_16">
                <rect width="1920" height="1920" fill="white" transform="translate(-240)"/>
                </clipPath>
                </defs>
                </svg>
                
            <div class="section flex flex-col gap-5 lg:gap-12 lg:flex-row relative max-w-7xl mx-auto px-5 lg:px-8 py-5 lg:gap-16 md:py-10  lg:py-12 lg:rounded-3xl ">
                <div class="textContent flex flex-col  order-2 md:grow-[2] w-full lg:order-1">
                    <div class"textDiv flex flex-col lg:mb-5">
                        <h3 class="workStatus mb-4 mt-6 lg:mb-5"> <span class="open mr-3">OPEN TO WORK</span><span class="mr-1">|</span>Product designer & Web developer</h3>
                        <h1  class="mb-6 "><span id="myName"></span></h1>
                        <h2 class="mb-6 lg:mb-10">Frontend Developer based in Lagos, Nigeria</h2>
                        <p class="max-w-[768px]">Having spent years in product design, I’ve developed a deep understanding of user experience and interface design. This experience fuels my passion for web development, where I can combine my design sensibilities with coding to create seamless, engaging web applications. </p>
                        <div class="scroller mt-4 lg:mt-6" data-speed="fast">
                            <ul class="tag-list scroller__inner">
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JS</li>
                                <li>Photoshop</li>
                                <li>webdev</li>
                                <li>animation</li>
                                <li>UI/UX</li>
                            </ul>
                        </div>
                    
                    </div>
                </div>
                <div class="imageContent order-1 lg:order-1 grow-0 relative flex">
                    <div id="portrait" class="flex p-2 rounded-3xl">
                    </div>
                    <div id="circularText" class="grid place-items-center absolute bottom-[-5%] lg:bottom-[-10%] lg:left-[-20%]">
                        <svg id="circular" class="absolute" width="140" height="140" class="grid place-content-center" viewBox="0 0 400 400">
                            <defs>
                                <linearGradient id="gradientBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#ff7e5f;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#feb47b;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <path class="m-4" id="circularPath" d="
                            M 40 200 a 120, 
                            120 0 1,
                            1 320,
                            0 a 120,120 0 1,
                            1-320,0" fill="none" ></path>
                            <text class="text-white text-center" fill="white">
                                <textPath href="#circularPath" class="text-white">
                                    ✦ CHUKWUMA IHEANACHO ✦ WEB DEVELOPER
                                </textPath>
                            </text>
                        </svg>
                        <div id="initials" class="initials absolute flex size-24 justify-center items-center">
                            <p class="text-center ">CKI</p>
                        </div>
                    </div>
                </div>
            </div>
    `
}

function checkReduceMotion() {
  if (!window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
    addAnimation()
  }
}

function addAnimation() {
  const scrollers = document.querySelectorAll(".scroller")

  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", "true")

    //make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner")
    const scrollerContent = Array.from(scrollerInner.children)
    //for each item in the array, clone it
    //add aria-hidden to it
    //add it into the `.scroller-inner`

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)

      duplicatedItem.setAttribute("aria-hidden", "true")
      scrollerInner.appendChild(duplicatedItem)
    })
  })
}
