// Variables y constantes
const inicio = document.querySelector('#inicio');
const tiempo = document.querySelector('#tiempo');
const boton = document.querySelector('#boton');

let consolaActiva = false;  // Se activa al oprimir en Contar
let contador = 1;   // Cuenta los segundos trascurridos
let tiempo1;    // Tiempo obtenido al dar clic en el botón
let tiempoTotal;
let precioHora = 12; // Se obtendra de un input establecido por el admin
let precio;

// Eventos
boton.addEventListener('click', iniciaContador);

// Funciones
function iniciaContador(){
    
    if(consolaActiva==false){
        tiempo1 = iniciaTiempo();
        console.log(tiempo1);
    }
    else{
        let tiempoFin = new Date();
        tiempoTotal = (tiempoFin-tiempo1)/1000; // Dividido / 1000 por que son milisengundos
        console.log('Tiempo: ' + tiempoTotal);  // Segundos
        precio = (tiempoTotal / 60) * (precioHora/60);
        console.log('Precio: ' + precio);
    }
}

function iniciaTiempo(){
    var tiempoInicio = new Date();
    let HoraInicio = tiempoInicio.getHours();
    var amPm;
    if(HoraInicio>12){
        HoraInicio-=12;
        amPm = 'pm';
    }
    else{
        amPm = 'am';
    }
    let minutos = tiempoInicio.getMinutes();
    inicio.textContent = HoraInicio + ':' + minutos + amPm;
    
    let hora =0, minuto = 0, segundo = 1;
    /* tiempoInicio =  */setInterval(function(){
        if(segundo==60){
            // minuto = Math.round(segundo/60);
            minuto++;
            // segundo = segundo%60;
            segundo = 0;
            if(minuto==60){
                // hora = Math.round(minuto/60);
                hora++;
                // minuto = hora%60;
                minuto = 0;
            }
        }
        tiempo.textContent = hora + ':' + minuto + ':' + segundo;
        contador++;
        segundo++;
    }, 1000);

    boton.textContent = 'Detener';
    consolaActiva = true;
    return tiempoInicio.getTime();
}