function validarCorreo(correo) {
  if (typeof correo !== "string") return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo.trim());
}

function soloLetras(texto) {
  if (typeof texto !== "string" || texto.trim() === "") return false;
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  return regex.test(texto);
}

function validarLongitud(numero, maxLongitud) {
  if (numero === null || numero === undefined) return false;
  const digitos = String(numero).replace(/\D/g, "");
  if (digitos === "") return false;
  return digitos.length <= maxLongitud;
}

function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento);
  if (isNaN(nacimiento.getTime())) return NaN;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesActual = hoy.getMonth() - nacimiento.getMonth();
  const diaActual = hoy.getDate() - nacimiento.getDate();

  if (mesActual < 0 || (mesActual === 0 && diaActual < 0)) {
    edad--;
  }
  return edad;
}

function esMayorDeEdad(fechaNacimiento) {
  const edad = calcularEdad(fechaNacimiento);
  if (isNaN(edad)) return false;
  return edad >= 18;
}

function validarPassword(password) {
  if (typeof password !== "string") return false;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneEspecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);
  const longitudValida = password.length >= 8;

  return (
    tieneMayuscula &&
    tieneMinuscula &&
    tieneNumero &&
    tieneEspecial &&
    longitudValida
  );
}

function capitalizarPalabras(texto) {
  if (typeof texto !== "string" || texto.trim() === "") return "";
  return texto
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

function calcularFuerzaPassword(password) {
  if (typeof password !== "string" || password.length === 0) return "Muy débil";

  let puntos = 0;
  if (password.length >= 8) puntos++;
  if (password.length >= 12) puntos++;
  if (/[A-Z]/.test(password)) puntos++;
  if (/[a-z]/.test(password)) puntos++;
  if (/[0-9]/.test(password)) puntos++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password)) puntos++;

  if (puntos <= 1) return "Muy débil";
  if (puntos === 2) return "Débil";
  if (puntos === 3 || puntos === 4) return "Media";
  if (puntos === 5) return "Fuerte";
  return "Muy fuerte";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validarCorreo,
    soloLetras,
    validarLongitud,
    calcularEdad,
    esMayorDeEdad,
    validarPassword,
    capitalizarPalabras,
    calcularFuerzaPassword,
  };
}