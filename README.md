<div align="center">

# 🎓 Control Escolar · Login 

### Actividad 5 · Programación Web

**Instituto Tecnológico de Oaxaca**

| Integrantes | |
|---|---|
| Martínez Pacheco Cristian | |
| Mendoza Lucero Hasiel Isaí | |

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?logo=bootstrap&logoColor=white)

</div>

---

## 📌 Descripción breve

**Control Escolar** es un proyecto web de dos pantallas que simula el acceso a un sistema escolar. El usuario inicia sesión en `login.html` y, si sus datos son válidos, entra a `index.html`, donde encuentra un **sidebar**, un **navbar con su usuario** y formularios para registrar usuarios y alumnos. Al guardar un alumno, un **modal** indica si es mayor o menor de edad.

Está hecho con **HTML, CSS y JavaScript** y usa **Bootstrap 5** como framework de estilos. No requiere backend: la sesión se simula con `sessionStorage`.

---

## 📑 Contenido

1. [Explicación y documentación](#1--explicación-y-documentación)
2. [Proceso de creación](#2--proceso-de-creación)
3. [Capturas del flujo completo](#3--capturas-del-flujo-completo)
4. [Cómo usarlo](#4--cómo-usarlo)
5. [Estructura del proyecto](#5--estructura-del-proyecto)

---

## 1. 📖 Explicación y documentación

### 1.1 Framework CSS utilizado

Usamos **Bootstrap 5.3.3**, cargado por CDN (no hay que instalar nada):

| Recurso | Para qué lo usamos |
|---|---|
| **Bootstrap 5.3.3 (CSS)** | Cuadrícula (`row`, `col-lg-6`), formularios (`form-control`, `invalid-feedback`), botones, tablas, dropdown y modal. |
| **Bootstrap 5.3.3 (JS bundle)** | Componentes interactivos de `index.html`: `collapse` (submenú del sidebar), `dropdown` (menú del usuario) y `modal`. |
| **Bootstrap Icons 1.11.3** | Íconos del sidebar, navbar, formularios y modal. |
| **Google Fonts · Figtree** | Tipografía de todo el sistema. |
| **`css/styles.css`** | Personalización propia: paleta **verde jade** con variables CSS (`--jade-900`, `--jade-700`...), botón `.btn-jade`, layout del login, sidebar y navbar. |

> `login.html` solo carga el CSS de Bootstrap porque no necesita componentes interactivos; `index.html` carga además el JS bundle.


### 1.3 Cómo se pasa el nombre de usuario del login al navbar

Las dos pantallas son archivos distintos, así que no comparten variables de JavaScript. Para pasar el dato usamos **`sessionStorage`**, que guarda información mientras la pestaña del navegador siga abierta.

**① En `login.js`: se guarda el usuario al iniciar sesión**

```js
if (correoOk && passOk) {
  sessionStorage.setItem("usuario", correo.value.trim());
  window.location.href = "index.html";
}
```

**② En `app.js`: se lee y se muestra en el navbar**

```js
const usuario = sessionStorage.getItem("usuario");
if (!usuario) {
  window.location.href = "login.html";   // sin sesión → de vuelta al login
}

document.getElementById("nombreUsuario").textContent = usuario;
document.getElementById("avatarUsuario").textContent = usuario.charAt(0).toUpperCase();
```

**③ En `index.html`: los elementos que reciben el dato**

```html
<span class="avatar" id="avatarUsuario">U</span>
<span id="nombreUsuario">Usuario</span>
```

| Paso | Archivo | Qué ocurre |
|---|---|---|
| 1 | `login.js` | `setItem("usuario", correo)` guarda el correo capturado. |
| 2 | `app.js` | `getItem("usuario")` recupera el valor al cargar `index.html`. |
| 3 | `app.js` | Se escribe en `#nombreUsuario` y la **inicial** en el avatar `#avatarUsuario`. |
| 4 | `app.js` | Al salir, `removeItem("usuario")` borra la sesión. |

### 1.4 Métodos principales

#### `js/utileria.js` — validaciones reutilizables

| Función | Qué hace | Usada en |
|---|---|---|
| `validarCorreo(correo)` | `true` si el texto tiene formato de correo válido (regex). | Login y formulario de usuario |
| `validarPassword(password)` | `true` si tiene **mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial**. | Login y formulario de usuario |
| `soloLetras(texto)` | `true` si solo contiene letras y espacios (acepta acentos y ñ). | Disponible |
| `validarLongitud(numero, max)` | `true` si el número no excede la longitud máxima. | Disponible |
| `calcularEdad(fecha)` | Devuelve la edad a partir de una fecha de nacimiento. | Disponible |
| `esMayorDeEdad(fecha)` | `true` si la edad es 18 o más. | Disponible |
| `capitalizarPalabras(texto)` | Pone en mayúscula la primera letra de cada palabra. | Disponible |
| `calcularFuerzaPassword(password)` | Clasifica la contraseña de "Muy débil" a "Muy fuerte". | Disponible |

#### `js/login.js` — lógica de `login.html`

| Método / evento | Descripción |
|---|---|
| Revisión inicial de `sessionStorage` | Si ya hay sesión, entra directo a `index.html`. |
| `marcar(input, errorId, valido, mensaje)` | Pone el campo en verde (`is-valid`) o rojo (`is-invalid`) y muestra u oculta su mensaje de error. |
| `submit` del formulario | Valida correo y contraseña; si ambos son válidos guarda la sesión y redirige. |
| `click` de `#togglePass` | Alterna el tipo del input entre `password` y `text` para mostrar u ocultar la contraseña. |

#### `js/app.js` — lógica de `index.html`

| Método / evento | Descripción |
|---|---|
| Protección de pantalla | Si no hay `usuario` en `sessionStorage`, redirige a `login.html`. |
| Navbar de usuario | Escribe el correo y la inicial en `#nombreUsuario` y `#avatarUsuario`. |
| `click` de `#btnSalir` | Borra la sesión y regresa al login. |
| `click` de `#btnMenu` | Alterna la clase `sidebar-hidden` en `<body>` para abrir o cerrar el sidebar. |
| Cambio de vistas (`data-vista`) | Oculta todas las `<section>` y muestra la elegida (Inicio o Captura). |
| `marcar(input, valido)` | Aplica `is-valid` / `is-invalid` a un campo. |
| `submit` de `#formUsuario` | Valida nombre (≥ 3 caracteres), correo y contraseña; agrega el usuario a la tabla. |
| `validarNumeroControl(valor)` | `true` si el valor tiene **exactamente 6 dígitos** (`/^\d{6}$/`). |
| `calcularEdad(fechaTexto)` | Calcula la edad restando un año si todavía no cumple años. |
| `submit` de `#formAlumno` | Valida los campos, calcula la edad, agrega la fila con su situación y abre el modal. |

> **Nota:** `calcularEdad` está definida tanto en `utileria.js` como en `app.js`. Como `app.js` se carga después, en `index.html` se usa la versión de `app.js`.

---

## 2. 🛠️ Proceso de creación

> 📸 Las imágenes de esta sección se guardan en la carpeta `img/` del repositorio (ver [sección 3](#3--capturas-del-flujo-completo)).

### Paso 1 · Estructura base y estilos

1. Creamos la carpeta del proyecto con `css/`, `js/`, `login.html` e `index.html`.
2. Enlazamos **Bootstrap 5.3.3**, **Bootstrap Icons** y la fuente **Figtree** por CDN en ambos HTML.
3. En `css/styles.css` definimos la paleta jade como variables CSS (`:root`) y el botón `.btn-jade`, para que todo el sistema tenga una misma identidad visual.

### Paso 2 · El login (`login.html` + `login.js`)

1. Maquetamos una pantalla dividida en dos columnas con CSS Grid: un panel verde con el nombre del sistema y el formulario a la derecha (en pantallas pequeñas el panel verde se oculta).
2. Creamos el formulario `#formLogin` con los campos **correo** y **contraseña**, usando `novalidate` para validar nosotros con JavaScript en lugar del navegador.
3. Escribimos en `utileria.js` las funciones `validarCorreo` y `validarPassword`, y las llamamos desde el evento `submit` en `login.js`.
4. Con la función `marcar()` mostramos los errores debajo de cada campo usando las clases `is-invalid` / `is-valid` de Bootstrap.
5. Agregamos el botón del ojo para mostrar u ocultar la contraseña.
6. Si todo es válido, guardamos el correo con `sessionStorage.setItem` y redirigimos a `index.html`.

![Login](img/01-login.png)

![Login con errores de validación](img/02-login-errores.png)

### Paso 3 · El sidebar (`index.html` + `app.js`)

1. Armamos un `<aside class="sidebar">` fijo a la izquierda con la marca del sistema y un menú `nav` de Bootstrap.
2. La opción **Usuarios** usa el componente **collapse** de Bootstrap (`data-bs-toggle="collapse"`) para desplegar el submenú **Captura**.
3. Para abrir y cerrar el menú agregamos un botón hamburguesa (`#btnMenu`) que alterna la clase `sidebar-hidden` en `<body>`. Con CSS, esa clase desplaza el sidebar fuera de pantalla (`translateX(-100%)`) y quita el margen del contenido.
4. En pantallas menores a 992 px el sidebar inicia oculto y aparece un fondo oscuro (`backdrop-nav`) que lo cierra al tocarlo.
5. Con atributos `data-vista` cambiamos entre las secciones **Inicio** y **Captura** sin recargar la página.

![Sidebar abierto](img/04-sidebar.png)

![Submenú Usuarios → Captura](img/05-submenu-captura.png)

### Paso 4 · El navbar con el usuario

1. Creamos el `<header class="topbar">` con el botón hamburguesa a la izquierda y un **dropdown** de Bootstrap a la derecha.
2. El botón del dropdown contiene un avatar (`#avatarUsuario`) y el texto del usuario (`#nombreUsuario`), vacíos por defecto.
3. En `app.js` leemos `sessionStorage.getItem("usuario")` y llenamos esos dos elementos: el correo completo y su **primera letra** en mayúscula como avatar.
4. Dentro del dropdown agregamos **Salir del sistema**, que ejecuta `sessionStorage.removeItem("usuario")` y regresa a `login.html`.

![Navbar con usuario](img/03-navbar-usuario.png)

![Menú desplegable Salir del sistema](img/06-navbar-salir.png)

### Paso 5 · El número de control

1. En el formulario **Nuevo alumno** agregamos el campo `#aControl` con `inputmode="numeric"` y `maxlength="6"`.
2. Escuchamos el evento `input` y eliminamos cualquier carácter que no sea dígito: `value.replace(/\D/g, "")`, así solo se pueden escribir números.
3. Al guardar, `validarNumeroControl()` comprueba con la expresión regular `/^\d{6}$/` que tenga **exactamente 6 dígitos**. Si no, el campo se marca en rojo con el mensaje de error.

![Número de control inválido](img/07-numero-control-error.png)

### Paso 6 · El modal de edad

1. En `index.html` definimos un modal de Bootstrap (`#modalEdad`) con un ícono, un título, un texto y el botón **Entendido**.
2. Al enviar el formulario de alumno y pasar las validaciones, `calcularEdad()` obtiene la edad a partir de la fecha de nacimiento y se compara con 18 años.
3. Con esa información, `app.js` cambia el ícono (✔ o ❗), el título (*Es mayor de edad* / *Es menor de edad*) y el texto (*"Nombre tiene X años."*), y abre el modal con `new bootstrap.Modal(...).show()`.
4. Además, el alumno se agrega a la tabla **Alumnos registrados** con una etiqueta de su situación.

![Modal mayor de edad](img/08-modal-mayor.png)

![Modal menor de edad](img/09-modal-menor.png)

---

## 3. 🖼️ Capturas del flujo completo

Flujo completo funcionando, de principio a fin:

| # | Pantalla | Captura |
|---|---|---|
| 1 | Login vacío | ![](img/01-login.png) |
| 2 | Login con errores de validación | ![](img/02-login-errores.png) |
| 3 | Sistema con el usuario en el navbar | ![](img/03-navbar-usuario.png) |
| 4 | Sidebar con submenú **Usuarios → Captura** | ![](img/05-submenu-captura.png) |
| 5 | Vista de captura (formularios de usuario y alumno) | ![](img/10-captura.png) |
| 6 | Alumno con modal de **mayor de edad** | ![](img/08-modal-mayor.png) |
| 7 | Alumno con modal de **menor de edad** | ![](img/09-modal-menor.png) |
| 8 | Tablas de alumnos y usuarios registrados | ![](img/11-tablas.png) |
| 9 | **Salir del sistema** y regreso al login | ![](img/06-navbar-salir.png) |

---

## 4. ▶️ Cómo usarlo

1. Descarga o clona el repositorio.
2. Abre `login.html` en el navegador (basta con doble clic). Se necesita conexión a internet para cargar Bootstrap por CDN.
3. Ingresa **cualquier correo válido** y una contraseña de **8 o más caracteres que incluya mayúscula, minúscula, número y carácter especial**. Ejemplo:

   ```
   Correo:     alumno@correo.com
   Contraseña: Alumno@2026
   ```

4. Dentro del sistema abre **Usuarios → Captura** y registra un usuario y un alumno.

### Publicar en GitHub Pages

1. Sube los archivos a un repositorio.
2. En **Settings → Pages**, elige la rama `main` y la carpeta `/ (root)`.
3. Abre la URL que GitHub te asigne y agrega `/login.html` al final.

---

## 5. 📁 Estructura del proyecto

```
Actividad5/
├── login.html          # Pantalla de inicio de sesión
├── index.html          # Sistema: sidebar, navbar, formularios y modal
├── css/
│   └── styles.css      # Estilos propios (paleta verde jade)
├── js/
│   ├── utileria.js     # Funciones de validación reutilizables
│   ├── login.js        # Lógica de login.html
│   └── app.js          # Lógica de index.html
├── img/                # Capturas de pantalla para este README
└── README.md
```

---

<div align="center">

**Martínez Pacheco Cristian** · **Mendoza Lucero Hasiel Isaí**
Programación Web · Instituto Tecnológico de Oaxaca

</div>
