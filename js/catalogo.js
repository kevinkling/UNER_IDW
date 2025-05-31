// Obtener salones del localStorage o usar una lista por defecto
const salones = JSON.parse(localStorage.getItem("salones")) || [
    {
        nombre: "Salón 1",
        medidas: "30mts x 40mts",
        imagen: "../img/salon 1.png"
    },
    {
        nombre: "Salón 2",
        medidas: "15mts x 20mts",
        imagen: "../img/salon 2.png"
    },
    {
        nombre: "Salón 3",
        medidas: "25mts x 20mts",
        imagen: "../img/salon 3.png"
    },
    {
        nombre: "Salón 4",
        medidas: "30mts x 40mts",
        imagen: "../img/salon 4.png"
    }
];

/* Función para renderizar el catálogo */
function renderCatalogo() {
    const container = document.getElementById('contenedor-salones');;
    container.innerHTML = "";

    salones.forEach(salon => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";
        card.innerHTML = `
        <div class="card h-100">
          <img src="${salon.imagen}" class="card-img-top" alt="${salon.nombre}">
          <div class="card-body">
            <h5 class="card-title">${salon.nombre}</h5>
            <p class="card-text">Medidas: ${salon.medidas}</p>
          </div>
        </div>
      `;
        container.appendChild(card);
    });
}

// Guardar los salones por defecto si es la primera vez
if (!localStorage.getItem("salones")) {
    localStorage.setItem("salones", JSON.stringify(salones));
}


renderCatalogo();
