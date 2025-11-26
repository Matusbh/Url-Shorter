# 🎨 URL Shortener (En desarrollo) | MatDevs

Este es un proyecto personal que estoy construyendo para practicar la creación de una aplicación completa con frontend y backend separados. El objetivo es tener un acortador de URLs totalmente funcional, simple y rápido.

🛠️ **Estado del proyecto**
El proyecto está en desarrollo. La estructura básica ya está montada y tengo una interfaz desde la que el usuario puede introducir una URL, validarla y obtener un enlace corto.


🧩 **Cómo está hecho**

**Frontend**

He creado todo el frontend usando:
HTML
SCSS
JavaScript

Aquí gestiono:
El formulario para introducir la URL.
La validación básica.
El envío de la petición al backend.
El resultado con la URL acortada.
Tengo una clase principal que maneja la lógica del formulario y los mensajes para el usuario.

**Backend**

El backend no lo he programado yo. Aún estoy aprendiendo estas partes y me lo generó ChatGPT para poder avanzar en el proyecto.
Está hecho en Node.js con Express, y funciona localmente. La idea es que el frontend haga una petición y el backend devuelva una URL corta generada en el momento.
Lo estoy ejecutando en local porque tuve problemas usando APIs públicas de acortadores y preferí tener todo controlado desde mi máquina.


**🚧 Próximos pasos**
Mejorar la comunicación entre frontend y backend.
Subir una versión estable.
Añadir persistencia para guardar las URLs.
Mejorar el diseño y la experiencia.
Preparar una demo pública cuando esté terminado.

📂 **Estructura actual del proyecto**
/backend
  ├─ index.js
  ├─ package.json
  └─ ...

/frontend
  ├─ index.html
  ├─ scss/
  ├─ js/
  └─ ...

📌**Nota**

Este README es temporal. Lo ampliaré cuando el proyecto esté más avanzado y tenga una versión estable lista para mostrar.
