// Variables y constantes
const inicio = document.querySelector('#inicio');
const tiempo = document.querySelector('#tiempo');
const botonContar = document.querySelector('#boton');
const botonCobrar = document.querySelector('#botonCobrar');
const modalTiempoTotal = document.querySelector('#tiempoTotal');
const modalPrecio = document.querySelector('#precio');
const numeroConsola = document.querySelector('#numero');
const modalNumeroConsola = document.querySelector('#numeroModal');

let consolaActiva = false;  // Se activa al oprimir en Contar
let contadorIntervalo;
let contador = 1;   // Cuenta los segundos trascurridos
let tiempo1;    // Tiempo obtenido al dar clic en el botón
let tiempoTotal;
let precioHora = 12; // Se obtendra de un input establecido por el admin
let precio;

// Eventos
botonContar.addEventListener('click', iniciaContador);
botonCobrar.addEventListener('click', reiniciaContador); // Debera registar los datos en la DB

/**Los valores a registrar en la DB deberan ser los del modal
 * para evitar que sean distintos al contador
 * 
 * El modal debera desabilitar el botón Cobrar tras un a tres minutos en espera
 * para evitar que corra demaciado tiempo al momento de cobrar
 */


// Funciones
function iniciaContador(){
    
    if(consolaActiva==false){
        tiempo1 = iniciaTiempo();
        // console.log(tiempo1);
    }
    else{
        dibujaModal();
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

    // Intervalo
    contadorIntervalo =  setInterval(function(){
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
    // Fin Intervalo

    botonContar.textContent = 'Detener';
    consolaActiva = true;
    return tiempoInicio.getTime();
}

// Crea la ventana del modal pra cobrar
function dibujaModal(){
    botonContar.setAttribute('data-target', '#modalCobro');
        let tiempoFin = new Date();
        tiempoTotal = (tiempoFin-tiempo1)/1000; // Dividido / 1000 por que son milisengundos
        // console.log('Tiempo: ' + tiempoTotal);  // Segundos
        convierteTiempo(tiempoTotal);
        precio = (tiempoTotal / 60) * (precioHora/60);  // Precio se divide en 60 para obtener precio por min.
        modalNumeroConsola.textContent = "Consola No. " + numeroConsola.textContent;
        modalPrecio.textContent = 'Precio: $' + precio;
        // console.log('Precio: ' + precio);
}

// Tras cerrar el conteo
function reiniciaContador(){
    clearInterval(contadorIntervalo);
    consolaActiva = false;
    inicio.textContent = '0:0';
    tiempo.textContent = '0:0:0';
    botonContar.textContent = 'Contar';
    botonContar.removeAttribute('data-target');
}

// Imprime los segundos en horas y minutos 
function convierteTiempo(tiempoConvertir){
    console.log(tiempoConvertir);
    let minutos, horas = 0;
    if(tiempoConvertir>5400){
        horas = tiempoConvertir/12;
        minutos = Math.round(tiempoConvertir%12);
    }
    else{
        minutos = Math.round(tiempoConvertir / 60);
    }
    modalTiempoTotal.textContent = 'Tiempo: ' + horas + ':' + minutos;
    console.log(horas + ' M ' + minutos);
}