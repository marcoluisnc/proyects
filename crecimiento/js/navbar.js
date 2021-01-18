window.addEventListener("scroll", navbarFixed);

function navbarFixed() {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("sticky");
    console.log("color");
  }
  if (window.scrollY === 0) {
    header.classList.remove("sticky");
    console.log("sin color");
  }
}
