import { login } from "./auth.js";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const resultado = await login(username, password);

  if (resultado) {
    sessionStorage.setItem("accessToken", resultado.accessToken);
    sessionStorage.setItem("username", resultado.username);
    window.location.href = "gestion.html";
  } else {
    document.getElementById("mensaje").textContent = "Credenciales incorrectas";
  }
});
