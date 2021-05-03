//variable para el boton
const buttonTheme = document.querySelector("#theme");
const body = document.querySelector("body");
const formUI = document.querySelector("#form");

//variables html
const navbar = document.querySelector(".navbar");
//eventos
events();
function events() {
  buttonTheme.addEventListener("click", clickCheck);
}
//funciones
function clickCheck(e) {
  //prevenir el evento default
  e.preventDefault();
  if (buttonTheme.classList.contains("btn-dark")) {
    navbar.classList.remove("navbar-light", "bg-light");
    navbar.classList.add("navbar-dark", "bg-dark");
    buttonTheme.textContent = "Activate Light Mode";
    buttonTheme.classList.add("btn-light");
    buttonTheme.classList.remove("btn-dark");
    buttonTheme.textContent = "Activate Light Mode";
    body.classList.add("bg-secondary");
    formUI.classList.add("bg-dark");

    formUI.style.color = "white";
    return;
  }

  if (buttonTheme.classList.contains("btn-light")) {
    navbar.classList.remove("navbar-dark", "bg-dark", "dark");
    navbar.classList.add("navbar-light", "bg-light");
    buttonTheme.classList.remove("btn-light");
    buttonTheme.classList.add("btn-dark");
    body.classList.remove("bg-secondary");
    formUI.classList.remove("bg-dark");
    formUI.style.color = "black";
    buttonTheme.textContent = "Activate Dark Mode";
  }
}
