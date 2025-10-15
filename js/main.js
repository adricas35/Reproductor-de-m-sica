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
const btnList = document.querySelector('#btn-lista');
const contenedorCanciones = document.getElementById("contenedor-canciones");
const btnRegreso = document.getElementById("btn-regreso");
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
    // Se cambia el valor de aleatoria a su inverso
    aleatoria = !aleatoria;
    // Se valida si aleatoria es true y se agrega la clase activa al boton
    if (aleatoria) {
        btnAleatorio.classList.add('active');
        // Si aleatoria es false remueve la clase activa del boton
    } else {
        btnAleatorio.classList.remove('active');
    }

})


// función para avanzar en la lista de canciones 
btnSiguiente.addEventListener("click", () => {
    // Se valida si aleatoria es true
    if (aleatoria) {
        // Se busca un indice de forma aleatoria 
        // Math.floor() redondea hacia abajo para obtener un índice válido
        // Math.random() da valores aleatorios
        // Se multiplica por la longitud de la lista para obtener un rango de 0 hasta (longitud del arreglo)
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length));
        // Se asigna el indice aleatorio al indice actual para visualizar la cancion
        indiceActual = indiceAleatorio;
    } else {
        // Esto lo ponemos por si en indice llega al ultimo retorne al primero
        if (indiceActual === canciones.length - 1) [
            indiceActual = 0
        ]
        // Si no entonces el indice actual aumenta al siguiente valor
        else {
            indiceActual++
        }
    }
    // Retornamos el valor de la funcion inical
    mostraCanciones(indiceActual);
    // Reproducimos la canción despues de actualizar el índice o si no se reproduce la canción anterior en el arreglo al cambiar al botón seguiente
    const cancion = canciones[indiceActual]
    // Cambiamos la canción
    audio.setAttribute('src', cancion.cancion);
    // Se reproduce la cancion
    audio.play()
    // Se cambia el icono de play al icono de pausa
    btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>'
    // Mantenemos el booleano en true para que no importe si la canción está pausada o no, se reproduzca siempre la siguiente al presionar el botón de next
    isPlaying = true
})


// función para devolver la cación de la lista de caciones 
btnAnterior.addEventListener("click", () => {
    if (aleatoria) {
        // Se busca un indice de forma aleatoria 
        // Math.floor() redondea hacia abajo para obtener un índice válido
        // Math.random() da valores aleatorios
        // Se multiplica por la longitud de la lista para obtener un rango de 0 hasta (longitud del arreglo)
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length + 1));
        // Guardamos en la variable indiceactual el valor aleatorio que se guarda en la variable indice aleatorio
        indiceActual = indiceAleatorio;
    } else {
        // Esto lo ponemos por si el indice esta en el primero y retorne al ultimo 
        if (indiceActual === 0) [
            indiceActual = canciones.length - 1
        ]
        // Si no entonces el indice actual disminuye al anterior valor
        else {
            indiceActual--;
        }
    }
    mostraCanciones(indiceActual);
    // Reproducimos la canción despues de actualizar el índice o si no se reproduce la canción anterior en el arreglo al cambiar al botón anterior
    const cancion = canciones[indiceActual]
    // Cambiamos la canción
    audio.setAttribute('src', cancion.cancion);
    // Se reproduce la cancion
    audio.play()
    // Se cambia el icono de play al icono de pausa
    btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>'
    // Mantenemos el booleano en true para que no importe si la canción está pausada o no, se reproduzca siempre la siguiente al presionar el botón de next
    isPlaying = true
})


