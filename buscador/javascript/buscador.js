const marca = document.querySelector("#marca");
const tipo = document.querySelector("#tipo");
const minimo = document.querySelector("#precio-min");
const maximo = document.querySelector("#precio-max");
const result = document.querySelector(".resultado");
const tbody = document.querySelector("tbody");
//Objeto con los datos de los select
const datosSelect = {
  marca: "",
  tipo: "",
  minimo: "",
  maximo: "",
};
//events
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});
//Events listeners para selects
marca.addEventListener("change", (e) => {
  datosSelect.marca = e.target.value;
  filtrarProd();
});
tipo.addEventListener("change", (e) => {
  datosSelect.tipo = e.target.value;
  filtrarProd();
});
minimo.addEventListener("change", (e) => {
  datosSelect.minimo = parseInt(e.target.value);
  filtrarProd();
});
maximo.addEventListener("change", (e) => {
  datosSelect.maximo = parseInt(e.target.value);
  console.log(typeof maximo);
  filtrarProd();
});

//functions
function mostrarProductos(productos) {
  limpiarHTML();
  productos.forEach((prod) => {
    const { marca, tipo, precio } = prod;
    const prodHTML = document.createElement("tr");
    prodHTML.innerHTML = `
       <td>${marca}</td>
       <td>${tipo}</td> 
       <td>$${precio}</td> 
    `;
    prodHTML.style.textAlign = "center";
    tbody.appendChild(prodHTML);
  });
}
function limpiarHTML() {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}
function filtrarProd() {
  limpiarHTML();
  const resultado = productos
    .filter(filtrarMarca)
    .filter(filtrarTipo)
    .filter(filtrarMin)
    .filter(filtrarMax);
  if (resultado.length) {
    mostrarProductos(resultado);
  } else {
    noResult();
  }
}
function noResult() {
  const p = document.createElement("div");
  p.classList.add("error");
  p.textContent =
    "NO HAY RESULTADOS CON SU BUSQUEDA, INTENTA CON OTRO TIPO DE BUSQUEDA";
  result.appendChild(p);
}
function filtrarMarca(producto) {
  const { marca } = datosSelect;
  if (marca) {
    return producto.marca === marca;
  } else {
    return producto;
  }
}
function filtrarTipo(producto) {
  const { tipo } = datosSelect;
  if (tipo) {
    return producto.tipo === tipo;
  } else {
    return producto;
  }
}
function filtrarMin(producto) {
  const { minimo } = datosSelect;
  if (minimo) {
    return producto.precio >= minimo;
  } else {
    return producto;
  }
}
function filtrarMax(producto) {
  const { maximo } = datosSelect;
  if (maximo) {
    return producto.precio <= maximo;
  } else {
    return producto;
  }
}
