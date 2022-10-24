//variables
const carrito = document.querySelector("#carrito"),
  vaciarCarrito = document.querySelector("vaciar-carrito"),
  listaCursos = document.querySelector("#lista-cursos"),
  contenedorCarrito = document.querySelector("#lista-carrito tbody");

let articulosCarrito = [];

//eventListener
eventListener();

function eventListener() {
  listaCursos.addEventListener("click", agregarCurso);

  carrito.addEventListener("click", eliminarCurso);
}

//funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

function leerDatosCurso(curso) {
  let datosCursos = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h3").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === datosCursos.id);

  if (existe) {
    const todosLosCursos = articulosCarrito.map((curso) => {
      if (curso.id === datosCursos.id) {
        curso.cantidad += 1;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...todosLosCursos];
  } else {
    articulosCarrito = [...articulosCarrito, datosCursos];

    carritoHTML(articulosCarrito);
    console.log(articulosCarrito);
  }
}

function carritoHTML(articulos) {
  limpiarHTML();

  articulos.forEach((curso) => {
    const { imagen, titulo, precio, id, cantidad } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="${imagen}"</td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${id}>X</a>
        </td>

    `;
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoSelectedId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => {
      curso.id !== cursoSelectedId;
    });

    carritoHTML();
  }
  console.log(articulosCarrito);
}
