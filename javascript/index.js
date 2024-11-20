///Codigo para una plataforma de reservas de propiedades en Argentina.
import { validarFechas, calcularNoches, calcularPrecio, guardarReservaEnStorage } from './utils.js';

//Datos de las ciudades
const ciudades = [
    { nombre: "Buenos Aires", maxPersonas: 6, precioPorNoche: 1500, propiedad: "Casa", habitaciones: 4, caracteristicas: "Casa amoblada con Wifi, Tv, lavarropas, terraza, quincho con pileta", backdrop: "rgba(35, 124, 35)" },
    { nombre: "Mendoza", maxPersonas: 4, precioPorNoche: 2000, propiedad: "Departamento", habitaciones: 3, caracteristicas: "Departamento amoblado con Wifi, Tv y balcón con asador", backdrop: "rgba(124, 35, 35)" },
    { nombre: "Córdoba", maxPersonas: 7, precioPorNoche: 2500, propiedad: "Duplex", habitaciones: 5, caracteristicas: "Duplex amoblado con Wifi, Tv y terraza y quincho", backdrop: "rgba(35, 35, 124)" },
    { nombre: "Bariloche", maxPersonas: 4, precioPorNoche: 3000, propiedad: "Departamento", habitaciones: 2, caracteristicas: "Departamento amoblado con Wifi, Tv, lavarropas", backdrop: "rgba(124, 124, 35)" }
];

//Simulador de obtener ciudades
async function obtenerCiudades() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(ciudades), 500);
    });
}

//DOM
const form = document.getElementById("miFormulario");
const mensajeDiv = document.getElementById("mensaje");
const detalleReservaDiv = document.getElementById("detalleReserva");

//Eventos
form.addEventListener("submit", manejarReserva);
document.getElementById("confirmarReserva").addEventListener("click", mostrarFormularioCorreo);
document.getElementById("cancelarReserva").addEventListener("click", cancelarReserva);

//Funciones
async function guardarReservaServidor(reserva) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = Math.random() > 0.1;
            if (exito) {
                resolve("Reserva guardada exitosamente en el servidor.");
            } else {
                reject("Error al guardar la reserva en el servidor.");
            }
        }, 1000); 
    });
}

async function manejarReserva(event) {
    event.preventDefault();
    limpiarMensaje();

    const reserva = obtenerDatosReserva();
    if (!reserva.localidad || !reserva.personasCantidad) {
        return mostrarMensaje("Por favor, completa todos los campos.", "error");
    }

    const fechaError = validarFechas(reserva.checkin, reserva.checkout);
    if (fechaError) return mostrarMensaje(fechaError, "error");

    const ciudad = ciudades.find(c => c.nombre === reserva.localidad);
    if (!ciudad) return mostrarMensaje("Lugar no válido.", "error");
    if (reserva.personasCantidad > ciudad.maxPersonas) {
        return mostrarMensaje(`Lo siento, no poseemos propiedades en ${ciudad.nombre} para esa cantidad de personas.`, "error");
    }

    reserva.nights = calcularNoches(reserva.checkin, reserva.checkout);
    reserva.totalPrice = calcularPrecio(ciudad.precioPorNoche, reserva.nights);

    try {
        const respuestaServidor = await guardarReservaServidor(reserva);
        mostrarMensaje(respuestaServidor, "success");
        mostrarResumenReserva(ciudad, reserva);
    } catch (error) {
        mostrarMensaje("Ocurrió un error: " + error, "error");
    }

    detalleReservaDiv.style.display = "block";

    // Llamar a la API del clima
    obtenerClima(reserva.localidad);
}

function mostrarFormularioCorreo() {
    detalleReservaDiv.style.display = "none";
    mensajeDiv.innerHTML = `
        <div class="form-group">
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" placeholder="Introduce tu correo">
            <button id="enviarEmail" class="boton">Enviar</button>
        </div>`;
    document.getElementById("enviarEmail").addEventListener("click", () => {
        const email = document.getElementById("email").value;
        email
            ? mostrarMensaje("Gracias, ya le enviamos un correo para seguir la reserva.", "success")
            : mostrarMensaje("Por favor, ingrese un correo válido.", "error");
    });
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

function limpiarFormulario() {
    form.reset();
    detalleReservaDiv.style.display = "none";
    limpiarMensaje();
    document.getElementById("descripcionClima").textContent = "";
}
window.limpiarFormulario = limpiarFormulario;


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
        description: "Ubicado en el centro de Mendoza donde estas cerca de todo lo que te puede ofrecer la ciudad",
        backdrop: "rgba(124, 35, 35)"
    },
    {
        url: "https://departamentoenbariloche.com/wp-content/uploads/2021/05/studio-bustillo-12.jpg",
        title: "Departamento San Bernardo",
        description: "Ubicado en Bariloche, es imposible que no quieras conocer este departamento en esta hermosa ciudad",
        backdrop: "rgba(35, 35, 124)"
    }
];

let currentIndex = 0;
function cambioDeImagen(index) {
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
        backdrop: images[index].backdrop
    }).then((result) => {
        if (result.isConfirmed) {
            currentIndex = (currentIndex + 1) % images.length;
            cambioDeImagen(currentIndex);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            cambioDeImagen(currentIndex);
        }
    });
}

document.getElementById("infoDepto").addEventListener("click", () => {
    cambioDeImagen(currentIndex);
});

//API del clima 
function obtenerClima(ciudad) {
    const coordenadas = {
        "Buenos Aires": { lat: -34.6037, lon: -58.3816 },
        "Mendoza": { lat: -32.889458, lon: -68.845839 },
        "Córdoba": { lat: -31.4201, lon: -64.1888 },
        "Bariloche": { lat: -41.1334722, lon: -71.3102778 },
    };

    const { lat, lon } = coordenadas[ciudad];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const clima = data.current_weather;
            mostrarClima(ciudad, clima);
        })
        .catch(error => {
            console.error("Error al obtener los datos del clima:", error);
            document.getElementById("descripcionClima").textContent = "No se pudo obtener el clima. Intenta más tarde.";
        });
}

function mostrarClima(ciudad, clima) {
    const descripcionClima = `
        <strong>Ciudad:</strong> ${ciudad}<br>
        <strong>Temperatura:</strong> ${clima.temperature}°C<br>
        <strong>Condición:</strong> ${clima.weathercode === 0 ? "Despejado" : "Nublado"}<br>
        <strong>Viento:</strong> ${clima.windspeed} km/h
    `;

    document.getElementById("descripcionClima").innerHTML = descripcionClima;
}
