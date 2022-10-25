const listaCursos = document.querySelector("#lista-cursos"),
  listadoCarrito = document.querySelector("#carrito-listado tbody"),
  vaciarCarritoBtn = document.querySelector("#vaciar-carrito"),
  carrito = document.querySelector("#carrito");

let articulosCarrito = [];

//eventListeners
eventListeners();

function eventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  carrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    articulosCarrito = [];
    cursoHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCursos(cursoSeleccionado);
  }
}

function leerDatosCursos(curso) {
  const infoCurso = {
    titulo: curso.querySelector("h3").textContent,
    precio: curso.querySelector("span").textContent,
    imagen: curso.querySelector("img").src,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const selectedCourses = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad += 1;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...selectedCourses];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  cursoHTML();
}

function cursoHTML() {
  limpiarHTML();
  articulosCarrito.forEach((curso) => {
    const { titulo, imagen, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}">x</a></td>
    `;
    listadoCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (listadoCarrito.firstChild) {
    listadoCarrito.removeChild(listadoCarrito.firstChild);
  }
}

function eliminarCurso(e) {
  e.preventDefault();
  const courseDeleted = e.target.getAttribute("data-id");
  if (e.target.classList.contains("borrar-curso")) {
    articulosCarrito = articulosCarrito.filter(
      (curso) => curso.id !== courseDeleted
    );
    cursoHTML();
  }
}
