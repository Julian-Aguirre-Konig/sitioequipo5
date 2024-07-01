const palabras = ["SEMAFORO", "PEATON", "CASCO", "CRUCE", "CINTURON"];
const gridSize = 10;
let grid;
let encontradas = 0;
let seleccionadas = [];

function generarGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
}

function colocarPalabra(palabra) {
    const direcciones = [[1, 0], [0, 1], [1, 1], [1, -1]];
    let colocada = false;
    while (!colocada) {
        const direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
        let fila = Math.floor(Math.random() * gridSize);
        let columna = Math.floor(Math.random() * gridSize);
        let puedeColocar = true;
        for (let i = 0; i < palabra.length; i++) {
            const nuevaFila = fila + i * direccion[0];
            const nuevaColumna = columna + i * direccion[1];
            if (nuevaFila < 0 || nuevaFila >= gridSize || nuevaColumna < 0 || nuevaColumna >= gridSize || (grid[nuevaFila][nuevaColumna] !== '' && grid[nuevaFila][nuevaColumna] !== palabra[i])) {
                puedeColocar = false;
                break;
            }
        }
        if (puedeColocar) {
            for (let i = 0; i < palabra.length; i++) {
                const nuevaFila = fila + i * direccion[0];
                const nuevaColumna = columna + i * direccion[1];
                grid[nuevaFila][nuevaColumna] = palabra[i];
            }
            colocada = true;
        }
    }
}

function llenarGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
}

function crearTabla() {
    const tabla = document.createElement('table');
    for (let i = 0; i < gridSize; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < gridSize; j++) {
            const celda = document.createElement('td');
            celda.textContent = grid[i][j];
            celda.dataset.fila = i;
            celda.dataset.columna = j;
            celda.addEventListener('click', seleccionarCelda);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    document.getElementById('sopa-de-letras').appendChild(tabla);
}

function seleccionarCelda(event) {
    const celda = event.target;
    const fila = celda.dataset.fila;
    const columna = celda.dataset.columna;
    const index = seleccionadas.findIndex(item => item.fila === fila && item.columna === columna);

    if (index === -1) {
        seleccionadas.push({ fila, columna });
        celda.classList.add('selected');
    } else {
        seleccionadas.splice(index, 1);
        celda.classList.remove('selected');
    }
    comprobarPalabra();
}

function comprobarPalabra() {
    const seleccionadasOrdenadas = seleccionadas.sort((a, b) => {
        if (a.fila === b.fila) {
            return a.columna - b.columna;
        } else {
            return a.fila - b.fila;
        }
    });

    let palabrasEncontradas = 0;
    palabras.forEach(palabra => {
        let palabraEncontrada = true;
        for (let i = 0; i < palabra.length; i++) {
            const { fila, columna } = seleccionadasOrdenadas[i] || {};
            if (!fila || !columna || grid[fila][columna] !== palabra[i]) {
                palabraEncontrada = false;
                break;
            }
        }
        if (palabraEncontrada) {
            seleccionadasOrdenadas.forEach(({ fila, columna }) => {
                document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`).classList.add('found');
            });
            palabrasEncontradas++;
            seleccionadas = [];
        }
    });

    if (palabrasEncontradas === palabras.length) {
        mostrarMensaje("¡Felicidades! Has encontrado todas las palabras.");
        setTimeout(reiniciarJuego, 2000);
    }
}

function mostrarMensaje(mensaje) {
    const mensajeElement = document.createElement('div');
    mensajeElement.classList.add('mensaje');
    mensajeElement.textContent = mensaje;
    document.getElementById('mensaje-container').appendChild(mensajeElement);

    // Ocultar el mensaje después de unos segundos
    setTimeout(() => {
        mensajeElement.remove();
    }, 1500);
}

function reiniciarJuego() {
    document.getElementById('sopa-de-letras').innerHTML = '';
    encontradas = 0;
    seleccionadas = [];
    generarGrid();
    palabras.forEach(palabra => colocarPalabra(palabra));
    llenarGrid();
    crearTabla();
}

reiniciarJuego();
