document.addEventListener("DOMContentLoaded", () => {
  const formularios = document.querySelectorAll("form");

  formularios.forEach((form) => {
    form.addEventListener("submit", (e) => {
      // Detener el envío por defecto para manejar la validación con JS
      e.preventDefault();
      limpiarErrores(form);

      let esValido = true;

      // 1. Validar RUT (Login y Registro)
      const rutInput = form.querySelector("#rut");
      if (rutInput) {
        const rutLimpio = rutInput.value.replace(/[^0-9kK]/g, "");
        if (rutLimpio.length < 8 || rutLimpio.length > 9) {
          mostrarError(rutInput, "Ingrese un RUT válido (ej: 12345678-9).");
          esValido = false;
        }
      }

      // 2. Validar Contraseña
      const passInput = form.querySelector("#contrasena");
      if (passInput && passInput.value.trim().length < 6) {
        mostrarError(passInput, "La contraseña debe tener al menos 6 caracteres.");
        esValido = false;
      }

      // 3. Validar Correo Electrónico
      const correoInput = form.querySelector("#correo");
      if (correoInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInput.value.trim())) {
        mostrarError(correoInput, "Ingrese un correo electrónico válido.");
        esValido = false;
      }

      // 4. Validar Teléfono (Formato Chileno de 9 dígitos)
      const telInput = form.querySelector("#telefono");
      if (telInput && !/^[0-9]{9}$/.test(telInput.value.trim())) {
        mostrarError(telInput, "El teléfono debe tener exactamente 9 dígitos.");
        esValido = false;
      }

      // 5. Validar Nombre
      const nombreInput = form.querySelector("#nombre");
      if (nombreInput && nombreInput.value.trim().length < 2) {
        mostrarError(nombreInput, "Ingrese su nombre completo.");
        esValido = false;
      }

      // 6. Validar Pedido de Cilindros (Cliente.html)
      const cant5 = form.querySelector("#cant-5");
      const cant11 = form.querySelector("#cilindro-11");
      const cant15 = form.querySelector("#cilindro-15");
      const cant45 = form.querySelector("#cilindro-45");
      const direccion = form.querySelector("#direccion");

      if (direccion) {
        const totalCilindros = (parseInt(cant5?.value) || 0) + 
                               (parseInt(cant11?.value) || 0) + 
                               (parseInt(cant15?.value) || 0) +
                               (parseInt(cant45?.value) || 0);

        if (totalCilindros <= 0) {
          mostrarError(cant5 || form.querySelector(".grupo-form"), "Debe seleccionar al menos 1 cilindro para realizar el pedido.");
          esValido = false;
        }

        if (direccion.value.trim().length < 5) {
          mostrarError(direccion, "Ingrese una dirección de entrega válida.");
          esValido = false;
        }
      }

      // Muestra el mensaje de éxito directamente en la pantalla (Sin alert)
      if (esValido) {
        mostrarExito(form, "¡Formulario procesado con éxito!");
      }
    });
  });
});

// Función para renderizar el mensaje de error contextual en el HTML
function mostrarError(element, mensaje) {
  element.classList.add("input-error");
  const errorDiv = document.createElement("span");
  errorDiv.className = "mensaje-error";
  errorDiv.innerText = mensaje;
  
  if (element.parentNode) {
    element.parentNode.appendChild(errorDiv);
  }
}

// Función para renderizar el mensaje de éxito integrado en la vista
function mostrarExito(form, mensaje) {
  const exitoDiv = document.createElement("div");
  exitoDiv.className = "mensaje-exito";
  exitoDiv.innerText = mensaje;
  form.prepend(exitoDiv);
}

// Función para limpiar errores y mensajes previos
function limpiarErrores(form) {
  form.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
  form.querySelectorAll(".mensaje-error").forEach((el) => el.remove());
  form.querySelectorAll(".mensaje-exito").forEach((el) => el.remove());
}