// Se agregar el evento "click" al botón para pausar y reproducir la cación 
btnPlayPause.addEventListener('click', () => {
    // Si la variable isPlaying esta en true pausamos la musica y cambiamos el icono de play a pausa
    if (isPlaying) {
        // Si está sonando, pausa la reproducción y cambia el icono del botón a play
        audio.pause();
        btnPlayPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    } else {
        // Si no está sonando, reproduce y cambia el icono del botón a pausa
        audio.play();
        btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
    // Cambia el estado de la variable
    isPlaying = !isPlaying;
});


// Sincronizar la barra de progreso con el audio de la canción
// Timeupdate es un evento que se dispara cuando se está reproduciendo la canción es propio de la etiqueta audio
audio.addEventListener('timeupdate', () => {
    // Obtenemos cuanto tiempo lleva reproducido el audio
    audio.currentTime;
    // Obtenemos la duración total de la canción
    audio.duration;
    // Calculamos el porcentaje de progreso, dividiendo el tiempo actual por la duración total de la canción y multiplicando por 100 y lo guardamos en una variable
    let porcentaje = 0;
    // Acá decimos que si la duración total de la canción es 0 entonces se ejecute la operación para actualizar la barra de progreso y el movimiento de la bolita lo multiplicamos entre 100 para que se vuelva porcentaje.
    if (audio.duration) {
        porcentaje = audio.currentTime / audio.duration * 100
    }
    // Vamos a actualizar la barra amarilla junto con la bolita, importante agregar el % para que el gradient de la barra lo interprete correctamente
    barraProgress.style.setProperty('--value', `${porcentaje}%`);
    // Le asignamos el valor guardado en porcentaje a la barra de progreso
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


// Se crea la funcion para que al mover la bolita de la barra la canción se actualice al punto exacto
barraProgress.addEventListener('input', () => {
    // Tomamos el valor actual de la barra con el .value que es un input
    barraProgress.value;
    // Declaramos una variable inicializada en 0 para guardar el resultado de multiplicar y el valor actual de la barra por la duración real de la canción divido por 100 multiplicamos y divimos entre 100 para pasar un valor porcentual a segundos reales
    let nuevoTiempo = 0
    // Guardamos el resultado en la variable
    nuevoTiempo = (barraProgress.value * audio.duration) / 100;
    // Guardamos en el tiempo transcurrido la variable con el resultado para así terminar la función
    audio.currentTime = nuevoTiempo;
})


// Se crea evento click en el boton de la lista para visualizar y ocultar la lista de canciones
btnList.addEventListener('click', () => {
    const containerList = document.querySelector('.cont-lista');
    containerList.classList.add('lista-visible')
});


// Se crea el evento click en el boton regresar para ocultar la lista de canciones
btnRegreso.addEventListener('click', ()=>{
    const containerList = document.querySelector('.cont-lista');
    containerList.classList.remove('lista-visible');
})


// Se crea la funcion para mostrar la lista de canciones 
function mostrarCancionesEnLista() {
// Se recorre el arreglo de la lista de canciones 
    canciones.forEach((cancion, indice) => {
        // Se crea el div contenedor de la informacion de la cancion
        const fila = document.createElement('div');
        fila.classList.add('fila');
        // Se crea el contenedor de la imagen de la cancion
        const conImg = document.createElement('div');
        conImg.classList.add('cont-img');
        // Se crea el elemento img
        const img = document.createElement('img');
        // Se le agrega la ruta de la caratula de la cancion 
        img.setAttribute('src', cancion.caratula);
        // Se le agrega el atributo alt con el nombre de la cancion
        img.setAttribute('alt', cancion.nombre);

        // Se crea el contenedor del detalle de la cancion 
        const contInfo = document.createElement('div');
        contInfo.classList.add('cont-info');
        // Se crea la etiqueta con el nombre de la cancion
        const h3 = document.createElement('h3');
        h3.textContent = cancion.nombre;
        // Se crea la etiqueta con el nombre del artista
        const h4 = document.createElement('h4');
        h4.textContent = cancion.artista;
        // Se crea el boton para reproducir la cancion
        const boton = document.createElement('button');
        boton.innerHTML = '<i class="bi bi-play-fill"></i>'
        // Se crea el evento click para reproducir la cancion 
        boton.addEventListener('click', ()=>{
            // Se le asigna el indice de esta cancion al indice actual
            indiceActual= indice
            // Se muestra la cancion seleccionada
            mostraCanciones(indiceActual);
            // Se asigna la cancion para reproducir 
            audio.setAttribute('src', cancion.cancion);
            // Se reproduce la cancion
            audio.play();
            // Se cambia el icono del boton de play a pausa
            boton.innerHTML = '<i class="bi bi-pause-fill"></i>'
            // Se cambia el icono del boton en el reproducto de play a pausa
            btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>'
            // Se cambia la variable isPlaying a true
            isPlaying= true
            // Se oculta la lista de cancion para mostrar el reproductor
           const containerList = document.querySelector(".cont-lista");
           containerList.classList.remove('lista-visible');
        })


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

            // Inicializamos el src aquí para poder usarlo en el botón de reproducir.
            audio.setAttribute('src', canciones[indiceActual].cancion)

            // Se llama la funcion que va a mostrar la lista de canciones 
            mostrarCancionesEnLista()

        })


        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });

})
