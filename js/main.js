document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("accessToken");

  //Si hay un token, significa que el usuario está autenticado y mostraremos el botón de gestión
  toggleVisibilityByAuth("gestionNavButton", token);
});

/* Funcion que cambia la visibilidad del elemento que le pasamos por parametro */
function toggleVisibilityByAuth(elementId, token) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = token ? "block" : "none";
  }
}
