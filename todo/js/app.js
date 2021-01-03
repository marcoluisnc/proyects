//variables
const form = document.querySelector("#formulario");
const listaTweet = document.querySelector("#lista-tweets");
let tweets = [];
const btnLimpia = document.querySelector(".borrar");
//event listeners
eventListeners();
function eventListeners() {
  //cuando el usuario agrega otro tweet
  form.addEventListener("submit", agregarTweet);
  //cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearHTML();
  });
  //Borrar todos los tweets
  btnLimpia.addEventListener("click", () => {
    tweets = [];
    crearHTML();
  });
}
//functions
function agregarTweet(e) {
  //textarea donde va a escribir el usuario
  const tweet = document.querySelector("#tweet").value;
  e.preventDefault();
  if (tweet === "") {
    mostrarError("Error, No puede ir una nota vacia:(");
    return; //se evita que se ejuten mas lineas de codigo
  }
  tweetObj = {
    id: Date.now(),
    tweet,
  };
  //añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];
  console.log(tweets);
  //Una vez actualizado el arreglo agregar el html
  crearHTML();
  //reiniciar form cada que envies el texts
  form.reset();
}

//mostrar mensaje de error
function mostrarError(mensaje) {
  const p = document.createElement("p");
  p.style.background = "red";
  p.textContent = mensaje;
  p.style.color = "white";
  p.style.padding = "10px";
  p.style.textAlign = "center";
  p.style.fontWeight = "bold";
  p.classList.add("error");
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    form.appendChild(p);
  }
  //Eliminar alerta despues de 3segs
  setTimeout(() => {
    p.style.display = "none";
  }, 3000);
}
//Muestra la lista de los tweets
function crearHTML() {
  //limpiar HTML
  limpiarHTML();
  //Crear HTML
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "x";
      //funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };
      //Crear la lista de tweets
      const li = document.createElement("li");
      li.innerText = tweet.tweet;

      listaTweet.appendChild(li);
      //asignar boton
      li.appendChild(btnEliminar);
    });
  }
  sincronizarStorage();
}
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
//Elimina el tweet
function borrarTweet(id) {
  //Crea un nuevo arreglo pero esta vez sin el que se le dio click
  tweets = tweets.filter((tweet) => tweet.id !== id);
  // console.log(tweets);
  crearHTML();
}
///limpiar html
function limpiarHTML() {
  while (listaTweet.firstChild) {
    listaTweet.removeChild(listaTweet.firstChild);
  }
}
