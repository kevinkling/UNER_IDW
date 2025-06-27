const tbody = document.getElementById("tabla-usuarios-body");
const verMasBtn = document.getElementById("verMasBtn");

let usuarios = [];
let cantidadMostrada = 0;
const CANTIDAD_POR_CLICK = 10;
const ROL_ADMIN = "admin"; 

async function cargarUsuariosPorRol(role) {
  const res = await fetch("https://dummyjson.com/users?limit=100");
  const data = await res.json();
  if (role) {
    usuarios = data.users.filter(user => user.role === role);
  } else {
    usuarios = data.users;
  }
  mostrarUsuarios();
}

function mostrarUsuarios() {
  const usuariosParaMostrar = usuarios.slice(cantidadMostrada, cantidadMostrada + CANTIDAD_POR_CLICK);

  usuariosParaMostrar.forEach(usuario => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${usuario.image}" alt="${usuario.firstName}" width="50" class="rounded-circle"></td>
      <td>${usuario.firstName} ${usuario.lastName}</td>
      <td>${usuario.age}</td>
      <td>${usuario.gender}</td>
      <td>${usuario.username}</td>
      <td>${usuario.email}</td>
      <td>${usuario.company.name}</td>
      <td>${usuario.company.department}</td>
      <td>${usuario.company.title}</td>
      <td>${usuario.company.address.country}</td>
      <td>${usuario.role}</td>
    `;
    tbody.appendChild(fila);
  });

  cantidadMostrada += CANTIDAD_POR_CLICK;

  if (cantidadMostrada >= usuarios.length) {
    verMasBtn.classList.add("d-none");
  }
}

verMasBtn.addEventListener("click", mostrarUsuarios);

document.addEventListener("DOMContentLoaded", cargarUsuariosPorRol(ROL_ADMIN));
