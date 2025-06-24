// Obtener servicios del localStorage o usar una lista por defecto
const servicios = JSON.parse(localStorage.getItem("servicios")) || [
  {
    nombre: "Decoración temática",
    importe: 15000.0,
    descripcion: "Globos, pancartas, centros de mesa con personajes infantiles (superhéroes, princesas, animales, etc.).",
  },
  {
    nombre: "Animadores y shows",
    importe: 12000.0,
    descripcion: "Payasos, magos, cuentacuentos, personajes disfrazados, títeres.",
  },
  {
    nombre: "Catering para niños",
    importe: 10000.0,
    descripcion: "Menú especial con snacks saludables, mini pizzas, cupcakes, jugos naturales.",
  },
  {
    nombre: "Tortas y postres personalizados",
    importe: 8000.0,
    descripcion: "Tortas temáticas, gelatinas, mesa de dulces.",
  },
  {
    nombre: "Fotografía y video",
    importe: 9000.0,
    descripcion: "Servicio de fotógrafo profesional o cabina de fotos con accesorios divertidos.",
  },
  {
    nombre: "Juegos y actividades",
    importe: 7000.0,
    descripcion: "Pintura de caras, globoflexia, talleres de manualidades, juegos inflables.",
  },
  {
    nombre: "Mobiliario extra y equipo audiovisual",
    importe: 11000.0,
    descripcion: "Mesas y sillas adicionales, equipo de sonido, micrófonos, proyectores.",
  },
  {
    nombre: "Servicio de limpieza y montaje",
    importe: 5000.0,
    descripcion: "Montaje antes de la fiesta y limpieza después.",
  },
  {
    nombre: "Paquetes de souvenirs",
    importe: 4000.0,
    descripcion: "Bolsitas con regalos para los niños invitados.",
  },
];

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
