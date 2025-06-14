export function logout() {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("username");
  // Si guardaste más cosas como imagen o email, también:
  // sessionStorage.clear(); // O usá removeItem para cada uno
  window.location.href = "../index.html";
}
