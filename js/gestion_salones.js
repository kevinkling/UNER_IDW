import { acortarTexto } from "./utils.js";

const formSalon = document.getElementById("formSalon");
const nombreInput = document.getElementById("titulo");
const medidasInput = document.getElementById("medidas");
const descripcionInput = document.getElementById("descripcion");
const importeInput = document.getElementById("importe");
const direccionInput = document.getElementById("direccion");
const imagenInput = document.getElementById("imagen");
const tablaBody = document.querySelector("#tabla-salones tbody");

let salones = [];
let editIndex = null; // índice del salón que estamos editando (null si es nuevo)

document.addEventListener("DOMContentLoaded", () => {
  const salonesGuardados = localStorage.getItem("salones");
  if (salonesGuardados) {
    salones = JSON.parse(salonesGuardados);
    renderTabla();
  }
});

/* Funcion que muestra la tabla con los salones y los botones de editar y borrar  */
function renderTabla() {
  tablaBody.innerHTML = "";
  salones.forEach((salon, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.medidas}</td>
      <td>${acortarTexto(salon.descripcion, 15) || "-"}</td>
      <td>$${salon.importe?.toLocaleString() || "-"}</td>
      <td>${salon.direccion}</td>
      <td><img src="${salon.imagen}" alt="${salon.nombre}" style="max-width:100px; max-height:80px; object-fit:cover;"></td>
      <td class="text-center">
        <div class="d-flex flex-column align-items-center gap-2">
          <button class="btn btn-sm btn-warning editar-btn" data-index="${index}">Editar</button>
          <button class="btn btn-sm btn-danger borrar-btn" data-index="${index}">Borrar</button>
        </div>
      </td>
    `;
    tablaBody.appendChild(fila);
  });

  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      editarSalon(index);
    });
  });

  document.querySelectorAll(".borrar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      borrarSalon(index);
    });
  });
}

function guardarSalon() {
  localStorage.setItem("salones", JSON.stringify(salones));
}

// Limpiar formulario
function limpiarFormulario() {
  formSalon.reset();
  editIndex = null;
  importeInput.value = "";
  imagenInput.required = true;
  formSalon.querySelector('button[type="submit"]').textContent = "Guardar salón";
}

/* Funcion que espera el evento submit del formulario.
 * Esta funcion decide si el salón es nuevo o si estás editando uno.
 * También convierte la imagen a base64 para guardarla.
 */
formSalon.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const medidas = medidasInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const importe = parseFloat(importeInput.value);
  const direccion = direccionInput.value.trim();
  

  if (!nombre || !medidas || isNaN(importe)) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Si estamos editando..
  if (editIndex !== null) {
    // Si estamos editando y no cargamos nueva imagen, mantenemos la anterior
    if (imagenInput.files.length > 0) {
      // Leer nueva imagen y actualizar
      leerImagen(imagenInput.files[0]).then(imgDataUrl => {
        salones[editIndex] = { nombre, medidas, descripcion, importe, direccion, imagen: imgDataUrl};
        guardarSalon();
        renderTabla();
        limpiarFormulario();
      });
    } else {
      // Mantener imagen actual
      salones[editIndex].nombre = nombre;
      salones[editIndex].medidas = medidas;
      salones[editIndex].descripcion = descripcion;
      salones[editIndex].importe = importe;
      salones[editIndex].direccion = direccion;
      guardarSalon();
      renderTabla();
      limpiarFormulario();
    }
    // Si creamos nuevo..
  } else {
    if (imagenInput.files.length === 0) {
      alert("Por favor selecciona una imagen.");
      return;
    }

    leerImagen(imagenInput.files[0]).then(imgDataUrl => {
      salones.push({ nombre, medidas, descripcion, importe, direccion, imagen: imgDataUrl});
      guardarSalon();
      renderTabla();
      limpiarFormulario();
    });
  }
});

// Función asincrona para leer imagen y devolver DataURL
function leerImagen(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = err => reject(err);
    reader.readAsDataURL(file);
  });
}

function editarSalon(index) {
  const salon = salones[index];
  nombreInput.value = salon.nombre;
  medidasInput.value = salon.medidas;
  descripcionInput.value = salon.descripcion || "";
  importeInput.value = salon.importe ?? "";
  direccionInput.value = salon.direccion;
  imagenInput.value = "";
  imagenInput.required = false;
  editIndex = index;
  formSalon.querySelector('button[type="submit"]').textContent = "Actualizar salón";
}

function borrarSalon(index) {
  if (confirm(`¿Querés borrar el salón "${salones[index].nombre}"?`)) {
    salones.splice(index, 1);
    guardarSalon();
    renderTabla();
    if (editIndex === index) {
      limpiarFormulario();
    }
  }
}
