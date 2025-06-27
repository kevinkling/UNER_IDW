import { login } from "./auth.js";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const resultado = await login(username, password);

  const mensaje = document.getElementById("mensaje");

  if (resultado?.error) {
    mensaje.textContent = "Acceso denegado. Solo usuarios ADMIN.";
  } else if (resultado) {
    sessionStorage.setItem("accessToken", resultado.accessToken);
    sessionStorage.setItem("username", resultado.username);
    window.location.href = "../index.html";
  } else {
    mensaje.textContent = "Credenciales incorrectas";
  }
});
