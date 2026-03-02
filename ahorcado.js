// este es el arreglo con las palabras
const palabras = ["Amistad", "Montaña", "Esperanza", "Felicidad", "Viaje", "Estrella", "Aventura", "Confianza"];

//este es un arreglo de con las direcciones de las imagenes
const imagenes = [
    { src: "imagenesAhorcado/img0.png" },
    { src: "imagenesAhorcado/img1.png" },
    { src: "imagenesAhorcado/img2.png" },
    { src: "imagenesAhorcado/img3.png" },
    { src: "imagenesAhorcado/img4.png" },
    { src: "imagenesAhorcado/img5.png" },
    { src: "imagenesAhorcado/img6.png" }, 
];




let palabra = '';  
let aciertos = 0;  
let errores = 0;   
let tiempoRestante = 60;
var gano = false;
let intervalo;

//este es el areglo con las letras
const btnLetras = document.querySelectorAll("#letras button");

// deshabilitar todos los botones de letras al cargar la página
deshabilitarBotones();


// funcion para obtener un número aleatorio dentro de un rango
function ObtenerRandom(maximo, minimo) {
    const amplitud = maximo - minimo;
    const valorAzar = Math.floor(Math.random() * amplitud) + minimo;
    return valorAzar;
}

// función para iniciar el juego
function IniciarJuego() {

    iniciarTemporizador()
    habilitarBotones();

    aciertos = 0;
    errores = 0;
    gano = false; 

    const parrafoPalabra = document.getElementById('txtPalabra');
    parrafoPalabra.innerHTML = '';

    const mensaje = document.getElementById('mensaje');
    mensaje.innerHTML = '';

   const IntentosRestantes = document.getElementById('IntentosRestantes');
   IntentosRestantes.innerText = "Intentos Restantes: ";

    const source = `imagenesAhorcado/img${errores}.png`;  //cambia la imagen segun el error.
    const imagen = document.getElementById('imagenAhorcado');
    imagen.src = source;

    
    const cantidadPalabras = palabras.length;  // longitud del arreglo de palabras
    const valorAzar = ObtenerRandom(0, cantidadPalabras);  // Obtiene un valor aleatorio para la palabra
    palabra = palabras[valorAzar];  // Asigna la palabra seleccionada al azar
    const cantidadLetras = palabra.length;  // numero de letras de la palabra

    console.log(cantidadLetras); 
    console.log(palabra);        



    // crear los elementos span para cada letra de la palabra
    for (let i = 0; i < cantidadLetras; i++) {
        const span = document.createElement('span');
        parrafoPalabra.appendChild(span); 
    }
}



// agregar evento click a los botones
for(let i = 0; i<btnLetras.length; i++){
    btnLetras[i].addEventListener('click', clickLetras);
}




// funcion que se ejecuta cuando se hace clic en una letra
function clickLetras(event) {

    const button = event.target;  // esto es para obtener el boton que fue clickeado
    button.disabled = true;  // desactivar el botón
    const letra = button.innerHTML.toLowerCase();  // obtener la letra del botón
    let palabras = palabra.toLowerCase();  // convertir la palabra a minúsculas
    let existe = false;
    const spans = document.querySelectorAll('#txtPalabra span');  // Seleccionar los spans de las letras

    // verifica si la letra existe en la palabra
    for (let i = 0; i < palabras.length; i++) {
        if (letra == palabras[i]) {
            spans[i].innerHTML = letra;  // muestra la letra en el span correspondiente
            aciertos++;  // Incrementar el contador de aciertos
            existe = true;
        }
    }

    // si la letra no existe, incrementar los errores
    if (!existe) {
        errores++;
        const source = imagenes[errores].src;  //aqui cambiamos la imagen de acuerdo con el arreglo
        console.log(source)
        const imagen = document.getElementById('imagenAhorcado');
        imagen.src = source;

        let aciertosRestantes = 6 - errores;
        const IntentosRestantes = document.getElementById('IntentosRestantes');
        IntentosRestantes.innerText = `Intentos Restantes: ${aciertosRestantes}`;

        
        // verificamos si el jugador ha perdido por que si llega a 6 perdio
        if (errores >= 6) {
            const mensaje = document.getElementById('mensaje');
            mensaje.innerText = `Perdiste. ¡Intenta de nuevo! La palabra era ${palabras}`;
            deshabilitarBotones(); // y bloqueamos las letras 
            clearInterval(intervalo);//si perdio detenemos el contador
        }
    }

    // Verificar si el jugador ha ganado
    if (aciertos == palabra.length) {
        gano = true;
        const mensaje = document.getElementById('mensaje');
        mensaje.innerText = "¡Felicidades! ¡Salvaste al ahorcado!";
        deshabilitarBotones();
        clearInterval(intervalo);
    }

    console.log(palabra); 
}



//habilitar los botones de letras cuando se haga clic en "Jugar"
function habilitarBotones(){
    for(let i = 0; i<btnLetras.length; i++){
        btnLetras[i].disabled = false;
    }   
}


function deshabilitarBotones(){
    for(let i = 0; i<btnLetras.length; i++){
        btnLetras[i].disabled = true;
    }   
}



console.log(gano);



function iniciarTemporizador() {
    if (intervalo) {
        clearInterval(intervalo);  // si ya hay un intervalo activo, lo detiene
    }

    const tiempoRestanteP = document.getElementById('tiempoRestante');
    tiempoRestante = 60;
    tiempoRestanteP.innerText = `Tiempo: ${tiempoRestante}`;

    intervalo = setInterval(() => {
        tiempoRestante--; // Resta 1 segundo
        tiempoRestanteP.innerText = `Tiempo: ${tiempoRestante}`;


        // Si el tiempo se agota y el jugador no ha ganado
        if (tiempoRestante <= 0 && !gano) {
            const mensaje = document.getElementById('mensaje');
            mensaje.innerText = `Perdiste. ¡Intenta de nuevo! La palabra era ${palabra}`;
            deshabilitarBotones(); 
            clearInterval(intervalo); //lo detengo
        }
    }, 1000); 
}

const botonJugar = document.getElementById('btnJugar');
botonJugar.addEventListener('click', IniciarJuego);


