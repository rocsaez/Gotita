document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-pedido');
    const inputTelefono = document.getElementById('telefono');
    const selectProducto = document.getElementById('producto');
    const selectTipoCliente = document.getElementById('tipo-cliente');
    const spanPrecioTotal = document.getElementById('precio-total');

    // Diccionario de precios sacado de tu Excel
    const catalogoPrecios = {
        '5kg': { residencial: 6500, comercial: 6000 },
        '11kg': { residencial: 12000, comercial: 11000 },
        '15kg': { residencial: 16000, comercial: 14500 },
        '45kg': { residencial: 45000, comercial: 40000 }
    };

    // 1. Sugerencia de precio en tiempo real (Mejora la UX)
    const actualizarPrecio = () => {
        const producto = selectProducto.value;
        const tipo = selectTipoCliente.value;
        
        if (producto && tipo && catalogoPrecios[producto]) {
            const precio = catalogoPrecios[producto][tipo];
            spanPrecioTotal.textContent = `$${precio} CLP`;
        } else {
            spanPrecioTotal.textContent = '$0 CLP';
        }
    };

    selectProducto.addEventListener('change', actualizarPrecio);
    selectTipoCliente.addEventListener('change', actualizarPrecio);

    // 2. Validaciones personalizadas al enviar el formulario
    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que se recargue la página
        let esValido = true;

        // Limpiar errores previos
        document.querySelectorAll('.error-msg').forEach(msg => msg.style.display = 'none');
        document.querySelectorAll('input, select').forEach(input => input.classList.remove('input-error'));

        // Validar Dirección
        const direccion = document.getElementById('direccion');
        if (direccion.value.trim().length < 5) {
            mostrarError('error-direccion', 'Por favor, ingresa una dirección válida y detallada.');
            direccion.classList.add('input-error');
            esValido = false;
        }

        // Validar Teléfono (Solo 9 números)
        const regexTelefono = /^[0-9]{9}$/;
        if (!regexTelefono.test(inputTelefono.value)) {
            mostrarError('error-telefono', 'El teléfono debe contener exactamente 9 dígitos numéricos.');
            inputTelefono.classList.add('input-error');
            esValido = false;
        }

        // Validar Zona de Despacho
        const selectZona = document.getElementById('zona');
        if (selectZona.value === '') {
            mostrarError('error-zona', 'Debes seleccionar una zona de despacho.');
            selectZona.classList.add('input-error');
            esValido = false;
        }

        if (esValido) {
            alert('¡Pedido validado correctamente! Listo para procesar.');
            // Aquí iría el código para enviar los datos al backend más adelante
            formulario.reset();
            spanPrecioTotal.textContent = '$0 CLP';
        }
    });

    // Función auxiliar para mostrar errores
    function mostrarError(idElemento, mensaje) {
        const elementoError = document.getElementById(idElemento);
        if (elementoError) {
            elementoError.textContent = mensaje;
            elementoError.style.display = 'block';
        }
    }
});