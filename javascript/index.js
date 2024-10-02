//crea una funcion para registrar personas: cantidad , fecha: inicio y fin , lugar: casa o depto o duplex,

function saludodeBienvenida (){
    console.log("Bienvenido a Bamboo tu mejor aliado para elegir la propiedad que desees en el lugar de tus sueños, a continuacion deberás completar un formulario de reserva para asi registrar tu solicitud")
}

saludodeBienvenida();

/*let nombreUsuario = prompt("Primero necesitaremos tu nombre:");
console.log("Hola " + nombreUsuario); */

function nombreUsuario (){
    usuario = prompt("Primero necesitaremos tu nombre:")
    console.log("Hola " + usuario)
}
nombreUsuario ();

let diaEntrada;
let diaSalida;
let cantPersonas;
let nombreLugar;
let nombrePropiedad;

function formularioReserva(){
    nombreLugar = prompt("¿A cual ciudad quieres ir?");
    console.log("Ciudad: " + nombreLugar)
    diaEntrada = prompt("¿Cual seria el dia de llegada? DD/MM/AAAA");
    console.log("Dia llegada: " + diaEntrada)
    diaSalida = prompt("Cual seria el dia de salida? DD/MM/AAAA");
    console.log("Dia salida: " + diaSalida)
        while (true) {
            nombrePropiedad = prompt("¿Qué propiedad deseas alquilar?\nEscribe: Casa, Departamento o Duplex").toLowerCase();
            cantPersonas = parseInt(prompt("¿Cuántas personas ingresarán?"));
            if (nombrePropiedad === "casa" && cantPersonas <= 10) {
                alert("Reserva exitosa para una casa.");
                console.log("Propiedad: Casa")
                console.log("Cantidad de personas: " + cantPersonas)
                break; 
            } else if (nombrePropiedad === "departamento" && cantPersonas <= 6) {
                alert("Reserva exitosa para un departamento.");
                console.log("Propiedad: Departamento")
                console.log("Cantidad de personas: " + cantPersonas)
                break; 
            } else if (nombrePropiedad === "duplex" && cantPersonas <= 5) {
                alert("Reserva exitosa para un dúplex.");
                console.log("Propiedad: Duplex")
                console.log("Cantidad de personas: " + cantPersonas)
                break; 
            } else {
                if (nombrePropiedad === "casa" && cantPersonas > 10) {
                    alert("Error: Una casa no puede alojar más de 10 personas. Por favor, ingresa una cantidad válida.");
                } else if (nombrePropiedad === "departamento" && cantPersonas > 6) {
                    alert("Error: Un departamento no puede alojar más de 6 personas. Por favor, ingresa una cantidad válida.");
                } else if (nombrePropiedad === "duplex" && cantPersonas > 5) {
                    alert("Error: Un dúplex no puede alojar más de 5 personas. Por favor, ingresa una cantidad válida.");
                } else {
                    alert("Error: Opciones ingresadas son erroneas");
                }
            }
        }
    }
    formularioReserva ();
    alert (usuario + " te mostramos a continuacion el resumen de tu reserva " + "\n1 Ubicacion: " + nombreLugar + "\n2 Dia de entrada: " + diaEntrada + "\n3 Dia de salida: " + diaSalida + "\n4 Cant de personas: " + cantPersonas + "\n5 Propiedad: " + nombrePropiedad + "\n Gracias por reservar con nosotros dentro de minutos nos comunicaremos contigo para seguir mas detalles de la reserva!")