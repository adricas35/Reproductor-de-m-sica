// Se declaran las variables globales
const fondo = document.querySelector(".app");
const imgCaratula = document.querySelector("#foto-caratula");
const titulo = document.querySelector(".titulo-cancion");
const artista = document.getElementById("artista");
const btnAnterior = document.querySelector("#ant");
const btnSiguiente = document.querySelector("#sig");
const audio = document.getElementById("audio");
const btnPlayPause = document.getElementById("play-pause");
let isPlaying = false;
let canciones = [];
let indiceActual = 0;


// Se realiza la funcion para mostrar la cancion 
function mostraCanciones(indice) {
    const cancion = canciones[indice];

    // Agregamos la foto de la caratula de fondo del reproductor
    fondo.style.setProperty('--fondo-caratula', `url('${cancion.caratula}')`);

    // Se agrega la imagen de la caractula de la canción seleccionada en el objeto img
    imgCaratula.setAttribute('src', cancion.caratula);
    // Agregamos el nombre de la cación seleccionada al titulo del reproductor
    titulo.textContent = cancion.nombre
    // Agregamos el nombre del artista seleccionado de la cación en el h3 del artista 
    artista.textContent = cancion.artista
}

// función para avanzar en la lista de canciones 
btnSiguiente.addEventListener("click", () => {
    // Esto lo ponemos por si en indice llega al ultimo retorne al primero
    if (indiceActual === canciones.length - 1) [
        indiceActual = 0
    ]
    else {
        indiceActual++
    }
    // Retornamos el valor de la funcion inical
    mostraCanciones(indiceActual);
})

// función para devolver la cación de la lista de caciones 
btnAnterior.addEventListener("click", () => {
    // Esto lo ponemos por si el indice esta en el primero y retorne al ultimo 
    if (indiceActual === 0) [
        indiceActual = canciones.length - 1
    ]
    else {
        indiceActual--;
    }
    mostraCanciones(indiceActual);
})


// Se agregar el evento "click" al botón para pausar y reproducir la cación 
btnPlayPause.addEventListener('click', () => {
    const cancion = canciones[indiceActual]
    audio.setAttribute('src', cancion.cancion)
    if (isPlaying) {
        // Si está sonando, pausa la reproducción y cambia el icono del botón
        audio.pause();
        btnPlayPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    } else {
        // Si no está sonando, reproduce y cambia el icono del botón
        audio.play();
        btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
    // Cambia el estado de la variable
    isPlaying = !isPlaying;
});


// Se consulta al json para cargar las canciones al cargar la pagina
document.addEventListener("DOMContentLoaded", () => {
    fetch("canciones.json")

        .then(response => response.json())

        .then(data => {
            canciones = data
            // Esto llama una funcion que va a mostrar los datos en la tabla
            mostraCanciones(indiceActual)
        })


        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });

})
