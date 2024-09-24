import "../style/style.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { addHeader } from "./sections/header";
import { addHomepage } from "./homepage";
import { getElementById } from "./utilities";

const body = document.body;
addHeader(body);

const main = getElementById("main");
addHomepage(main);
