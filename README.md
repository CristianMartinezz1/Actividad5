# Control Escolar · Login simulado

Proyecto web de dos pantallas que simula el acceso a un sistema. Hecho con **HTML, CSS y JavaScript** y **Bootstrap 5** como base de estilos (sin otros frameworks de JS). No requiere backend.

## Flujo

1. `login.html`: formulario de correo y contraseña validados con las funciones de `utileria.js`.
2. Si la validación pasa, se guarda el correo en `sessionStorage` y se redirige a `index.html`.
3. `index.html`: sistema con sidebar, navbar y formularios de captura.
4. En la navbar, el menú del usuario incluye **Salir del sistema**, que borra la sesión y regresa a `login.html`.

## Estructura

```
login-jade/
├── login.html
├── index.html
├── css/
│   └── styles.css      # paleta verde jade
├── js/
│   ├── utileria.js     # validarCorreo, validarPassword
│   ├── login.js        # lógica de login.html
│   └── app.js          # lógica de index.html
└── README.md
```

## Cómo usarlo

1. Descarga o clona el repositorio.
2. Abre `login.html` en el navegador (basta con doble clic).
3. Ingresa **cualquier correo válido** y una contraseña de **8 o más caracteres con letras y números**, por ejemplo `alumno@correo.com` / `clave1234`.
4. Dentro del sistema, abre **Usuarios → Captura**.

## Funcionalidad

| Elemento | Descripción |
|---|---|
| Login | Validación con `validarCorreo` y `validarPassword`; mensajes de error por campo; botón para mostrar la contraseña. |
| Sidebar | Botón hamburguesa para abrir y cerrar; opción **Usuarios** con submenú desplegable **Captura**. |
| Navbar | Muestra el correo de la sesión a la derecha; al hacer clic se despliega **Salir del sistema**. |
| Formulario de usuario | Nombre de usuario, correo y contraseña (validados con `utileria.js`). |
| Formulario de alumnos | Nombre, número de control (exactamente 6 dígitos) y fecha de nacimiento. |
| Modal de edad | Indica si el alumno es mayor o menor de edad (18 años) y lo agrega a la tabla. |
| Protección | Si se abre `index.html` sin sesión, redirige a `login.html`. |

## Funciones de utileria.js

- `validarCorreo(correo)` → `true` si tiene formato de correo válido.
- `validarPassword(password)` → `true` si tiene 8 o más caracteres con letras y números.

## Publicar en GitHub Pages

1. Crea un repositorio y sube los archivos.
2. En **Settings → Pages**, elige la rama `main` y la carpeta `/ (root)`.
3. Abre la URL que GitHub te asigne; empieza en `login.html` (o agrega `/login.html` a la URL).

## Capturas

Agrega aquí capturas de `login.html` y `index.html` (por ejemplo en una carpeta `img/`).

## Autor

Cristian · Instituto Tecnológico de Oaxaca
