//let nota1 = parseInt(prompt("Ingrese su primer nota"));
//let nota2 = parseInt(prompt("Ingrese su segunda nota"));
//let nota3 = parseInt(prompt("Ingrese su tercera nota"));

//let promedioNotas = (nota1 + nota2 + nota3)/3;
//console.log(promedioNotas.toFixed(3)) 
// el .toFixed es para que no salgan tantos numeros, colocamos en las () hasta cuanto queremos 

let resultado;
switch(OPERACION){
    case "+":
        resultado = NUM1 + NUM2;
        break;
    case "-":
        resultado = NUM1 - NUM2;
        break;
    case "*":
        resultado = NUM1 * NUM2;
        break;
    case "/":
        resultado = NUM1 / NUM2;
        break;
    default:
        alert ("no estas ingresando una operacion valida")
        resultado = "no es valido capo"
}
alert("resultado es :" + resultado); 

