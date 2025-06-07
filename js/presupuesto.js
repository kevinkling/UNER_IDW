document.addEventListener('DOMContentLoaded', () => {
    const salonSelect = document.getElementById('salon');
    const resultado = document.getElementById('resultado');
  
    const salonesGuardados = JSON.parse(localStorage.getItem('salones')) || [];
  
    // Agregar opciones al <select> desde localStorage
    salonesGuardados.forEach((salon, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${salon.nombre} ($${(10000 + index * 5000).toLocaleString()} base)`; // Precios arbitrarios por ahora
      salonSelect.appendChild(option);
    });
  
    // Evento submit del formulario
    document.getElementById('formPresupuesto').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const salonIndex = salonSelect.value;
      const horaInicio = document.getElementById('horaInicio').value;
      const horaFin = document.getElementById('horaFin').value;
  
      if (salonIndex === "") {
        alert("Seleccioná un salón.");
        return;
      }
  
      const inicio = parseInt(horaInicio.split(':')[0]);
      const fin = parseInt(horaFin.split(':')[0]);
      const duracion = Math.max(0, fin - inicio);
  
      if (duracion <= 0) {
        alert('La hora de fin debe ser mayor que la de inicio');
        return;
      }
  
      // Precio base por salón (podés hacer esto dinámico si guardás también precios)
      const precioBase = 10000 + salonIndex * 5000;
  
      let total = precioBase + duracion * 1000;
  
      if (document.getElementById('katering').checked) total += 5000;
      if (document.getElementById('musica').checked) total += 4000;
      if (document.getElementById('animacion').checked) total += 3000;
  
      resultado.classList.remove('d-none');
      resultado.innerHTML = `
        <strong>Presupuesto estimado:</strong> $${total.toLocaleString()}<br>
        <strong>Duración:</strong> ${duracion} hora(s)<br>
        <strong>Salón elegido:</strong> ${salonesGuardados[salonIndex].nombre}
      `;
    });
  });
  