///Codigo para una plataforma de reservas de propiedades en Argentina.
const ciudades = [
    { nombre: "Buenos Aires", maxPersonas: 6, precioPorNoche: 1500, propiedad: "Casa", habitaciones: 4, caracteristicas: "Casa amoblada con Wifi, Tv, lavarropas, terraza, quincho con pileta" },
    { nombre: "Mendoza", maxPersonas: 4, precioPorNoche: 2000, propiedad: "Departamento", habitaciones: 3, caracteristicas: "Departamento amoblado con Wifi, Tv y balcón con asador" },
    { nombre: "Córdoba", maxPersonas: 7, precioPorNoche: 2500, propiedad: "Duplex", habitaciones: 5, caracteristicas: "Duplex amoblado con Wifi, Tv y terraza y quincho" },
    { nombre: "Bariloche", maxPersonas: 4, precioPorNoche: 3000, propiedad: "Departamento", habitaciones: 2, caracteristicas: "Departamento amoblado con Wifi, Tv, lavarropas" }
];

const form = document.getElementById("miFormulario");
const mensajeDiv = document.getElementById("mensaje");
const detalleReservaDiv = document.getElementById("detalleReserva");

form.addEventListener("submit", manejarReserva);
document.getElementById("confirmarReserva").addEventListener("click", mostrarFormularioCorreo);
document.getElementById("cancelarReserva").addEventListener("click", cancelarReserva);

function manejarReserva(event) {
    event.preventDefault();
    limpiarMensaje();

    const reserva = obtenerDatosReserva();
    if (!validarFechas(reserva.checkin, reserva.checkout)) return;
    
    const ciudad = ciudades.find(c => c.nombre === reserva.localidad);
    if (!ciudad) return mostrarMensaje("Lugar no válido.", "error");
    if (reserva.personasCantidad > ciudad.maxPersonas) return mostrarMensaje(`Lo siento, no poseemos propiedades en ${ciudad.nombre} para esa cantidad de personas.`, "error");

    reserva.nights = calcularNoches(reserva.checkin, reserva.checkout);
    reserva.totalPrice = calcularPrecio(ciudad.precioPorNoche, reserva.nights);
    mostrarResumenReserva(ciudad, reserva);
    guardarReservaEnStorage(reserva);
    detalleReservaDiv.style.display = "block";
}

function mostrarFormularioCorreo() {
    detalleReservaDiv.style.display = "none";
    mensajeDiv.innerHTML = `
        <div class="form-group">
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" placeholder="Introduce tu correo">
            <button id="enviarEmail" class="boton">Enviar</button>
        </div>`;
    document.getElementById("enviarEmail").addEventListener("click", enviarCorreo);
}

function enviarCorreo() {
    const email = document.getElementById("email").value;
    email ? mostrarMensaje("Gracias, ya le enviamos un correo para seguir la reserva.", "success") 
        : mostrarMensaje("Por favor, ingrese un correo válido.", "error");
}

function cancelarReserva() {
    mostrarMensaje("Reserva cancelada", "error");
    detalleReservaDiv.style.display = "none";
}

function mostrarMensaje(mensaje, tipo) {
    mensajeDiv.className = `mensaje ${tipo}`;
    mensajeDiv.innerHTML = mensaje;
    mensajeDiv.style.display = "block";
}

function limpiarMensaje() {
    mensajeDiv.innerHTML = "";
    mensajeDiv.style.display = "none";
}

function obtenerDatosReserva() {
    return {
        localidad: document.getElementById("localidad").value,
        personasCantidad: parseInt(document.getElementById("personasCantidad").value),
        checkin: new Date(document.getElementById("checkin").value),
        checkout: new Date(document.getElementById("checkout").value)
    };
}

function validarFechas(checkin, checkout) {
    if (isNaN(checkin) || isNaN(checkout) || checkout <= checkin) {
        mostrarMensaje("Por favor, ingresa una fecha de entrada y salida válida.", "error");
        return false;
    }
    return true;
}

function calcularNoches(checkin, checkout) {
    return (checkout - checkin) / (1000 * 60 * 60 * 24);
}

function calcularPrecio(precioPorNoche, nights) {
    return precioPorNoche * nights;
}

function mostrarResumenReserva(ciudad, reserva) {
    const mensaje = `
        <strong>Resumen de la reserva:</strong><br>
        Lugar: ${ciudad.nombre}<br>
        Propiedad: ${ciudad.propiedad}<br>
        Habitaciones: ${ciudad.habitaciones}<br>
        Características: ${ciudad.caracteristicas}<br>
        Personas: ${reserva.personasCantidad}<br>
        Noches: ${reserva.nights}<br>
        Precio total: $${reserva.totalPrice} Pesos Argentinos`;
    mostrarMensaje(mensaje, "success");
}

function guardarReservaEnStorage(reserva) {
    localStorage.setItem("reserva", JSON.stringify(reserva));
}

function limpiarFormulario() {
    form.reset();
    detalleReservaDiv.style.display = "none";
    limpiarMensaje();
}

///Codigo al hacer click en la opcion "ver mas" de las cards

const infoCasa = document.getElementById("infoCasa")

infoCasa.addEventListener("click", ()=> {
    Swal.fire({
        title: "Casa Luxury",
        text: "Ubicada a las afueras de la Ciudad de Buenos Aires, es una acogedora y lujuriosa casa",
        imageUrl: "https://images.homify.com/v1526143386/p/photo/image/2556480/2.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Casa moderna en Buenos Aires",
        backdrop: `rgba(35, 124, 35)`
    });
}) 

const infoDuplex = document.getElementById("infoDuplex")

infoDuplex.addEventListener("click", ()=> {
    Swal.fire({
        title: "Duplex Confort",
        text: "Ubicado al norte de la ciudad de Cordoba, un increible duplex en una zona tranquila",
        imageUrl: "https://caster.com.pe/wp-content/uploads/2022/11/1.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Duplex Cordoba",
        backdrop: `rgba(35, 124, 35)`
    });
}) 


const images = [
    {
        url: "https://imgar.zonapropcdn.com/avisos/1/00/54/41/17/97/360x266/1933606966.jpg?isFirstImage=true",
        title: "Departamento Gold",
        description: "Ubicado en el centro de Mendoza donde estas cerca de todo lo que te puede ofrecer la ciudad"
    },
    {
        url: "https://departamentoenbariloche.com/wp-content/uploads/2021/05/studio-bustillo-12.jpg",
        title: "Departamento San Bernardo",
        description: "Ubicado en Bariloche, es imposible que no quieras conocer este departamento en esta hermosa ciudad"
    },
];

let currentIndex = 0;

function cambiodeImagen(index) {
    Swal.fire({
        title: images[index].title,
        text: images[index].description,
        imageUrl: images[index].url,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: images[index].title,
        showCancelButton: true,
        showConfirmButton: true,
        showDenyButton: true, 
        cancelButtonText: "Anterior",
        confirmButtonText: "Siguiente",
        denyButtonText: "Salir",
        backdrop: `rgba(35, 124, 35)`
    }).then((result) => {
        if (result.isConfirmed) {
            currentIndex = (currentIndex + 1) % images.length;
            cambiodeImagen(currentIndex);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            cambiodeImagen(currentIndex);
        }
    });
}

document.getElementById("infoDepto").addEventListener("click", () => {
    cambiodeImagen(currentIndex);
});