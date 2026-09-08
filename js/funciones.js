// Me aseguro de que todo el HTML esté completamente cargado en el navegador antes de ejecutar mi código JavaScript.
document.addEventListener("DOMContentLoaded", () => {
  // Selecciono todos los formularios que existan en la página web (Login, Registro, Pedido Cliente, etc.)
  const formularios = document.querySelectorAll("form");

  // Recorro cada formulario encontrado para asignarle un evento de envío ("submit")
  formularios.forEach((form) => {
    form.addEventListener("submit", (e) => {
      // Evito que la página se recargue automáticamente al presionar el botón de envío, 
      // así puedo validar la información primero con JS.
      e.preventDefault();

      // Borro cualquier mensaje de error o éxito previo para iniciar la validación desde cero.
      limpiarErrores(form);

      // Creo una variable bandera que asume que todo está correcto hasta que se demuestre lo contrario.
      let esValido = true;

      // --- 1. VALIDACIÓN DEL RUT ---
      // Busco el campo del RUT dentro del formulario actual
      const rutInput = form.querySelector("#rut");
      if (rutInput) {
        // Elimino puntos, guiones o caracteres raros para dejar solo los números y la letra K
        const rutLimpio = rutInput.value.replace(/[^0-9kK]/g, "");
        // Verifico que la cantidad de caracteres esté en el rango normal de un RUT chileno (8 a 9 dígitos)
        if (rutLimpio.length < 8 || rutLimpio.length > 9) {
          mostrarError(rutInput, "Ingrese un RUT válido (ej: 12345678-9).");
          esValido = false;
        }
      }

      // --- 2. VALIDACIÓN DE CONTRASEÑA ---
      const passInput = form.querySelector("#contrasena");
      // Reviso que no esté vacía y que tenga al menos 6 caracteres (quitando espacios en blanco con .trim())
      if (passInput && passInput.value.trim().length < 6) {
        mostrarError(passInput, "La contraseña debe tener al menos 6 caracteres.");
        esValido = false;
      }

      // --- 3. VALIDACIÓN DE CORREO ELECTRÓNICO ---
      const correoInput = form.querySelector("#correo");
      // Utilizo una expresión regular (RegEx) para comprobar que tenga el formato básico usuario@dominio.com
      if (correoInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInput.value.trim())) {
        mostrarError(correoInput, "Ingrese un correo electrónico válido.");
        esValido = false;
      }

      // --- 4. VALIDACIÓN DE TELÉFONO ---
      const telInput = form.querySelector("#telefono");
      // Verifico mediante RegEx que sean exactamente 9 números (formato celular/fijo chileno)
      if (telInput && !/^[0-9]{9}$/.test(telInput.value.trim())) {
        mostrarError(telInput, "El teléfono debe tener exactamente 9 dígitos.");
        esValido = false;
      }

      // --- 5. VALIDACIÓN DE NOMBRE ---
      const nombreInput = form.querySelector("#nombre");
      // Compruebo que el usuario haya escrito un nombre razonable (al menos 2 caracteres)
      if (nombreInput && nombreInput.value.trim().length < 2) {
        mostrarError(nombreInput, "Ingrese su nombre completo.");
        esValido = false;
      }

      // --- 6. VALIDACIÓN DE PRODUCTOS Y DIRECCIÓN (Página Cliente) ---
      // Capturo todos los campos de tipo número (cilindros, reguladores, accesorios) y el campo de dirección
      const inputsCantidad = form.querySelectorAll('input[type="number"]');
      const direccion = form.querySelector("#direccion");

      // Esta validación solo se ejecuta si estamos en la vista del cliente (donde existen estos campos)
      if (direccion && inputsCantidad.length > 0) {
        let totalProductos = 0;

        // Sumo las cantidades ingresadas en cada uno de los productos
        inputsCantidad.forEach((input) => {
          totalProductos += parseInt(input.value) || 0;
        });

        // Si la suma de productos es 0 o menor, significa que el cliente no ha seleccionado nada
        if (totalProductos <= 0) {
          mostrarError(
            inputsCantidad[0],
            "Debe seleccionar al menos 1 producto para realizar el pedido."
          );
          esValido = false;
        }

        // Verifico que se haya ingresado una dirección con al menos 5 caracteres
        if (direccion.value.trim().length < 5) {
          mostrarError(direccion, "Ingrese una dirección de entrega válida.");
          esValido = false;
        }
      }

      // --- FINALIZACIÓN ---
      // Si todos los datos ingresados pasaron las pruebas, muestro el banner de confirmación
      if (esValido) {
        mostrarExito(form, "¡Pedido procesado con éxito!");
      }
    });
  });
});


 //Función auxiliar para marcar un campo con error visualmente y agregar el texto descriptivo abajo.
function mostrarError(element, mensaje) {
  element.classList.add("input-error"); // Le agrego la clase CSS que pinta el borde en rojo

  // Creo una etiqueta <span> dinámica desde JavaScript para poner el texto de error
  const errorDiv = document.createElement("span");
  errorDiv.className = "mensaje-error";
  errorDiv.innerText = mensaje;

  // Inserto el mensaje dentro del contenedor del campo de texto
  if (element.parentNode) {
    element.parentNode.appendChild(errorDiv);
  }
}


 //Función auxiliar para mostrar un banner verde de éxito en la parte superior del formulario.

function mostrarExito(form, mensaje) {
  // Creo un <div> dinámico para la alerta de éxito
  const exitoDiv = document.createElement("div");
  exitoDiv.className = "mensaje-exito";
  exitoDiv.innerText = mensaje;

  // Inserto la alerta al principio del formulario (arriba de todos los inputs)
  form.prepend(exitoDiv);
}


 //Función auxiliar para limpiar cualquier marca de error o mensaje previo antes de volver a validar.
function limpiarErrores(form) {
  // Le quito el borde rojo a los inputs que estaban marcados como error
  form.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));

  // Elimino del HTML todos los mensajes de error anteriores
  form.querySelectorAll(".mensaje-error").forEach((el) => el.remove());

  // Elimino del HTML cualquier mensaje de éxito anterior
  form.querySelectorAll(".mensaje-exito").forEach((el) => el.remove());
}