// Si ya hay una sesión simulada, entrar directo al sistema
if (sessionStorage.getItem("usuario")) {
  window.location.href = "index.html";
}

const form = document.getElementById("formLogin");
const correo = document.getElementById("correo");
const password = document.getElementById("password");

function marcar(input, errorId, valido, mensaje) {
  input.classList.toggle("is-invalid", !valido);
  input.classList.toggle("is-valid", valido);
  const error = document.getElementById(errorId);
  error.textContent = mensaje;
  error.style.display = valido ? "none" : "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const correoOk = validarCorreo(correo.value);
  marcar(correo, "errCorreo", correoOk, "Escribe un correo válido, por ejemplo nombre@correo.com.");

  const passOk = validarPassword(password.value);
  marcar(password, "errPassword", passOk, "Usa al menos 8 caracteres, con letras y números.");

  if (correoOk && passOk) {
    // Simulación de sesión: se guarda el correo capturado
    sessionStorage.setItem("usuario", correo.value.trim());
    window.location.href = "index.html";
  }
});

document.getElementById("togglePass").addEventListener("click", (e) => {
  const visible = password.type === "text";
  password.type = visible ? "password" : "text";
  e.currentTarget.innerHTML = visible ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
});
