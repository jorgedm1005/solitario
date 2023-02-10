/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["ova", "cua", "hex", "cir"];
// Array de número de cartas
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
//let numeros = [9, 10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes				
let tapete_inicial = document.getElementById("inicial");
let tapete_sobrantes = document.getElementById("sobrantes");
let tapete_receptor1 = document.getElementById("receptor1");
let tapete_receptor2 = document.getElementById("receptor2");
let tapete_receptor3 = document.getElementById("receptor3");
let tapete_receptor4 = document.getElementById("receptor4");

// Mazos
let mazo_inicial = [];
let mazo_sobrantes = [];
let mazo_receptor1 = [];
let mazo_receptor2 = [];
let mazo_receptor3 = [];
let mazo_receptor4 = [];

// Contadores de cartas
let cont_inicial = document.getElementById("cont_inicial");
let cont_sobrantes = document.getElementById("cont_sobrantes");
let cont_receptor1 = document.getElementById("cont_receptor1");
let cont_receptor2 = document.getElementById("cont_receptor2");
let cont_receptor3 = document.getElementById("cont_receptor3");
let cont_receptor4 = document.getElementById("cont_receptor4");
let cont_movimientos = document.getElementById("cont_movimientos");

// Tiempo
let cont_tiempo = document.getElementById("cont_tiempo"); // span cuenta tiempo
let segundos = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/


// Rutina asociada a boton reset: comenzar_juego
/*document.getElementById("reset").onclick = comenzar_juego;*/

// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
comenzar_juego();



// Desarrollo del comienzo de juego
function comenzar_juego() {
  /* Crear baraja, es decir crear el mazo_inicial. Este será un array cuyos 
  elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
  Sugerencia: en dos bucles for, bárranse los "palos" y los "números", formando
  oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
  el path correcto en la URL asociada al atributo src de <img>). Una vez creado
  el elemento img, inclúyase como elemento del array mazo_inicial. 
  */

  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/

  //crerar baraja
  let cartas;
  for (let i = 0; i < palos.length; i++) {
    for (let j = 0; j < numeros.length; j++) {
      cartas = numeros[j] + "-" + palos[i];
      mazo_inicial.push(cartas);
    }
  }

  barajar(mazo_inicial);  // Barajar

  cargar_tapete_inicial(mazo_inicial);

  // Dejar mazo_inicial en tapete inicial

  arrancar_tiempo(); // Arrancar el conteo de tiempo


  // Puesta a cero de contadores de mazos
  set_contador(cont_sobrantes, 0);
  set_contador(cont_receptor1, 0);
  set_contador(cont_receptor2, 0);
  set_contador(cont_receptor3, 0);
  set_contador(cont_receptor4, 0);
  set_contador(cont_movimientos, 0);
  set_contador(cont_inicial, mazo_inicial.length); // iniciar contador de cartas
  /*
    // Arrancar el conteo de tiempo
    arrancar_tiempo();*/

} // comenzar_juego

/**
    En el elemento HTML que representa el tapete inicial (variable tapete_inicial)
  se deben añadir como hijos todos los elementos <img> del array mazo.
  Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
  coordenadas top y left, algun atributo de tipo data-...
  Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/

function cargar_tapete_inicial(cartas) {
  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
  //cargar tapete inicial
  for (let i = 0; i < cartas.length; i++) {
    let carta = document.createElement("img");
    let numcarta = cartas[i].split("-")[0]; // numero de la carta
    carta.src = "imagenes/baraja/" + cartas[i] + ".png";
    if (cartas[i].includes("cir") || cartas[i].includes("hex")) { // dar clases a las cartas
      carta.setAttribute('color', 'negro')// si la carta es cir o hex ponerle negro
    } else {
      carta.setAttribute('color', 'rojo')// si la carta es cua o ova ponerle rojo
    }
    carta.setAttribute('numero', numcarta);
    carta.style.position = "absolute";
    carta.style.top = paso + "px";
    carta.style.left = paso + 3 + "px";
    carta.style.width = "60px";
    tapete_inicial.appendChild(carta);
    paso += 5;
    console.log(carta);
  }
} // cargar_tapete_inicial


function barajar(mazo) {
  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
  let i, j, carta;
  for (i = 0; i < mazo.length; i++) {
    j = Math.floor(Math.random() * mazo.length);
    carta = mazo[i];
    mazo[i] = mazo[j];
    mazo[j] = carta;
  }

} // barajar

function arrancar_tiempo() {
  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
  if (temporizador) clearInterval(temporizador);
  let hms = function () {
    let seg = Math.trunc(segundos % 60);
    let min = Math.trunc((segundos % 3600) / 60);
    let hor = Math.trunc((segundos % 86400) / 3600);
    let tiempo = ((hor < 10) ? "0" + hor : "" + hor)
      + ":" + ((min < 10) ? "0" + min : "" + min)
      + ":" + ((seg < 10) ? "0" + seg : "" + seg);
    set_contador(cont_tiempo, tiempo);
    segundos++;
  }
  segundos = 0;
  hms(); // Primera visualización 00:00:00
  temporizador = setInterval(hms, 1000);

} // arrancar_tiempo

function inc_contador(contador) {
  contador.innerHTML = +contador.innerHTML + 1;
} // inc_contador

/**
  Idem que anterior, pero decrementando 
*/
function dec_contador(contador) {
  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! ***/
  contador.innerHTML = +contador.innerHTML - 1;
} // dec_contador

function set_contador(contador, valor) {
  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
  contador.innerHTML = valor;


} // set_contador
