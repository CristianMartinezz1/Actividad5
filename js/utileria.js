/* ============================================================
   utileria.js
   SUSTITUYE este archivo por tu librería utileria.js original.
   Este es un respaldo mínimo con las dos funciones que usa el
   proyecto: validarCorreo y validarPassword (devuelven true/false).
   ============================================================ */

function validarCorreo(correo) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return patron.test(String(correo).trim());
}

function validarPassword(password) {
  // Mínimo 8 caracteres, con al menos una letra y un número
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(String(password));
}
