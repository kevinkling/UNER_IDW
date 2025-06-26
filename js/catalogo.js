const salones = JSON.parse(localStorage.getItem("salones")) || [];

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

renderCatalogo();
