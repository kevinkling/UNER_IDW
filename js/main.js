/* JS global que va a estar disponible en todos los html */

import { logout } from "./logout.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("accessToken");
  const estaLogeado = !!token; // true si hay token

  inicializarDatos();

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

// TODO: Hacer algun booleano para saber si es la primera vez que se carga la página y así inicializar los datos
function inicializarDatos() {
  const salones = JSON.parse(localStorage.getItem("salones")) || [];
  if (salones.length === 0) {
    const salonesPorDefecto = [
      {
        nombre: "Salón Fiesta Alegre",
        medidas: "30mts x 40mts",
        importe: 15000,
        imagen: "../img/salon 1.png",
        descripcion: "Espacio amplio con pelotero, inflables y zona de padres.",
        direccion: "Calle Falsa 123, Ciudad",
      },
      {
        nombre: "Salón Pequeños Sueños",
        medidas: "15mts x 20mts",
        importe: 8000,
        imagen: "../img/salon 2.png",
        descripcion: "Ideal para eventos pequeños con juegos interactivos.",
        direccion: "Av. Siempre Viva 742, Ciudad",
      },
      {
        nombre: "Salón Diversión Total",
        medidas: "25mts x 20mts",
        importe: 12000,
        imagen: "../img/salon 3.png",
        descripcion: "Cuenta con castillo inflable y sector de mesas exteriores.",
        direccion: "Boulevard Central 456, Ciudad",
      },
      {
        nombre: "Salón Gran Celebración",
        medidas: "30mts x 40mts",
        importe: 16000,
        imagen: "../img/salon 4.png",
        descripcion: "El salón más grande, con múltiples juegos y escenario.",
        direccion: "Ruta 9 km 20, Ciudad",
      },
    ];
    localStorage.setItem("salones", JSON.stringify(salonesPorDefecto));
  }

  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  if (servicios.length === 0) {
    const serviciosPorDefecto = [
      {
        nombre: "Decoración temática",
        importe: 15000.0,
        descripcion: "Globos, pancartas, centros de mesa con personajes infantiles (superhéroes, princesas, animales, etc.).",
      },
      {
        nombre: "Animadores y shows",
        importe: 12000.0,
        descripcion: "Payasos, magos, cuentacuentos, personajes disfrazados, títeres.",
      },
      {
        nombre: "Catering para niños",
        importe: 10000.0,
        descripcion: "Menú especial con snacks saludables, mini pizzas, cupcakes, jugos naturales.",
      },
      {
        nombre: "Tortas y postres personalizados",
        importe: 8000.0,
        descripcion: "Tortas temáticas, gelatinas, mesa de dulces.",
      },
      {
        nombre: "Fotografía y video",
        importe: 9000.0,
        descripcion: "Servicio de fotógrafo profesional o cabina de fotos con accesorios divertidos.",
      },
      {
        nombre: "Juegos y actividades",
        importe: 7000.0,
        descripcion: "Pintura de caras, globoflexia, talleres de manualidades, juegos inflables.",
      },
      {
        nombre: "Mobiliario extra y equipo audiovisual",
        importe: 11000.0,
        descripcion: "Mesas y sillas adicionales, equipo de sonido, micrófonos, proyectores.",
      },
      {
        nombre: "Servicio de limpieza y montaje",
        importe: 5000.0,
        descripcion: "Montaje antes de la fiesta y limpieza después.",
      },
      {
        nombre: "Paquetes de souvenirs",
        importe: 4000.0,
        descripcion: "Bolsitas con regalos para los niños invitados.",
      }
    ];
    localStorage.setItem("servicios", JSON.stringify(serviciosPorDefecto));
  }
}
