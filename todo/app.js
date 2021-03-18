//Variables
let notes = [];
const form = document.querySelector("form");
const input = document.querySelector("#text");
const buttonDel = document.querySelector('input[type="button"]');
const container = document.querySelector(".container");
const app = document.querySelector("#app");
const notesList = document.querySelector("#notes-list ul");

//clases
class UI {
  mostrarMensaje(mensaje, css) {
    const div = document.createElement("div");
    div.textContent = mensaje;
    div.className = `alert alert-${css} mt-5 text-center`;

    const error = document.querySelectorAll(".alert");
    if (error.length === 0) {
      container.insertBefore(div, app);
    }
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
  agregarNota(nota) {
    //Limpiar el primer elemento
    while (notesList.firstChild) {
      notesList.removeChild(notesList.firstChild);
    }
    nota.forEach((note) => {
      //variables
      const li = document.createElement("li");
      const btn = document.createElement("a");
      const { input, id } = note;
      li.textContent = input;
      li.style.listStyle = "none";
      li.className = "alert alert-info ml-0 ";
      btn.dataset.id = id;
      btn.className = "btn btn-danger buttonDel";
      btn.textContent = "X";
      btn.onclick = () => {
        eliminarNota(id);
      };
      li.appendChild(btn);
      notesList.appendChild(li);
    });
    sincronizarStorage();
  }
  eliminarNota(id) {
    notes = notes.filter((note) => note.id !== id);
  }
}

//eventos
eventListeners();
function eventListeners() {
  form.addEventListener("submit", agregarNota);
  buttonDel.addEventListener("click", borrarTodo);

  document.addEventListener("DOMContentLoaded", () => {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    ui.agregarNota(notes);
  });
}

//Declaracion de clase
const ui = new UI();

//funciones
function agregarNota(e) {
  e.preventDefault();
  //Validaciones de input
  if (input.value === "") {
    ui.mostrarMensaje("No puede ir una nota vacia", "danger");
    return;
  }
  //construccion del objeto para el id y el valor del input
  const noteObj = {
    input: input.value,
    id: Date.now(),
  };
  //Spread operator para poder obtener el objeto en un array
  notes = [...notes, noteObj];
  ui.agregarNota(notes);
  form.reset();
}
//Funcion que elimina la nota
function eliminarNota(id) {
  ui.eliminarNota(id);
  ui.agregarNota(notes);
}
//Borrar todo
function borrarTodo() {
  notes = [];
  ui.agregarNota(notes);
}
//localStorage
function sincronizarStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
