export class GestorDeUrls {
  constructor() {
    // prepara los elementos del dom y configura los eventos principales de la pagina
    // Elementos con los que voy a interactuar
    this.form = document.getElementById("shorten-form");
    this.input = document.getElementById("url-input");
    this.resultado = document.getElementById("url-result");
    this.createButton = document.getElementById("boton");
    this.copyButton = document.getElementById("copy-button");
    this.error = document.getElementById("hero-error");
    this.errorMensaje = document.getElementById("error-message");
    // Punto de entrada de la API de tu backend
    this.Url = "/api/shorten";
  }

  init() {
    //Congigura los event listeners y ejecuta funciones iniciales
    // Deja la pagina lista para funcionar
    this.createButton.addEventListener("click", (e) => {
      //evitar que la pagina se recargue automaticamnete al pulsar crear
      e.preventDefault();
      //llamamos al manejador del formulario
      this.manejarEnvioFormulario();

      this.manejarEventosBotones();
    });
  }

  manejarEnvioFormulario() {
    // se ejecuta cuando el usuario envia el formulario valida la url y llama a la api
    // leer valor del input y eliminamos espacios en blanco con trim
    const valorInput = this.input.value.trim();
    // validar la url
    if (this.validarUrl(valorInput)) {
      // si es true seguir
      // mostrar estado cargando
      this.mostrarEstadoCargando();
      // llamar a la api
      this.llamarApiAcortador(valorInput)
        //Cogemnos lo que nos devuelve la api
        .then((datos) => {
          this.procesarRespuestaApi(datos);
          this.reiniciarFormulario();
        })
        .catch((er) =>
          this.mostrarError(er.message || "No se pudo completar la peticion")
        )
        .finally(() => {
          this.createButton.disabled = false;
          this.createButton.textContent = "Create Short Link";
        });
      // procesar la respuesta
      // mostrar resultado
    } else {
      // mostramos el error
      this.mostrarError();
    }
    // restaurar el formulario
  }

  validarUrl(valor) {
    // comprueba que el texto introducido tenga formato de url valido
    // y que contenga un punto
    return (valor.startsWith("http://") || valor.startsWith("https://")) &&
      valor.includes(".")
      ? true
      : false;
  }

  mostrarEstadoCargando() {
    // actualiza la interfaz para indicar que la peticion esta en proceso
    // desactivamos el boton
    this.createButton.disabled = true;
    //cambiamos el texto del boton
    this.createButton.textContent = "Shortering";
  }

  async llamarApiAcortador(urlLarga) {
    // realiza la peticion a la api publica usando la url del usuario y devuelve la respuesta
    // llamamos a la api
    const resp = await fetch(this.Url, {
      //Le decimo que queremos hacer en este caso le leviamos algo
      method: "POST",
      // le decimos a la api que lo que le enviamos esta en formato json
      headers: {
        // usamos un tipo de contenido simple para evitar que lñanze options y que se bloquee el cors
        "Content-Type": "application/json",
      },
      // esto es lo que realmente le enviamos al servidor en formato json stringify
      body: JSON.stringify({
        // le enviamos el valor capturado de lo que pone el cliente en la url de la web
        long: urlLarga,
      }),
    });
    // si la resopuesta no esta bien lanza un error
    //es true si el estado es 200–299
    if (!resp.ok) throw new Error("Error en la respuesta de la API");

    const data = await resp.json();
    return data; // esto es lo que hace que lo que devuelce sea usable
  }

  procesarRespuestaApi(datos) {
    this.mostrarResultadoExito(datos);
    // interpreta los datos devueltos por la api y decide si mostrar exito o error
    // 1. Comprobar que la respuesta de la api no viene con un error
    // 2. Si hay error mostrarlo por pantalla y mostrar el error que venga del backend
    // 3. Si todo esta bien llamar a mostrarResultadoExito()
  }

  mostrarResultadoExito(datosRecibidos) {
    console.log("Datos que llegan del backend:", datosRecibidos);
    // Escondemos el error por si estaba visible
    this.error.style.display = "none";
    this.errorMensaje.textContent = "";

    // Asignarle a una variable lo que nos traemos del backend
    const shortUrl = datosRecibidos.shortUrl;

    this.resultado.value = shortUrl;

    //2. Mostrar la URL corta en el campo de resultado.
    this.resultado.style.display = "block";

    // 4. Habilitar y mostrar el botón de copiar.
    this.copyButton.disabled = false;
    this.copyButton.style.display = "inline-block";
  }

  mostrarError(mensaje) {
    // En caso de que no llegue un mensaje de la api ponemos uno por defecto
    const texto = mensaje || "Ha ocurrido un error";
    // Escribimos el texto dentro del contenedor destinado al mensaje
    this.errorMensaje.textContent = mensaje;
    //Hacxemos visible el bloque del error
    this.error.style.display = "block";
  }

  copiarAlPortapapeles() {
    //Leer el texto de la URL corta (de this.resultado).
    const texto = this.resultado.value;
    // Si no hay nada, salir o mostrar error suave.
    if (!texto) {
      return this.mostrarError("No hay URL para copiar");
    }

    // Intentar copiar con navigator.clipboard.writeText(...).
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(texto)
        .then(() => {
          //Cambiamos el texto del boton a copiado
          this.copyButton.textContent = "Copiado";
          //Despues de un segundo el boton se reestablece y pone nuevamente copiar
          setTimeout(() => {
            this.copyButton.textContent = "Coiar";
          }, 1000);
        })
        .catch(() => {
          // Si algo falla llamamos a mostrar error
          this.mostrarError("No se ha podido copiar");
        });
    }

    // (Opcional pero muy recomendable) Dar feedback al usuario en el botón:
    // por ejemplo cambiar el texto a “Copiado” durante un momento.
  }

  reiniciarFormulario() {
    // limpia el formulario para permitir acortar una nueva url
    // gestiona las acciones de los botones como copiar y volver a intentar
    // limpiamos el campo de entrada
    this.input.value = "";
    //borrar el campo del resultado
    this.resultado.value = "";
    //ocultar mensaje de error y de exito
    // this.error.textContent = "";
  }

  manejarEventosBotones() {
    this.copyButton.addEventListener("click", () => {
      this.copiarAlPortapapeles();
    });
  }
}
