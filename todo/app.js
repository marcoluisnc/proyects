const form = document.querySelector(".form");
const btnAdd = document.querySelector(".add");
const btnDel = document.querySelector(".delete");
const lista = document.querySelector(".lista");
let notes = [];

//*eventos
eventsListeners();
function eventsListeners() {
  form.addEventListener("submit", agregarNota);
  document.addEventListener("DOMContentLoaded", () => {
    notes = JSON.parse(localStorage.getItem("notas")) || [];
    crearHTML();
  });
  btnDel.addEventListener("click", borrar);
}
//*FUNCIONES
//funcion que agrega la nota
function agregarNota(e) {
  limpiarHTML();
  //se trae la info que se escribio del textarea
  const textarea = document.querySelector("#notes").value;
  e.preventDefault();
  if (textarea === "") {
    mostrarError("Error, no puedes agregar notas vacias:(");
    return; //evita que se ejecute el codigo de abajo
  }
  noteObj = {
    id: Date.now(),
    note: textarea,
  };
  notes = [...notes, noteObj];
  console.log(notes);
  //se crea el html
  crearHTML();
  form.reset();
}
//funcion que borra todo
//funcion que muestra el error
function mostrarError(texto) {
  const p = document.createElement("p");
  p.textContent = texto;
  p.classList.add("mostrar-error");
  p.classList.add("error");
  const error = document.querySelectorAll(".error");
  if (error.length === 0) {
    form.appendChild(p);
  }
  //se eliminara en 3segs
  setTimeout(() => {
    form.removeChild(p);
  }, 3000);
}
//creacion del html
function crearHTML(e) {
  limpiarHTML();
  if (notes.length > 0) {
    notes.forEach((note) => {
      //agregar boton de eliminar al li
      const btnX = document.createElement("a");
      btnX.classList.add("borrar");
      btnX.innerText = "x";
      //funcion que elimina
      btnX.onclick = () => {
        borrarNota(note.id);
      };
      //Crear la lista de notas
      const li = document.createElement("li");
      li.innerText = note.note;
      lista.appendChild(li);
      li.appendChild(btnX);
    });
  }
  sincronizarStorage();
}
//borrar notas por separado
function borrarNota(id) {
  //Se reasigna el arreglo menos el que se le dio click
  notes = notes.filter((note) => note.id !== id);
  crearHTML();
}
//limpiar arreglo de notes para que no se vuelva a agregar
function limpiarHTML() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
}
//borrar todas las notas
function borrar() {
  notes = [];
  crearHTML();
}
//funcion sincronizar en local storage
function sincronizarStorage() {
  localStorage.setItem("notas", JSON.stringify(notes));
}
