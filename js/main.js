/* JS global que va a estar disponible en todos los html */

import { logout } from "./logout.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("accessToken");
  const estaLogeado = !!token; // true si hay token

  cambiarVisibilidadElementoId("navbarGestion", estaLogeado);
  cambiarVisibilidadElementoId("logoutNavItem", estaLogeado);
  cambiarVisibilidadElementoId("loginNavItem", !estaLogeado);

  // Asignar evento al botón de logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", e => {
      e.preventDefault();
      logout();
    });
  }
});

/* Función que cambia la visibilidad del elemento que le pasamos por id */
function cambiarVisibilidadElementoId(elementoId, mostrar) {
  const element = document.getElementById(elementoId);
  if (element) {
    element.classList.toggle("d-none", !mostrar);
  }
}
