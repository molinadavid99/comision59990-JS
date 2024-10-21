//crea una funcion para registrar personas en una plataforma de alojamientos por ciudades
//se consulta ciudad, checkin y checkout, cant de personas y al final el resumen con el precio final.

function saludodeBienvenida (){
    console.log("Bienvenido a Bamboo tu mejor aliado para elegir la propiedad que desees en el lugar de tus sueños, a continuacion deberás completar un formulario de reserva para asi registrar tu solicitud")
}

saludodeBienvenida();

function nombreUsuario (){
    usuario = prompt("Primero necesitaremos tu nombre:")
    console.log("Hola " + usuario)
}
nombreUsuario ();

function formularioReserva() {
    let ciudadesDisponibles = [
        {
            ciudad: "Buenos Aires",
            propiedad: "Casa",
            nroHabitaciones: 4,
            maxPersonas: 5,
            ofrece: "Casa amoblada con Wifi, Tv, Lavaropas y terraza",
            precio: 8000,
            moneda: "Pesos Arg"
        },
        {
            ciudad: "Rio de Janeiro",
            propiedad: "Departamento",
            nroHabitaciones: 3,
            maxPersonas: 4,
            ofrece: "Departamento amoblado con Wifi, Tv y balcon",
            precio: 9500,
            moneda: "Pesos Arg"
        },
        {
            ciudad: "Ciudad de Mexico",
            propiedad: "Duplex",
            nroHabitaciones: 5,
            maxPersonas: 6,
            ofrece: "Duplex amoblado con Wifi, Tv y terraza",
            precio: 9900,
            moneda: "Pesos Arg"
        },
        {
            ciudad: "New York",
            propiedad: "Departamento",
            nroHabitaciones: 2,
            maxPersonas: 3,
            ofrece: "Departamento amoblado con Wifi, Tv, Lavaropas",
            precio: 10000,
            moneda: "Pesos Arg"
        }
        ];
        
    let continuar = true; 
    let ciudadSeleccionada = null;
            
    while (continuar) {
        let ciudadReservada = prompt("Elige una ciudad para buscar reservas o escribe 'salir' para terminar:\nBuenos Aires, Rio de Janeiro, Ciudad de Mexico, New York").toLowerCase();
                
        if (ciudadReservada === "salir") {
            continuar = false;
            alert("Has decidido salir.");
            return;
            }
        
        switch (ciudadReservada) {
            case "buenos aires":
                ciudadSeleccionada = ciudadesDisponibles[0];
                break;
            case "rio de janeiro":
                ciudadSeleccionada = ciudadesDisponibles[1];
                break;
            case "ciudad de mexico":
                ciudadSeleccionada = ciudadesDisponibles[2];
                break;
            case "new york":
                ciudadSeleccionada = ciudadesDisponibles[3];
                break;
            default: 
                alert("Ciudad no válida. Por favor, elige una opción correcta o escribe 'salir'.");
                continue;
            }
        
        if (ciudadSeleccionada) {
            alert(
                "En esa Ciudad tenemos disponible esto para vos: " + "\n" +
                "Ciudad: " + ciudadSeleccionada.ciudad + "\n" +
                "Propiedad: " + ciudadSeleccionada.propiedad + "\n" +
                "Habitaciones: " + ciudadSeleccionada.nroHabitaciones + "\n" +
                "Cant de personas: " + ciudadSeleccionada.maxPersonas + "\n" +
                "Ofrece: " + ciudadSeleccionada.ofrece + "\n" +
                "Precio por noche: " + ciudadSeleccionada.precio + " " + ciudadSeleccionada.moneda
                );
                break;
                }
            }
        
        let diaEntrada, diaSalida, cantidadNoches;
        while (true) {
            diaEntrada = prompt("¿Cuál es la fecha del checkin? Ingrésalo con el formato YYYY-MM-DD:");
            let fechaEntrada = new Date(diaEntrada);
        
            if (isNaN(fechaEntrada.getTime())) {
                alert("La fecha de checkin ingresada no es válida. Inténtalo de nuevo.");
                continue;
            }
        
            diaSalida = prompt("¿Cuál es la fecha del checkout? Ingrésalo con el formato YYYY-MM-DD:");
            let fechaSalida = new Date(diaSalida);
        
            if (isNaN(fechaSalida.getTime())) {
                alert("La fecha de checkout ingresada no es válida. Inténtalo de nuevo.");
                continue;
            } else if (fechaSalida <= fechaEntrada) {
                alert("La fecha de checkout debe ser posterior a la fecha de checkin.");
                continue;
            }
        
            let diferenciaTiempo = fechaSalida.getTime() - fechaEntrada.getTime();
            cantidadNoches = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
            break;
            }
        
        let cantPersonas;
        while (true) {
                cantPersonas = parseInt(prompt("¿Cuantas personas ingresaran a la propiedad?"));
                if (isNaN(cantPersonas)) {
                    alert("Por favor, ingresa un número válido.");
                    continue;
                }
        
                if (cantPersonas > ciudadSeleccionada.maxPersonas) {
                    alert("Error: No se permiten más de " + ciudadSeleccionada.maxPersonas + " personas.");
                } else {
                    alert("¡Perfecto! A continuación te mostraremos un resumen de tu reservación.");
                    break;
                }
            }
        
        let precioFinal = ciudadSeleccionada.precio * cantidadNoches;
            alert("Resumen de la reserva:" + "\n" +
            "Ciudad: " + ciudadSeleccionada.ciudad + "\n" +
            "Propiedad: " + ciudadSeleccionada.propiedad + "\n" +
            "Noches: " + cantidadNoches + "\n" +
            "Personas: " + cantPersonas + "\n" +
            "Precio total: " + precioFinal + " " + ciudadSeleccionada.moneda);
            
            console.log ("Resumen de la reserva:" + "\n" +
            "Ciudad: " + ciudadSeleccionada.ciudad + "\n" +
            "Propiedad: " + ciudadSeleccionada.propiedad + "\n" +
            "Noches: " + cantidadNoches + "\n" +
            "Personas: " + cantPersonas + "\n" +
            "Precio total: " + precioFinal + " " + ciudadSeleccionada.moneda);
        }

    formularioReserva ();
