// ---------- Protección de la pantalla ----------
const usuario = sessionStorage.getItem("usuario");
if (!usuario) {
  window.location.href = "login.html";
}

// ---------- Navbar: usuario y cierre de sesión ----------
document.getElementById("nombreUsuario").textContent = usuario;
document.getElementById("avatarUsuario").textContent = usuario.charAt(0).toUpperCase();

document.getElementById("btnSalir").addEventListener("click", () => {
  sessionStorage.removeItem("usuario");
  window.location.href = "login.html";
});

// ---------- Sidebar: abrir / cerrar ----------
const body = document.body;
if (window.innerWidth < 992) body.classList.add("sidebar-hidden");

document.getElementById("btnMenu").addEventListener("click", () => body.classList.toggle("sidebar-hidden"));
document.getElementById("backdropNav").addEventListener("click", () => body.classList.add("sidebar-hidden"));

// ---------- Cambio de vistas ----------
const enlaces = document.querySelectorAll("[data-vista]");
enlaces.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    document.querySelectorAll("main section").forEach((s) => (s.hidden = true));
    document.getElementById("vista-" + enlace.dataset.vista).hidden = false;
    enlaces.forEach((e) => e.classList.remove("active"));
    enlace.classList.add("active");
    if (window.innerWidth < 992) body.classList.add("sidebar-hidden");
  });
});

// ---------- Utilidad de validación visual ----------
function marcar(input, valido) {
  input.classList.toggle("is-invalid", !valido);
  input.classList.toggle("is-valid", valido);
  return valido;
}

// ---------- Formulario de usuario ----------
const formUsuario = document.getElementById("formUsuario");
formUsuario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("uNombre");
  const correo = document.getElementById("uCorreo");
  const pass = document.getElementById("uPassword");

  const ok = [
    marcar(nombre, nombre.value.trim().length >= 3),
    marcar(correo, validarCorreo(correo.value)),   // utileria.js
    marcar(pass, validarPassword(pass.value))      // utileria.js
  ].every(Boolean);

  const aviso = document.getElementById("avisoUsuario");
  if (ok) {
    aviso.textContent = "Usuario «" + nombre.value.trim() + "» guardado correctamente.";
    aviso.hidden = false;
    formUsuario.reset();
    formUsuario.querySelectorAll(".form-control").forEach((i) => i.classList.remove("is-valid"));
  } else {
    aviso.hidden = true;
  }
});

// ---------- Formulario de alumnos ----------
const formAlumno = document.getElementById("formAlumno");
const inputControl = document.getElementById("aControl");
const inputNacimiento = document.getElementById("aNacimiento");
inputNacimiento.max = new Date().toISOString().split("T")[0];

// Solo dígitos en el número de control
inputControl.addEventListener("input", () => {
  inputControl.value = inputControl.value.replace(/\D/g, "");
});

function validarNumeroControl(valor) {
  return /^\d{6}$/.test(valor); // exactamente 6 dígitos
}

function calcularEdad(fechaTexto) {
  const hoy = new Date();
  const nac = new Date(fechaTexto + "T00:00:00");
  let edad = hoy.getFullYear() - nac.getFullYear();
  const aunNoCumple = hoy.getMonth() < nac.getMonth() ||
    (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate());
  if (aunNoCumple) edad--;
  return edad;
}

formAlumno.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("aNombre");

  const fechaOk = inputNacimiento.value !== "" && new Date(inputNacimiento.value) <= new Date();
  const ok = [
    marcar(nombre, nombre.value.trim().length >= 3),
    marcar(inputControl, validarNumeroControl(inputControl.value)),
    marcar(inputNacimiento, fechaOk)
  ].every(Boolean);
  if (!ok) return;

  const edad = calcularEdad(inputNacimiento.value);
  const mayor = edad >= 18;

  // Agregar a la tabla
  document.getElementById("filaVacia")?.remove();
  const fila = document.createElement("tr");
  const celdas = [nombre.value.trim(), inputControl.value, edad + " años"];
  celdas.forEach((texto) => {
    const td = document.createElement("td");
    td.textContent = texto;
    fila.appendChild(td);
  });
  const tdSit = document.createElement("td");
  tdSit.innerHTML = '<span class="badge ' + (mayor ? "badge-ok" : "badge-no") + '">' +
    (mayor ? "Mayor de edad" : "Menor de edad") + "</span>";
  fila.appendChild(tdSit);
  document.getElementById("tablaAlumnos").appendChild(fila);

  // Modal de edad
  const icono = document.getElementById("modalIcono");
  icono.className = "modal-icon " + (mayor ? "ok" : "no");
  icono.innerHTML = mayor ? '<i class="bi bi-check-lg"></i>' : '<i class="bi bi-exclamation-lg"></i>';
  document.getElementById("modalTitulo").textContent = mayor ? "Es mayor de edad" : "Es menor de edad";
  document.getElementById("modalTexto").textContent =
    nombre.value.trim() + " tiene " + edad + " años.";
  new bootstrap.Modal(document.getElementById("modalEdad")).show();

  formAlumno.reset();
  formAlumno.querySelectorAll(".form-control").forEach((i) => i.classList.remove("is-valid"));
});
