// Obtener servicios del localStorage o usar una lista por defecto
const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

const formServicio = document.getElementById("formServicio");
const nombreInput = document.getElementById("nombreServicio");
const importeInput = document.getElementById("importeServicio");
const descripcionInput = document.getElementById("descripcionServicio");
const tablaBody = document.querySelector("#tabla-servicios tbody");

let editIndex = null;

function renderTabla() {
  tablaBody.innerHTML = "";
  servicios.forEach((servicio, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
          <td>${servicio.nombre}</td>
          <td>$ ${servicio.importe.toFixed(2)}</td>
          <td>${servicio.descripcion}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-warning me-2 editar-btn" data-index="${index}">Editar</button>
            <button class="btn btn-sm btn-danger borrar-btn" data-index="${index}">Borrar</button>
          </td>
        `;
    tablaBody.appendChild(fila);
  });

  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      editarServicio(index);
    });
  });

  document.querySelectorAll(".borrar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      borrarServicio(index);
    });
  });
}

function guardarServicios() {
  localStorage.setItem("servicios", JSON.stringify(servicios));
}

function limpiarFormulario() {
  formServicio.reset();
  editIndex = null;
  formServicio.querySelector('button[type="submit"]').textContent = "Guardar servicio";
}

formServicio.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const importe = parseFloat(importeInput.value);
  const descripcion = descripcionInput.value.trim();

  if (!nombre || isNaN(importe) || importe <= 0 || !descripcion) {
    alert("Por favor completa todos los campos correctamente. El importe debe ser un número mayor a cero.");
    return;
  }

  if (editIndex !== null) {
    servicios[editIndex] = { nombre, importe, descripcion };
  } else {
    servicios.push({ nombre, importe, descripcion });
  }

  guardarServicios();
  renderTabla();
  limpiarFormulario();
});

function editarServicio(index) {
  const servicio = servicios[index];
  nombreInput.value = servicio.nombre;
  importeInput.value = servicio.importe;
  descripcionInput.value = servicio.descripcion;
  editIndex = index;
  formServicio.querySelector('button[type="submit"]').textContent = "Actualizar servicio";
}

function borrarServicio(index) {
  if (confirm(`¿Querés borrar el servicio "${servicios[index].nombre}"?`)) {
    servicios.splice(index, 1);
    guardarServicios();
    renderTabla();
    // Si el formulario está editando ese índice o si está editando otro, limpiamos
    limpiarFormulario();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Solo guardar servicios por defecto si no hay datos en localStorage
  if (!localStorage.getItem("servicios")) {
    guardarServicios();
  }
  renderTabla();
});
