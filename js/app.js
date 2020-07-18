// Variables y constantes
const inicio = document.querySelector('#inicio');
const tiempo = document.querySelector('#tiempo');
const boton = document.querySelector('#boton');

let estado = false;
let contador = 1;

// Eventos
boton.addEventListener('click', iniciaContador);

// Funciones
function iniciaContador(){
    if(estado==false){
        var tiempoInicio = new Date();
        if(estado==false){
        console.log(tiempoInicio);
        let horas = tiempoInicio.getHours();
        let minutos = tiempoInicio.getMinutes();
        // console.log(horas + ':' + minutos);
        inicio.textContent = horas + ':' + minutos;
        // tiempoAcumulado.textContent = 0;
        tiempoInicio = setInterval(function(){
            tiempo.textContent = contador;
            contador++;
        }, 1000);
        boton.textContent = 'Detener';
        estado = true;
    }
    else{
        let tiempoFin = new Date();
        console.log(tiempoInicio);
        // let tiempoTotal = tiempoFin.getTime() - tiempoInicio.getTime();
        
        // window.alert(tiempoTotal);
    }
}