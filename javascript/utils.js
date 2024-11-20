// Validación de Fechas
export function validarFechas(checkin, checkout) {
    if (isNaN(checkin) || isNaN(checkout) || checkout <= checkin) {
        return "Por favor, ingresa una fecha de entrada y salida válida.";
    }
    return null;
}

// Cálculo de noches
export function calcularNoches(checkin, checkout) {
    return (checkout - checkin) / (1000 * 60 * 60 * 24);
}

// Cálculo del precio total
export function calcularPrecio(precioPorNoche, nights) {
    return precioPorNoche * nights;
}

// Función para guardar múltiples reservas en localStorage
export function guardarReservaEnStorage(reserva) {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
}
