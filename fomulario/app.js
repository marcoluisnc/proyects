//variables
const btnEnviar = document.querySelector(".enviar");
const btnResetear = document.querySelector(".resetear");
//Expresion regular
const er = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
//Variables de inputs
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#textarea");
const form = document.querySelector(".form");

//Ejecutar todas las funciones
eventListener();
function eventListener() {
  //Se ejecutara cuando cargue el dom
  document.addEventListener("DOMContentLoaded", iniciarApplication);
  //validar el formulario
  email.addEventListener("blur", validarForm);
  email.addEventListener("blur", validarMail);
  asunto.addEventListener("blur", validarForm);
  mensaje.addEventListener("blur", validarForm);
  //enviar el form
  btnEnviar.addEventListener("click", enviarMail);
  //resetear form
  btnResetear.addEventListener("click", resetear);
}

function iniciarApplication() {
  btnEnviar.disabled = true;
  btnEnviar.style.cursor = "not-allowed";
  btnEnviar.style.opacity = "0.5";
}
//Validar el form
function validarForm(e) {
  e.preventDefault();
  //eliminar el cudaro de error
  const error = document.querySelector(".error");
  if (error) {
    error.remove();
  }
  if (e.target.value.length > 0) {
    e.target.classList.remove("wrong");
    e.target.classList.add("valid");
  } else {
    e.target.classList.remove("valid");
    e.target.classList.add("wrong");
    mostrarError("Todos los campos son obligatorios");
  }
  //button allowed
  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.style.cursor = "pointer";
    btnEnviar.style.opacity = "1";
  } else {
    btnEnviar.disabled = true;
    btnEnviar.style.cursor = "not-allowed";
    btnEnviar.style.opacity = "0.5";
  }
}
//validar el mail con expresiones regulares
function validarMail(event) {
  if (event.target.type === "email") {
    if (er.test(event.target.value)) {
      event.target.classList.remove("wrong");
      event.target.classList.add("valid");
    } else {
      event.target.classList.remove("valid");
      event.target.classList.add("wrong");
      mostrarError("El email es invalido");
      console.log("invalido");
    }
  }
}
//Funcion que crea un cuadro de dialogo para mostrar error
function mostrarError(mensajeE) {
  const mensajeError = document.createElement("p");
  mensajeError.style.padding = "20px";
  mensajeError.style.border = "3px solid red";
  mensajeError.style.textAlign = "center";
  mensajeError.style.fontWeight = "bold";
  mensajeError.style.background = "#ff8d85";
  mensajeError.style.color = "white";
  mensajeError.style.fontSize = "18px";
  mensajeError.textContent = mensajeE;
  mensajeError.classList.add("error");
  const error = document.querySelectorAll(".error");
  if (error.length === 0) {
    form.appendChild(mensajeError);
  }
}
//enviar mail
function enviarMail(e) {
  e.preventDefault();
  //hacer visible el spinner que carga
  const spinner = document.querySelector(".spinner");
  spinner.style.display = "flex";
  spinner.style.paddingTop = "0";
  //despues de 3segs ocultar spinner y mostrar mensaje de enviado
  setTimeout(() => {
    spinner.style.display = "none";
    const mailSent = document.createElement("p");
    mailSent.style.padding = "20px";
    mailSent.style.border = "3px solid green";
    mailSent.style.textAlign = "center";
    mailSent.style.fontWeight = "bold";
    mailSent.style.background = "#baffc3";
    mailSent.style.fontSize = "18px";
    mailSent.textContent = "Ha sido enviado";
    form.insertBefore(mailSent, spinner);
    //despues de 3segs mas se eliminara el texto
    setTimeout(() => {
      mailSent.remove();
      resetear();
    }, 3000);
  }, 3000);
}
//resetear form
function resetear() {
  form.reset();
  email.classList.remove("valid");
  asunto.classList.remove("valid");
  mensaje.classList.remove("valid");
  iniciarApplication();
}
