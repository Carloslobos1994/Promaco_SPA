// Espera a que todo el documento HTML esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LÓGICA DEL FORMULARIO DE CONTACTO
    // ==========================================
    const contactForm = document.querySelector(".form-box form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            // Previene el comportamiento por defecto (recargar la página al enviar)
            e.preventDefault();
            
            // Captura los valores ingresados en los campos de texto
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;

            // Valida que los campos obligatorios no estén vacíos o con espacios en blanco
            if (nombre.trim() === "" || email.trim() === "") {
                alert("Por favor, completa todos los campos obligatorios.");
                return;
            }

            // Muestra una alerta de éxito personalizada y limpia los campos del formulario
            alert(`¡Gracias ${nombre}, tu mensaje ha sido enviado con éxito!`);
            contactForm.reset();
        });
    }

    // ==========================================
    // 2. LÓGICA DEL FORMULARIO DE USUARIOS
    // ==========================================
    const userForm = document.querySelector(".form-card form");
    if (userForm) {
        userForm.addEventListener("submit", (e) => {
            // Previene la recarga por defecto de la página
            e.preventDefault();
            
            // Muestra confirmación de registro exitoso y redirige al listado de usuarios
            alert("¡Usuario registrado exitosamente en el sistema!");
            window.location.href = "usuarios.html";
        });
    }
});