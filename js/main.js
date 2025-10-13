// Se declaran las variables globales
const fondo = document.querySelector(".app");
const imgCaratula = document.querySelector("#foto-caratula");
const titulo = document.querySelector(".titulo-cancion");
const artista = document.getElementById("artista");
const btnAleatorio = document.getElementById("aleatorio");
const btnAnterior = document.querySelector("#ant");
const btnSiguiente = document.querySelector("#sig");
const audio = document.getElementById("audio");
const btnPlayPause = document.getElementById("play-pause");
const barraProgress = document.getElementById("progress");
const inicio = document.getElementById("inicio");
const fin = document.getElementById("fin");
const contenedorCanciones = document.getElementById("contenedor-canciones");
let isPlaying = false;
let canciones = [];
let indiceActual = 0;
let aleatoria = false;


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


// Funcion para generar un número aleatorio entre 0 hasta que finalice la lista
btnAleatorio.addEventListener("click", () => {
    aleatoria = !aleatoria;

    if (aleatoria) {
        btnAleatorio.classList.add('active');
    } else {
        btnAleatorio.classList.remove('active');
    }

})


// función para avanzar en la lista de canciones 
btnSiguiente.addEventListener("click", () => {
    if (aleatoria) {
        // Multiplicar por la longitud de la lista para obtener un rango de 0 hasta (longitud del arreglo)
        // Math.floor() redondea hacia abajo para obtener un índice válido
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length));
        indiceActual = indiceAleatorio;
    } else {
        // Esto lo ponemos por si en indice llega al ultimo retorne al primero
        if (indiceActual === canciones.length - 1) [
            indiceActual = 0
        ]
        else {
            indiceActual++
        }
    }
    // Retornamos el valor de la funcion inical
    mostraCanciones(indiceActual);
    // REPRODUCIMOS LA CANCIÓN DESPUES DE ACTUALIZAR EL ÍNDICE O SI NO SE REPRODUCE LA CANCIÓN ANTERIOR EN EL ARREGLO AL CAMBIAR AL BOTÓN SEGUIENTE
    const cancion = canciones[indiceActual]
    // CAMBIAMOS LA CANCIÓN
    audio.setAttribute('src', cancion.cancion);

    audio.play()

    btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>'
    // MANTENEMOS EL BOOLEANO EN TRUE PARA QUE NO IMPORTE SI LA CANCIÓN ESTÁ PAUSADA O NO, SE REPRODUZCA SIEMPRE LA SIGUIENTE AL PRESIONAR EL BOTÓN DE NEXT
    isPlaying = true
})

// función para devolver la cación de la lista de caciones 
btnAnterior.addEventListener("click", () => {
    if (aleatoria) {
        // Multiplicar por la longitud de la lista para obtener un rango de 0 hasta (longitud - 1)
        // Math.floor() redondea hacia abajo para obtener un índice válido
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length + 1));
        // GUARDAMOS EN LA VARIABLE INDICEACTUAL EL VALOR ALEATORIO QUE SE GUARDA EN LA VARIABLE INDICE ALEATORIO
        indiceActual = indiceAleatorio;
    } else {
        // Esto lo ponemos por si el indice esta en el primero y retorne al ultimo 
        if (indiceActual === 0) [
            
            indiceActual = canciones.length - 1
        ]
        else {
            indiceActual--;
        }
    }
    mostraCanciones(indiceActual);
    // REPRODUCIMOS LA CANCIÓN DESPUES DE ACTUALIZAR EL ÍNDICE O SI NO SE REPRODUCE LA CANCIÓN ANTERIOR EN EL ARREGLO AL CAMBIAR AL BOTÓN ANTERIOR
    const cancion = canciones[indiceActual]
    // CAMBIAMOS LA CANCIÓN
    audio.setAttribute('src', cancion.cancion);

    audio.play()

    btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>'
    // MANTENEMOS EL BOOLEANO EN TRUE PARA QUE NO IMPORTE SI LA CANCIÓN ESTÁ PAUSADA O NO, SE REPRODUZCA SIEMPRE LA SIGUIENTE AL PRESIONAR EL BOTÓN DE NEXT
    isPlaying = true
})


