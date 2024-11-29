const imagenPequeña = document.querySelectorAll('.imagenPequeña');
const imagenGrande = document.getElementById('imagenGrande');
const imagenDescripcion = document.getElementById('descripcion');

let indice = 0; 
// crear arreglo con las src de la imagen
const imagenes = [
    { src: "imagenes/hamburguesa.png", descripcion: "Hamburguesa deliciosa" },
    { src: "imagenes/pizza.png", descripcion: "Pizza con queso" },
    { src: "imagenes/papasFritas.jpg", descripcion: "Papas fritas crujientes" },
    { src: "imagenes/bebida.png", descripcion: "Hamburguesa deliciosa" },
    { src: "imagenes/coctel de frutas.jpg", descripcion: "Pizza con queso" },
    { src: "imagenes/bebida2.jpg", descripcion: "Papas fritas crujientes" }
];


// actualizar la imagen y la descripcion
function actualizarImagen(index) {
    const { src, descripcion } = imagenes[index];
    imagenGrande.src = src;
    imagenDescripcion.textContent = descripcion;
    imagenPequeña.forEach(imagen => imagen.classList.remove('efecto'));
    imagenPequeña[index].classList.add('efecto');
}

// cambiar la imagen cada 5 segundos
let cambiar = setInterval(() => {
    indice = (indice + 1) % imagenes.length; 
    actualizarImagen(indice);
}, 5000);

// cambiar manualmente con el click
imagenPequeña.forEach((imagen, index) => {

    imagen.addEventListener('click', () => {
        clearInterval(cambiar);  
        indice = index;       
        actualizarImagen(indice);  

        cambiar = setInterval(() => {
            indice = (indice + 1) % imagenes.length; 
            actualizarImagen(indice);
        }, 5000);
    });
});

function Siguiente() {
    // Incrementar el índice y asegurarse de que esté dentro del rango
    indice = (indice + 1) % imagenes.length; 
    actualizarImagen(indice);
}

function Anterior() {
    indice = (indice-1) % imagenes.length; 
    actualizarImagen(indice);
}

//btnSiguiente
const btnSiguiente = document.getElementById('btnSiguiente');
btnSiguiente.addEventListener('click', Siguiente);
//btnAnterior
const btnAnterior = document.getElementById('btnAnterior');
btnAnterior.addEventListener('click', Anterior);







actualizarImagen(indice);
