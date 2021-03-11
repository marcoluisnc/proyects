//*Variables
let articulos = [];
const gridCards = document.querySelector("#cards");
const items = document.querySelector("#items");
const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
const footer = document.getElementById("footer");
const fragment = document.createDocumentFragment();
//*Clases
class UI {
  construirCarrito(article) {
    //Items es el row de la tabla del carrito
    items.innerHTML = ``;
    //recorrer el arreglo para poder insertar el template en el table
    article.forEach((prod) => {
      templateCarrito.querySelector("#id").textContent = prod.id;
      templateCarrito.querySelector("#nombre").textContent = prod.nombre;
      templateCarrito.querySelector("#cantidad").textContent = prod.cantidad;
      templateCarrito.querySelector("span").textContent =
        prod.precio * prod.cantidad;
      //clonarlo para poder insertarlo en el fragment
      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone);
    });
    items.appendChild(fragment);
    this.carritoFooter(article);
    //Sincronizarlo con Local Storage
    localStorage.setItem("prods", JSON.stringify(article));
  }
  carritoFooter(article) {
    footer.innerHTML = ``;
    //Mostrar este footer si el carrito esta en 0
    if (article.length == 0) {
      footer.innerHTML = `
      <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
      `;
      return;
    }
    //Se debe sumar la cantidad total de productos
    const nCantidadTotal = article.reduce((acumulador, { cantidad }) => {
      return acumulador + cantidad;
    }, 0);
    //Sumar el precio total de todo
    const precioTotal = article.reduce((acc, { cantidad, precio }) => {
      return acc + cantidad * precio;
    }, 0);

    //Asignar el valor de las constantes al templateFooter
    templateFooter.querySelectorAll("td")[0].textContent = nCantidadTotal;
    templateFooter.querySelector(".totalProd").textContent = precioTotal;
    //clonar para añadirlo al HTML
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);
    //Accion de vaciar el carrito
    const btnVaciar = document.querySelector("#vaciar-carrito");
    btnVaciar.addEventListener("click", () => {
      //Vaciar el array original
      articulos = [];
      //LLamar a la funcion del carrito para que se muestre en el HTML
      this.construirCarrito(articulos);
    });
  }
}
const ui = new UI();
//*Eventos
eventListeners();
function eventListeners() {
  gridCards.addEventListener("click", addToCart);
  document.addEventListener("DOMContentLoaded", () => {
    articulos = JSON.parse(localStorage.getItem("prods")) || [];
    ui.construirCarrito(articulos);
  });
}
//*Funciones
function addToCart(e) {
  e.preventDefault();
  //Si el click contiene esta clase
  if (e.target.classList.contains("btn-dark")) {
    //Extraer la info
    const card = e.target.parentElement.parentElement;
    getInfo(card);
  }
}
function getInfo(card) {
  //Crear objeto que almacene toda la info de la card
  const infoCard = {
    img: card.querySelector("img").src,
    nombre: card.querySelector("h5").textContent,
    precio: card.querySelector("span").textContent,
    id: card.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
  };
  //Verificar si existe o no el articulo para aumentar cantidad
  const exist = articulos.some((card) => card.id === infoCard.id);
  if (exist) {
    //Actualizar la cantidad
    const curso = articulos.map((cursos) => {
      //Si el titulo es igual que al que se le dio click
      if (cursos.title === infoCard.title) {
        //Aumentar cantidad
        cursos.cantidad++;
        return cursos;
      } else {
        return cursos;
      }
    });
    //Guardar la info de la cantidad solamente para no duplicar el arreglo y solo aumentar cantidad
    articulos = [...curso];
  } else {
    //Si no se repite la info agregar al array el otro objeto
    articulos = [...articulos, infoCard];
  }
  //Construir el HTML
  ui.construirCarrito(articulos);
}
