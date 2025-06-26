const salones = JSON.parse(localStorage.getItem("salones")) || [];
const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

const salonSelect = document.getElementById("salonSelect");
const imagenSalon = document.getElementById("imagenSalonSeleccionado");
const serviciosCheckboxes = document.getElementById("serviciosCheckboxes");
const importeTotalSpan = document.getElementById("importeTotal");
const formContacto = document.getElementById("formContacto");

// Función para crear opciones del select
function crearOpcionesSelect(items, selectElem) {
  const fragment = document.createDocumentFragment();
  items.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = item.nombre;
    fragment.appendChild(option);
  });
  selectElem.appendChild(fragment);
}

// Función para crear checkboxes de servicios
function crearCheckboxesServicios(servicios, contenedor) {
  const fragment = document.createDocumentFragment();
  servicios.forEach(({ nombre, importe }, index) => {
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
      <input class="form-check-input" type="checkbox" id="servicio${index}" data-importe="${importe}">
      <label class="form-check-label" for="servicio${index}">
        ${nombre} - $${importe.toFixed(2)}
      </label>
    `;
    fragment.appendChild(div);
  });
  contenedor.appendChild(fragment);

  contenedor.querySelectorAll("input[type='checkbox']").forEach(cb => cb.addEventListener("change", actualizarTotal));
}

// Actualiza el importe total
function actualizarTotal() {
  let total = 0;
  const salonSeleccionado = salones[salonSelect.value];

  if (salonSeleccionado && salonSeleccionado.importe) {
    total += Number(salonSeleccionado.importe);
  }

  serviciosCheckboxes.querySelectorAll("input:checked").forEach(cb => {
    total += Number(cb.dataset.importe);
  });

  importeTotalSpan.textContent = `$${total.toFixed(2)}`;
}

function actualizarImagenSalon() {
  const salon = salones[salonSelect.value];
  if (salon && salon.imagen) {
    imagenSalon.src = salon.imagen;
    imagenSalon.classList.remove("d-none");
  } else {
    imagenSalon.classList.add("d-none");
  }
}

function manejarEnvioFormulario(e) {
  e.preventDefault();

  const salon = salones[salonSelect.value];
  const serviciosSeleccionados = Array.from(serviciosCheckboxes.querySelectorAll("input:checked"))
    .map(cb => {
      const idx = cb.id.replace("servicio", "");
      return servicios[idx]?.nombre || "";
    })
    .filter(Boolean);

  const presupuesto = {
    nombre: formContacto.nombre.value.trim(),
    correo: formContacto.correo.value.trim(),
    telefono: formContacto.telefono.value.trim(),
    salon: salon?.nombre || "No seleccionado",
    servicios: serviciosSeleccionados,
    total: importeTotalSpan.textContent,
    fecha: new Date().toLocaleString()
  };

  // Actualizar contenido del modal
  document.getElementById("resumenNombre").textContent = presupuesto.nombre;
  document.getElementById("resumenCorreo").textContent = presupuesto.correo;
  document.getElementById("resumenTelefono").textContent = presupuesto.telefono;
  document.getElementById("resumenSalon").textContent = presupuesto.salon;
  document.getElementById("resumenServicios").textContent = presupuesto.servicios.length ? presupuesto.servicios.join(", ") : "Ninguno";
  document.getElementById("resumenTotal").textContent = presupuesto.total;

  guardarPresupuesto(presupuesto);

  // Modal
  const modal = new bootstrap.Modal(document.getElementById("reservaModal"));
  modal.show();
  setTimeout(() => modal.hide(), 10000);

  
  formContacto.reset();
  salonSelect.selectedIndex = 0;
  actualizarImagenSalon();
  serviciosCheckboxes.querySelectorAll("input").forEach(cb => (cb.checked = false));
  actualizarTotal();
}

function guardarPresupuesto(presupuesto) {
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];
  presupuestos.push(presupuesto);
  localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
}

// Inicialización
function init() {
  crearOpcionesSelect(salones, salonSelect);
  crearCheckboxesServicios(servicios, serviciosCheckboxes);
  actualizarImagenSalon();
  actualizarTotal();

  salonSelect.addEventListener("change", () => {
    actualizarImagenSalon();
    actualizarTotal();
  });

  formContacto.addEventListener("submit", manejarEnvioFormulario);
}

document.addEventListener("DOMContentLoaded", init);
