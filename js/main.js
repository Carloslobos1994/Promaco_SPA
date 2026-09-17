// Lógica global para el inicio de sesión y validación de correos
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login"); 

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("email").value.trim().toLowerCase();

            // Lista de correos administradores autorizados
            const adminsPermitidos = [
                "camilo@promaco.com",
                "mathias@promaco.com",
                "carlos@promaco.com",
                "mario@promaco.com"
            ];

            // Guardar sesión actual en el navegador
            localStorage.setItem('promaco_usuario_actual', emailInput);

            // Validar si es administrador o cliente regular
            if (adminsPermitidos.includes(emailInput)) {
                alert(`¡Bienvenido al Panel de Control, ${emailInput}! Redirigiendo a Administración...`);
                window.location.href = "admin/dashboard.html";
            } else {
                alert(`¡Inicio de sesión exitoso! Bienvenido a la tienda Promaco SpA.`);
                window.location.href = "tienda/home.html";
            }
        });
    }
});