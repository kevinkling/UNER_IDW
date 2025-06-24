async function cargarUsuarios() {
  const token = sessionStorage.getItem('accessToken');
  if (!token) return;

  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();

  const tabla = document.getElementById('tablaUsuarios');
  data.users.forEach(user => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${user.id}</td>
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.email}</td>
      <!-- Mostrar solo datos no sensibles -->
    `;
    tabla.appendChild(fila);
  });
}
