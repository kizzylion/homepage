import battleship1 from "../../asset/images/folioImages/battleship1.jpg";
import battleship2 from "../../asset/images/folioImages/battleship2.png";
import battleship3 from "../../asset/images/folioImages/battleship3.jpg";
import todo1 from "../../asset/images/folioImages/todoapp1.jpg";
import todo2 from "../../asset/images/folioImages/todoapp2.jpg";
import todo3 from "../../asset/images/folioImages/todoapp3.jpg";
import weather1 from "../../asset/images/folioImages/weather1.png";
import weather2 from "../../asset/images/folioImages/weather2.png";
import weather3 from "../../asset/images/folioImages/weather3.png";
import restaurant1 from "../../asset/images/folioImages/restaurant1.png";
import restaurant2 from "../../asset/images/folioImages/restaurant2.png";
import tictac1 from "../../asset/images/folioImages/tictac1.png";
import tictac2 from "../../asset/images/folioImages/tictac2.png";
import calculator1 from "../../asset/images/folioImages/calculator1.png";
import calculator2 from "../../asset/images/folioImages/calculator2.png";
import { log } from "../utilities";

function createImg(src, cls, clsI) {
  if (typeof src === "object") {
    const imageGroup = document.createElement("div");
    imageGroup.classList.add("imageGroup", "relative");
    for (let i = 0; i < src.length; i++) {
      const link = src[i];
      const index = i + 1; // Adding 1 to the index to start from 1 instead of 0

      imageGroup.appendChild(createImg(link, cls, `${cls}-${index}`));
    }
    return imageGroup;
  } else {
    const img = new Image();
    img.classList.add("projectImage", cls, clsI);
    img.src = src;
    img.loading = "lazy";
    return img;
  }
}

export const listItems = [
  {
    title: "Battleship",
    class: "battle",
    group: "Web Game",
    description:
      "A classic Battleship game built with HTML, CSS, and JavaScript. This project demonstrates my ability to create interactive and engaging user experiences.",
    year: 2024,
    picSrc: [[battleship1, battleship2, battleship3]],
    repository: "https://github.com/kizzylion/battleship",
    liveLink: "https://kizzylion.github.io/battleship/",
  },
  {
    title: "Todo App",
    class: "todo",
    group: "Web App",
    description:
      "A functional To-Do app that allows users to manage tasks efficiently. This project showcases my skills in creating user-friendly interfaces and managing state.",
    year: 2024,
    picSrc: [todo1, todo2, todo3],
    repository: "https://github.com/kizzylion/kizztaskmaster",
    liveLink: "https://kizzylion.github.io/kizztaskmaster/",
  },
  {
    title: "Weather App",
    class: "weather",
    group: "Web App",
    description:
      "A dynamic Weather app that fetches real-time data using an API. This project illustrates my ability to work with APIs and handle asynchronous operations.",
    year: 2024,
    picSrc: [weather1, weather2, weather3],
    repository: "https://github.com/kizzylion/weather_app",
    liveLink: "https://kizzylion.github.io/weather_app/",
  },
  {
    title: "Restaurant Site",
    class: "restaurant",
    group: "Website",
    description:
      "A visually appealing Restaurant homepage designed to attract and engage visitors. This project reflects my design sensibilities and attention to detail.",
    year: 2023,
    picSrc: [restaurant1, restaurant2],
    repository: "https://github.com/kizzylion/yokizzy-restaurant",
    liveLink: "https://kizzylion.github.io/yokizzy-restaurant/",
  },
  {
    title: "TicTacToe",
    class: "tic",
    group: "Web Game",
    description:
      "A simple yet challenging Tic-Tac-Toe game that highlights my understanding of game logic and responsive design.",
    year: 2023,
    picSrc: [tictac2, tictac1],
    repository: "https://github.com/kizzylion/tic-tac-toe",
    liveLink: "https://kizzylion.github.io/tic-tac-toe/",
  },
  {
    title: "Calculator",
    class: "calc",
    group: "Web App",
    description: "Ability to create interactive and engaging user experiences",
    year: 2023,
    picSrc: [calculator2, calculator1],
    repository: "https://github.com/kizzylion/calculator",
    liveLink: "https://kizzylion.github.io/calculator/",
  },
];

for (const item of listItems) {
  const cls = item.class;
  item.pic = item.picSrc.map((itemSrc, index) =>
    createImg(itemSrc, cls, `${cls}-${index + 1}`)
  );
}
