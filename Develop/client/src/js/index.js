import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Check if Editor class is available
if (typeof Editor === "undefined") {
  loadSpinner();
} else {
  const editor = new Editor();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
