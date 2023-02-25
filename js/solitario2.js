/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["ova", "cua", "hex", "cir"];
// Array de número de cartas
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [9, 10, 11, 12];

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

let tap = true; // variable para saber tapete de origen

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/


// Rutina asociada a boton reset: comenzar_juego
document.getElementById("reset").onclick = comenzar_juego;

// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
comenzar_juego();



// Desarrollo del comienzo de juego
function comenzar_juego() {

  // vaciar todos los tapetes
  mazo_inicial = [];

  //creo variables para las cartas de cada tapete

  var cartasIniciales = tapete_inicial.getElementsByTagName("img");
  var cartasSobrantes = tapete_sobrantes.getElementsByTagName("img");
  var cartasReceptorUno = tapete_receptor1.getElementsByTagName("img");
  var cartasReceptorDos = tapete_receptor2.getElementsByTagName("img");
  var cartasReceptorTres = tapete_receptor3.getElementsByTagName("img");
  var cartasReceptorCuatro = tapete_receptor4.getElementsByTagName("img");


  //vaciar todos los tapetes
  while (cartasIniciales.length > 0) {
    tapete_inicial.removeChild(cartasIniciales[0]);
  }

  while (cartasSobrantes.length > 0) {
    tapete_sobrantes.removeChild(cartasSobrantes[0]);
  }

  while (cartasReceptorUno.length > 0) {
    tapete_receptor1.removeChild(cartasReceptorUno[0]);
  }

  while (cartasReceptorDos.length > 0) {
    tapete_receptor2.removeChild(cartasReceptorDos[0]);
  }

  while (cartasReceptorTres.length > 0) {
    tapete_receptor3.removeChild(cartasReceptorTres[0]);
  }

  while (cartasReceptorCuatro.length > 0) {
    tapete_receptor4.removeChild(cartasReceptorCuatro[0]);
  }

  actualizar_inicial();
  actualizar_sobrante();


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
  actualizar_inicial();
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
  //cargar tapete inicia
  let paso = 5;
  for (let i = 0; i < cartas.length; i++) {
    let carta = document.createElement("img");
    let numcarta = cartas[i].split("-")[0]; // numero de la carta
    carta.src = "imagenes/baraja/" + cartas[i] + ".png";
    if (cartas[i].includes("cir")) { // dar clases a las cartas
      carta.setAttribute('color', 'cir')
      carta.setAttribute('colores', 'negro')
    } else if (cartas[i].includes("hex")) {
      carta.setAttribute('color', 'hex')
      carta.setAttribute('colores', 'negro')
    } else if (cartas[i].includes("cua")) {
      carta.setAttribute('color', 'cua')
      carta.setAttribute('colores', 'rojo')
    } else if (cartas[i].includes("ova")) {
      carta.setAttribute('color', 'ova')
      carta.setAttribute('colores', 'rojo')
    }


    carta.setAttribute('numero', numcarta);
    carta.style.position = "absolute";
    carta.style.top = paso + "px";
    carta.style.left = paso + 3 + "px";
    carta.style.width = "60px";
    carta.draggable = false;
    carta.setAttribute("ondragstart", "dragStart(event)")
    tapete_inicial.appendChild(carta);
    paso += 5;
    console.log(carta);
    if (i + 1 == cartas.length) {
      carta.setAttribute('draggable', 'true')
    } else {
      carta.setAttribute('draggable', 'false')
    }

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

function actualizar_inicial() {
  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
  //actualizar baraja
  let cartas = document.querySelectorAll("#inicial img");
  for (let i = 0; i < cartas.length; i++) {
    if (i + 1 == cartas.length) {
      cartas[i].setAttribute('draggable', 'true')
      cartas[i].setAttribute('id', 'ultima')
    } else {
      cartas[i].setAttribute('draggable', 'false')
    }

  }
  console.log(cartas)
} // actualizar_baraja

function actualizar_sobrante() {
  /*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
  //actualizar baraja
  let cartas = document.querySelectorAll("#sobrantes img");
  for (let i = 0; i < cartas.length; i++) {
    if (i + 1 == cartas.length) {
      cartas[i].setAttribute('draggable', 'true')
      cartas[i].setAttribute('id', 'ultimaSobrante')
    } else {
      cartas[i].setAttribute('draggable', 'false')
      cartas[i].setAttribute('id', 'sobrante')
    }

  }
  console.log(cartas)
} // actualizar_baraja

actualizar_inicial();
actualizar_sobrante();


//funcion para declarar el inicio del drag

function dragStart(event) {

  event.dataTransfer.setData("text", event.target.id);
  if (event.target.parentNode.id == "inicial") {
    tap = true;
  } else {
    tap = false;
  }
}

//let p = ["ova", "cua", "hex", "cir"];

function allowDrop(event) {

  // muestra por consola el atributo numero de la carta que se esta arrastrando


  if (event.target.id == "receptor1" && mazo_receptor1.length == 0 && tap) {//comprobamos si el tapete esta vacio y si viene del inicial
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == 12) { //comprobamos si la carta es un rey
      event.preventDefault();

    }
  } else if (event.target.id == "receptor2" && mazo_receptor2.length == 0 && tap) {
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == 12) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor3" && mazo_receptor3.length == 0 && tap) {
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == 12) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor4" && mazo_receptor4.length == 0 && tap) {
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == 12) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor1" && mazo_receptor1.length > 0 && tap) {//comprobamos si el tapete no esta vacio y si viene del inicial
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == mazo_receptor1[mazo_receptor1.length - 1].split("-")[0] - 1) { //comprobamos si la carta es menor q la del tapete
      event.preventDefault();

    }
  } else if (event.target.id == "receptor2" && mazo_receptor2.length > 0 && tap) {
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == mazo_receptor2[mazo_receptor2.length - 1].split("-")[0] - 1) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor3" && mazo_receptor3.length > 0 && tap) {
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == mazo_receptor3[mazo_receptor3.length - 1].split("-")[0] - 1) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor4" && mazo_receptor4.length > 0 && tap) {
    if (mazo_inicial[mazo_inicial.length - 1].split("-")[0] == mazo_receptor4[mazo_receptor4.length - 1].split("-")[0] - 1) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor1" && mazo_receptor1.length == 0 && !tap) {//comprobamos si el tapete esta vacio y si viene del sobrantes
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == 12) { //comprobamos si la carta es un rey
      event.preventDefault();

    }
  } else if (event.target.id == "receptor2" && mazo_receptor2.length == 0 && !tap) {
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == 12) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor3" && mazo_receptor3.length == 0 && !tap) {
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == 12) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor4" && mazo_receptor4.length == 0 && !tap) {
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == 12) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor1" && mazo_receptor1.length > 0 && !tap) {//comprobamos si el tapete no esta vacio y si viene del sobrantes
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == mazo_receptor1[mazo_receptor1.length - 1].split("-")[0] - 1) { //comprobamos si la carta es menor q la del tapete
      event.preventDefault();

    }
  } else if (event.target.id == "receptor2" && mazo_receptor2.length > 0 && !tap) {
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == mazo_receptor2[mazo_receptor2.length - 1].split("-")[0] - 1) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor3" && mazo_receptor3.length > 0 && !tap) {
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == mazo_receptor3[mazo_receptor3.length - 1].split("-")[0] - 1) {
      event.preventDefault();

    }
  } else if (event.target.id == "receptor4" && mazo_receptor4.length > 0 && !tap) {
    if (mazo_sobrantes[mazo_sobrantes.length - 1].split("-")[0] == mazo_receptor4[mazo_receptor4.length - 1].split("-")[0] - 1) {
      event.preventDefault();

    }
  } else if (event.target.id == "sobrantes") { //comprobamos si va a sobrantes
    event.preventDefault();
  }
  actualizar_inicial();
  actualizar_sobrante();

  console.log(mazo_inicial[mazo_inicial.length - 1].split("-")[0]);

}

function drop(event) {
  event.preventDefault();

  var data = event.dataTransfer.getData("text");

  if (event.target.id == "receptor1" && tap && mazo_inicial.length > 0) { //conreolo el tapete y si viene del inicial

    mazo_receptor1.push(mazo_inicial[mazo_inicial.length - 1]);
    mazo_inicial.pop();

    tapete_receptor1.appendChild(document.getElementById(data));
    tapete_receptor1.lastChild.style.top = "20%";
    tapete_receptor1.lastChild.style.left = "20%";
    actualizar_inicial();
  } else if (event.target.id == "receptor2" && tap && mazo_inicial.length > 0) {

    mazo_receptor2.push(mazo_inicial[mazo_inicial.length - 1]);
    mazo_inicial.pop();

    tapete_receptor2.appendChild(document.getElementById(data));
    tapete_receptor2.lastChild.style.top = "20%";
    tapete_receptor2.lastChild.style.left = "20%";
    actualizar_inicial();
  } else if (event.target.id == "receptor3" && tap && mazo_inicial.length > 0) {

    mazo_receptor3.push(mazo_inicial[mazo_inicial.length - 1]);
    mazo_inicial.pop();

    tapete_receptor3.appendChild(document.getElementById(data));
    tapete_receptor3.lastChild.style.top = "20%";
    tapete_receptor3.lastChild.style.left = "20%";
    actualizar_inicial();
  } else if (event.target.id == "receptor4" && tap && mazo_inicial.length > 0) {

    mazo_receptor4.push(mazo_inicial[mazo_inicial.length - 1]);
    mazo_inicial.pop();

    tapete_receptor4.appendChild(document.getElementById(data));
    tapete_receptor4.lastChild.style.top = "20%";
    tapete_receptor4.lastChild.style.left = "20%";
    actualizar_inicial();
  } else if (event.target.id == "sobrantes" && tap && mazo_inicial.length > 0) {

    mazo_sobrantes.push(mazo_inicial[mazo_inicial.length - 1]);
    mazo_inicial.pop();

    tapete_sobrantes.appendChild(document.getElementById(data));
    tapete_sobrantes.lastChild.style.top = "20%";
    tapete_sobrantes.lastChild.style.left = "20%";

    actualizar_inicial();
    actualizar_sobrante();


  } else if (event.target.id == "receptor1" && !tap && mazo_sobrantes.length) {  //conreolo el tapete y si viene del sobrantes
    actualizar_sobrante();
    mazo_receptor1.push(mazo_sobrantes[mazo_sobrantes.length - 1]);
    mazo_sobrantes.pop();

    tapete_receptor1.appendChild(document.getElementById(data));
    console.log(data);
    tapete_receptor1.lastChild.style.top = "20%";
    tapete_receptor1.lastChild.style.left = "20%";
    actualizar_sobrante();
  } else if (event.target.id == "receptor2" && !tap && mazo_sobrantes.length) {

    mazo_receptor2.push(mazo_sobrantes[mazo_sobrantes.length - 1]);
    mazo_sobrantes.pop();

    tapete_receptor2.appendChild(document.getElementById(data));
    tapete_receptor2.lastChild.style.top = "20%";
    tapete_receptor2.lastChild.style.left = "20%";
    actualizar_sobrante();
  } else if (event.target.id == "receptor3" && !tap && mazo_sobrantes.length) {

    mazo_receptor3.push(mazo_sobrantes[mazo_sobrantes.length - 1]);
    mazo_sobrantes.pop();

    tapete_receptor3.appendChild(document.getElementById(data));
    tapete_receptor3.lastChild.style.top = "20%";
    tapete_receptor3.lastChild.style.left = "20%";
    actualizar_sobrante();
  } else if (event.target.id == "receptor4" && !tap && mazo_sobrantes.length) {

    mazo_receptor4.push(mazo_sobrantes[mazo_sobrantes.length - 1]);
    mazo_sobrantes.pop();

    tapete_receptor4.appendChild(document.getElementById(data));
    tapete_receptor4.lastChild.style.top = "20%";
    tapete_receptor4.lastChild.style.left = "20%";
    actualizar_sobrante();
  }

  vaciar_sobrantes(tapete_sobrantes)


  function vaciar_sobrantes(tapete_sobrantes) {

    if (mazo_inicial.length == 0) { // Condicional que activa la función cuando el mazo inicial se acaba.
      var sobrantes = tapete_sobrantes.getElementsByTagName("img"); // Obtengo las cartas del tapete de sobrantes.

      for (i = 0; i < sobrantes.length; i++) { // Bucle que recorre los sobrantes, obtiene su número y su palo y los vuelve a añadir a mazo_inicial.
        var num = sobrantes[i].getAttribute("numero");
        var palo = sobrantes[i].getAttribute("color");

        mazo_inicial.push(num + "-" + palo); // Incluye la carta al mazo inicial de nuevo.
      }

      setTimeout(function () {
        while (sobrantes.length > 0) tapete_sobrantes.removeChild(sobrantes[0]); // Bucle que elimina las cartas del anterior tapete (sobrantes).
      }, 100);


      barajar(mazo_inicial); // Baraja el mazo inicial.
      cargar_tapete_inicial(mazo_inicial); // Carga el mazo inicial en el tapete inicial.
      actualizar_inicial();




    }
  }
}