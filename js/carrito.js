// ==========================================
// FUNCIÓN GLOBAL: AGREGAR PRODUCTOS AL CARRITO
// ==========================================
// Permite sumar productos desde el Catálogo o la Ficha Técnica guardándolos en el LocalStorage.
function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('promaco_carrito')) || [];

    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    localStorage.setItem('promaco_carrito', JSON.stringify(carrito));
    alert(`¡"${nombre}" se agregó al carrito correctamente! 🛒`);
}

// ==========================================
// LÓGICA AUTOMÁTICA EXCLUSIVA DE 'carrito.html'
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const tablaCarrito = document.getElementById("cart-items");
    const spanTotal = document.getElementById("cart-total");
    const btnPromo = document.getElementById("btn-aplicar-promo");
    const btnPagar = document.getElementById("btn-pagar");
    const btnConfirmarPago = document.getElementById("btn-confirmar-pago");

    // Si no estamos en la página del carrito, se detiene la ejecución del script
    if (!tablaCarrito) return; 

    // ------------------------------------------
    // FUNCIÓN: RENDERIZAR Y ACTUALIZAR EL CARRITO
    // ------------------------------------------
    function renderizarCarrito(aplicarDescuento = false) {
        let carrito = JSON.parse(localStorage.getItem('promaco_carrito')) || [];
        
        // Valida si el carrito está vacío para mostrar el mensaje correspondiente
        if (carrito.length === 0) {
            tablaCarrito.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Tu carrito está vacío. ¡Agrega productos desde el catálogo!</td></tr>`;
            if (spanTotal) spanTotal.textContent = "$0";
            if (btnPagar) btnPagar.setAttribute("disabled", "true");
            return;
        }

        // Habilita el botón de pago si hay elementos en el carrito
        if (btnPagar) btnPagar.removeAttribute("disabled");

        let html = "";
        let totalGeneral = 0;

        // Recorre cada producto para construir las filas de la tabla
        carrito.forEach((item, index) => {
            let subtotal = item.precio * item.cantidad;

            // Aplica un 15% de descuento si cumple la condición de cantidad por mayor (50+)
            if (aplicarDescuento && item.cantidad >= 50) {
                subtotal = subtotal * 0.85; 
            }

            totalGeneral += subtotal;

            html += `
                <tr>
                    <td class="fw-semibold">${item.nombre}</td>
                    <td>$${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                        <input type="number" class="form-control form-control-sm w-50 input-cantidad" data-index="${index}" value="${item.cantidad}" min="1">
                    </td>
                    <td class="fw-bold text-primary">$${Math.round(subtotal).toLocaleString('es-CL')}</td>
                    <td>
                        <button class="btn btn-outline-danger btn-sm btn-eliminar" data-index="${index}">🗑️</button>
                    </td>
                </tr>
            `;
        });

        tablaCarrito.innerHTML = html;
        if (spanTotal) spanTotal.textContent = `$${Math.round(totalGeneral).toLocaleString('es-CL')}`;

        // ------------------------------------------
        // EVENTO: CAMBIAR CANTIDAD EN TIEMPO REAL
        // ------------------------------------------
        document.querySelectorAll(".input-cantidad").forEach(input => {
            input.addEventListener("change", (e) => {
                let index = e.target.getAttribute("data-index");
                let nuevaCantidad = parseInt(e.target.value);
                if (nuevaCantidad > 0) {
                    carrito[index].cantidad = nuevaCantidad;
                    localStorage.setItem('promaco_carrito', JSON.stringify(carrito));
                    renderizarCarrito(aplicarDescuento);
                }
            });
        });

        // ------------------------------------------
        // EVENTO: ELIMINAR PRODUCTO DEL CARRITO
        // ------------------------------------------
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let index = e.currentTarget.getAttribute("data-index");
                carrito.splice(index, 1);
                localStorage.setItem('promaco_carrito', JSON.stringify(carrito));
                renderizarCarrito(aplicarDescuento);
            });
        });
    }

    // Carga inicial del carrito sin descuento aplicado
    renderizarCarrito(false);

    // ------------------------------------------
    // BOTÓN: APLICAR PROMOCIÓN POR MAYOR (50+ unidades)
    // ------------------------------------------
    if (btnPromo) {
        btnPromo.addEventListener("click", () => {
            let carrito = JSON.parse(localStorage.getItem('promaco_carrito')) || [];
            let cumpleCondicion = carrito.some(item => item.cantidad >= 50);

            if (cumpleCondicion) {
                renderizarCarrito(true);
                alert("¡Descuento del 15% aplicado con éxito para productos con 50 o más unidades!");
            } else {
                alert("⚠️ Para aplicar la promoción por mayor, debes tener al menos un producto con una cantidad de 50 unidades o más en tu carrito.");
            }
        });
    }

    // ------------------------------------------
    // BOTÓN: CONFIRMAR Y PROCESAR PAGO
    // ------------------------------------------
    if (btnConfirmarPago) {
        btnConfirmarPago.addEventListener("click", () => {
            const nombre = document.getElementById("nombreTarjeta").value;
            const tarjeta = document.getElementById("numeroTarjeta").value;

            // Validación básica de campos obligatorios en el formulario de pago
            if (!nombre || !tarjeta) {
                alert("Por favor completa los datos de la tarjeta para continuar.");
                return;
            }

            // Notificación de éxito en la compra industrial
            alert(`🎉 ¡Pago realizado con éxito, ${nombre}! Su pedido industrial ha sido procesado correctamente y será enviado a obra.`);
            
            // Limpieza del carrito de compras en LocalStorage
            localStorage.removeItem('promaco_carrito');

            // Cierre automático del modal utilizando Bootstrap y actualización de la vista
            const modalElement = document.getElementById('modalPago');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();  
            }

            renderizarCarrito(false);
        });
    }
});