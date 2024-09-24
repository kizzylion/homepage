export function addBanner(elem) {
  let banner = document.createElement("section");
  banner.id = "banner";
  banner.innerHTML = `<div class="section flex relative max-w-7xl mx-auto mt-16 lg:mt-20 px-5 py-5  lg:px-8 lg:py-12">
    
                <div class=" sun absolute grid place-content-center ">
                    <div class="sun-ray "></div>
                    <div class="sun-front"></div>
                </div>
                <div class="textContent flex  w-full"><h1 class="w-full">KIZITO</h1></div>
            </div>`;
  elem.appendChild(banner);
}
