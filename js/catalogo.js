// Obtener salones del localStorage o usar una lista por defecto
const salones = JSON.parse(localStorage.getItem("salones")) || [
    {
        nombre: "Salón Fiesta Alegre",
        medidas: "30mts x 40mts",
        importe: 15000,  // ejemplo en la moneda que uses
        imagen: "../img/salon 1.png"
    },
    {
        nombre: "Salón Pequeños Sueños",
        medidas: "15mts x 20mts",
        importe: 8000,
        imagen: "../img/salon 2.png"
    },
    {
        nombre: "Salón Diversión Total",
        medidas: "25mts x 20mts",
        importe: 12000,
        imagen: "../img/salon 3.png"
    },
    {
        nombre: "Salón Gran Celebración",
        medidas: "30mts x 40mts",
        importe: 16000,
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