// Se agregar el evento "click" al botón para pausar y reproducir la cación 
btnPlayPause.addEventListener('click', () => {

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


// SINCRONIZAR LA BARRA DE PROGRESO CON EL AUDIO DE LA CANCIÓN
// timeupdate ES UN EVENTO QUE SE DISPARA CUANDO SE ESTÁ REPRODUCIENDO LA CANCIÓN ES PROPIO DE LA ETIQUETA AUDIO
audio.addEventListener('timeupdate', () => {
    // 1. OBTENEMOS CUANTO TIEMPO LLEVA REPRODUCIDO EL AUDIO
    audio.currentTime;
    // 2. OBTENEMOS LA DURACIÓN TOTAL DE LA CANCIÓN
    audio.duration;
    // 3. CALCULAMOS EL PORCENTAJE DE PROGRESO, DIVIDIENDO EL TIEMPO ACTUAL POR LA DURACIÓN TOTAL DE LA CANCIÓN Y MULTIPLICANDO POR 100 Y LO GUARDAMOS EN UNA VARIABLE
    let porcentaje = 0;
    // 4. ACÁ DECIMOS QUE SI LA DURACIÓN TOTAL DE LA CANCIÓN ES 0 ENTONCES SE EJECUTE LA OPERACIÓN PARA ACTUALIZAR LA BARRA DE PROGRESO Y EL MOVIMIENTO DE LA BOLITA LO MULTIPLICAMOS ENTRE 100 PARA QUE SE VUELVA PORCENTAJE.
    if (audio.duration) {
        porcentaje = audio.currentTime / audio.duration * 100
    }
    // 5. VAMOS A ACTUALIZAR LA BARRA AMARILLA JUNTO CON LA BOLITA, IMPORTANTE AGREGAR EL % PARA QUE EL GRADIENT DE LA BARRA LO INTERPRETE CORRECTAMENTE
    barraProgress.style.setProperty('--value', `${porcentaje}%`);
    // 6. LE ASIGNAMOS EL VALOR GUARDADO EN PORCENTAJE A LA BARRA DE PROGRESO
    barraProgress.value = porcentaje


    // Se mueve dinamicamente los segundos, (aqui la variabe tiempoRestante es para que los min y segundos totales se vayan restando cuando la duracion actual vaya incrementando
    if (audio.duration) {
        let tiempoRestante = audio.duration - audio.currentTime;

        // Se muestra los minutos y segundos que estan en parte izquierda de la pagina
        let minutosActual = Math.floor(audio.currentTime / 60);
        let segundosActual = Math.floor(audio.currentTime % 60);
        // Se muestra los minutos y segundos que estan en la parte derecha de la pagina y se utiliza el Math para redonder el el numero decimal a entero y se realiza la operacion con el % para tomar el restante de la division es decir si la division dio 1.05 lo que hace el % es tomar el .05 entonces el  % toma los segundos de la cancion 
        let minutosTotal = Math.floor(tiempoRestante / 60);
        let segundosTotal = Math.floor(tiempoRestante % 60);

        // Si los segundos son menores que 10, agregamos un 0 al frente
        if (segundosActual < 10) {
            segundosActual = "0" + segundosActual;
        }

        if (segundosTotal < 10) {
            segundosTotal = "0" + segundosTotal;
        }
        // Se muestra los tiempos en pantalla
        inicio.textContent = minutosActual + ":" + segundosActual;
        fin.textContent = "-" + minutosTotal + ":" + segundosTotal;
    }
})


// SE CREA LA FUNCION PARA QUE AL MOVER LA BOLITA DE LA BARRA LA CANCIÓN SE ACTUALICE AL PUNTO EXACTO
barraProgress.addEventListener('input', () => {
    // TOMAMOS EL VALOR ACTUAL DE LA BARRA CON EL .VALUE QUE ES UN INPUT
    barraProgress.value;
    // DECLARAMOS UNA VARIABLE INICIALIZADA EN 0 PARA GUARDAR EL RESULTADO DE MULTIPLICAR Y EL VALOR ACTUAL DE LA BARRA POR LA DURACIÓN REAL DE LA CANCIÓN DIVIDO POR 100 MULTIPLICAMOS Y DIVIMOS ENTRE 100 PARA PASAR UN VALOR PORCENTUAL A SEGUNDOS REALES
    let nuevoTiempo = 0
    // GUARDAMOS EL RESULTADO EN LA VARIABLE
    nuevoTiempo = (barraProgress.value * audio.duration) / 100;
    // GUARDAMOS EN EL TIEMPO TRANSCURRIDO LA VARIABLE CON EL RESULTADO PARA ASÍ TERMINAR LA FUNCIÓN
    audio.currentTime = nuevoTiempo;
})


function mostrarCancionesEnLista(){
    canciones.forEach((cancion)=>{
        const fila = document.createElement('div');
        fila.classList.add('fila');

        const conImg = document.createElement('div');
        conImg.classList.add('cont-img');

        const img = document.createElement('img');
        img.setAttribute('src', cancion.caratula);
        img.setAttribute('alt', cancion.nombre);

        const contInfo = document.createElement('div');
        contInfo.classList.add('cont-info');

        const h3 = document.createElement('h3');
        h3.textContent = cancion.nombre;

        const h4 = document.createElement('h4');
        h4.textContent = cancion.artista;

        const boton = document.createElement('button');
        boton.innerHTML = '<i class="bi bi-play-fill"></i>'


        contenedorCanciones.appendChild(fila);

        fila.appendChild(conImg);
        fila.appendChild(contInfo);
        fila.appendChild(boton);
        conImg.appendChild(img);
        contInfo.appendChild(h3);
        contInfo.appendChild(h4);


    })
}


// Se consulta al json para cargar las canciones al cargar la pagina
document.addEventListener("DOMContentLoaded", () => {
    fetch("canciones.json")

        .then(response => response.json())

        .then(data => {
            canciones = data

            // Esto llama una funcion que va a mostrar los datos en la tabla
            mostraCanciones(indiceActual)

            // INICIALIZAMOS EL SRC AQUÍ PARA PODER USARLO EN EL BOTÓN DE REPRODUCIR.
            audio.setAttribute('src', canciones[indiceActual].cancion)

            mostrarCancionesEnLista()

        })


        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });

})
