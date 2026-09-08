document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CONFIGURACIÓN DE TARIFAS Y CÁLCULO DE TOTALES ---
  const tarifas = {
    residencial: {
      "cilindro-5": 6500,
      "cilindro-11": 12000,
      "cilindro-15": 16000,
      "cilindro-45": 45000,
      "regulador-estandar": 8990,
      "regulador-alta": 18990,
      "regulador-dual": 14990,
      "manguera-15": 3990,
      "manguera-3": 6990,
      abrazadera: 990,
      "kit-conexion": 12990,
      "carro-porta": 12990,
      "tapa-valvula": 1490,
      "detector-gas": 19990,
    },
    comercial: {
      "cilindro-5": 6000,
      "cilindro-11": 11000,
      "cilindro-15": 14500,
      "cilindro-45": 40000,
      "regulador-estandar": 8200,
      "regulador-alta": 17000,
      "regulador-dual": 13500,
      "manguera-15": 3500,
      "manguera-3": 6200,
      abrazadera: 800,
      "kit-conexion": 11500,
      "carro-porta": 11000,
      "tapa-valvula": 1200,
      "detector-gas": 17000,
    },
  };

  function calcularTotal() {
    const tipoClienteInput = document.getElementById("tipo-cliente");
    const totalElemento = document.getElementById("total-pedido");

    if (!tipoClienteInput || !totalElemento) return;

    const tipoCliente = tipoClienteInput.value;
    let total = 0;

    const productosIds = [
      "cilindro-5", "cilindro-11", "cilindro-15", "cilindro-45",
      "regulador-estandar", "regulador-alta", "regulador-dual",
      "manguera-15", "manguera-3", "abrazadera", "kit-conexion",
      "carro-porta", "tapa-valvula", "detector-gas",
    ];

    productosIds.forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        const cantidad = parseInt(input.value) || 0;
        const precioUnitario = tarifas[tipoCliente]?.[id] || 0;
        total += cantidad * precioUnitario;
      }
    });

    const totalFormateado = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(total);

    totalElemento.textContent = totalFormateado;
  }

  // Asignar listeners para el cálculo en tiempo real
  const elementosEscucha = [
    document.getElementById("tipo-cliente"),
    ...Array.from(document.querySelectorAll('input[type="number"]')),
  ];

  elementosEscucha.forEach((elemento) => {
    if (elemento) {
      elemento.addEventListener("input", calcularTotal);
      elemento.addEventListener("change", calcularTotal);
    }
  });

  // --- 2. VALIDACIÓN DE FORMULARIOS ---
  const formularios = document.querySelectorAll("form");

  formularios.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      limpiarErrores(form);

      let esValido = true;

      // RUT
      const rutInput = form.querySelector("#rut");
      if (rutInput) {
        const rutLimpio = rutInput.value.replace(/[^0-9kK]/g, "");
        if (rutLimpio.length < 8 || rutLimpio.length > 9) {
          mostrarError(rutInput, "Ingrese un RUT válido (ej: 12345678-9).");
          esValido = false;
        }
      }

      // Contraseña
      const passInput = form.querySelector("#contrasena");
      if (passInput && passInput.value.trim().length < 6) {
        mostrarError(passInput, "La contraseña debe tener al menos 6 caracteres.");
        esValido = false;
      }

      // Correo
      const correoInput = form.querySelector("#correo");
      if (correoInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInput.value.trim())) {
        mostrarError(correoInput, "Ingrese un correo electrónico válido.");
        esValido = false;
      }

      // Teléfono
      const telInput = form.querySelector("#telefono");
      if (telInput && !/^[0-9]{9}$/.test(telInput.value.trim())) {
        mostrarError(telInput, "El teléfono debe tener exactamente 9 dígitos.");
        esValido = false;
      }

      // Nombre
      const nombreInput = form.querySelector("#nombre");
      if (nombreInput && nombreInput.value.trim().length < 2) {
        mostrarError(nombreInput, "Ingrese su nombre completo.");
        esValido = false;
      }

      // Pedidos y Dirección
      const inputsCantidad = form.querySelectorAll('input[type="number"]');
      const direccion = form.querySelector("#direccion");

      if (direccion && inputsCantidad.length > 0) {
        let totalProductos = 0;

        inputsCantidad.forEach((input) => {
          totalProductos += parseInt(input.value) || 0;
        });

        if (totalProductos <= 0) {
          mostrarError(
            inputsCantidad[0],
            "Debe seleccionar al menos 1 producto para realizar el pedido."
          );
          esValido = false;
        }

        if (direccion.value.trim().length < 5) {
          mostrarError(direccion, "Ingrese una dirección de entrega válida.");
          esValido = false;
        }
      }

      if (esValido) {
        mostrarExito(form, "¡Pedido procesado con éxito!");
      }
    });
  });
});

// --- 3. FUNCIONES AUXILIARES DE INTERFAZ ---
function mostrarError(element, mensaje) {
  element.classList.add("input-error");
  const errorDiv = document.createElement("span");
  errorDiv.className = "mensaje-error";
  errorDiv.innerText = mensaje;

  if (element.parentNode) {
    element.parentNode.appendChild(errorDiv);
  }
}

function mostrarExito(form, mensaje) {
  const exitoDiv = document.createElement("div");
  exitoDiv.className = "mensaje-exito";
  exitoDiv.innerText = mensaje;
  form.prepend(exitoDiv);
}

function limpiarErrores(form) {
  form.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
  form.querySelectorAll(".mensaje-error").forEach((el) => el.remove());
  form.querySelectorAll(".mensaje-exito").forEach((el) => el.remove());
}