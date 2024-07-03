const palabras = [
    { palabra: "educacion", detalle: "La educación vial es fundamental para prevenir accidentes." },
    { palabra: "vial", detalle: "La seguridad vial incluye las normas y señales de tráfico." },
    { palabra: "seguridad", detalle: "La seguridad es clave para evitar accidentes en la vía." },
    { palabra: "peaton", detalle: "Los peatones deben cruzar siempre por las esquinas y zonas habilitadas." },
    { palabra: "bicicleta", detalle: "El uso de casco es esencial para los ciclistas." }
];

let palabrasRestantes = palabras.length;
let palabrasAdivinadas = [];
let palabraActualIndex = 0;
let palabra = palabras[palabraActualIndex].palabra;
let intentos = 6;
let letrasAdivinadas = [];
let palabraMostrar = "_".repeat(palabra.length);
let inicioTiempo = Date.now();

document.getElementById("palabra").innerText = palabraMostrar;
document.getElementById("palabrasRestantes").innerText = palabrasRestantes;

function generarTeclado() {
    const teclado = document.getElementById("teclado");
    const filas = [
        "qwertyuiop",
        "asdfghjklñ",
        "zxcvbnm"
    ];
    teclado.innerHTML = "";
    for (let fila of filas) {
        const filaDiv = document.createElement("div");
        filaDiv.className = "row";
        for (let letra of fila) {
            const boton = document.createElement("button");
            boton.innerText = letra;
            boton.className = "key";
            boton.onclick = () => adivinarLetra(letra);
            filaDiv.appendChild(boton);
        }
        teclado.appendChild(filaDiv);
    }
}

function adivinarLetra(letra) {
    if (letrasAdivinadas.includes(letra)) {
        alert("Ya has adivinado esa letra.");
        return;
    }

    letrasAdivinadas.push(letra);
    const boton = Array.from(document.querySelectorAll(".key")).find(b => b.innerText === letra);
    boton.classList.add("usada");
    boton.disabled = true;

    if (palabra.includes(letra)) {
        let nuevaPalabraMostrar = "";
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                nuevaPalabraMostrar += letra;
            } else {
                nuevaPalabraMostrar += palabraMostrar[i];
            }
        }
        palabraMostrar = nuevaPalabraMostrar;
        document.getElementById("palabra").innerText = palabraMostrar;

        if (palabraMostrar === palabra) {
            palabrasRestantes--;
            palabrasAdivinadas.push(palabra);
            document.getElementById("palabrasRestantes").innerText = palabrasRestantes;
            mostrarPopup(true);
        }
    } else {
        intentos--;
        document.getElementById("intentos").innerText = intentos;

        if (intentos === 0) {
            mostrarPopup(false);
        }
    }
}

function mostrarPopup(acertado) {
    const popup = document.getElementById("popup");
    const resultado = document.getElementById("resultado");
    const detalle = document.getElementById("detalle");
    const tiempo = document.getElementById("tiempo");

    const tiempoTranscurrido = Math.round((Date.now() - inicioTiempo) / 1000);
    tiempo.innerText = `Tiempo: ${tiempoTranscurrido} segundos`;

    if (acertado) {
        resultado.innerText = "¡Felicidades! Has adivinado la palabra.";
        detalle.innerText = palabras[palabraActualIndex].detalle;
    } else {
        resultado.innerText = "¡Intento fallido!";
        detalle.innerText = "Aquí tienes una pista: la palabra está relacionada con la educación vial.";
    }

    popup.classList.add("visible");
}

function continuarJuego() {
    const popup = document.getElementById("popup");
    popup.classList.remove("visible");

    if (palabrasRestantes > 0) {
        reiniciarJuego();
    } else {
        // Aquí podrías redirigir o realizar alguna acción de finalización del juego
        alert("¡Felicidades! Has adivinado todas las palabras.");
    }
}

function salirJuego() {
    const popup = document.getElementById("popup");
    popup.classList.remove("visible");

    // Redirigir a la página de juegos
    window.location.href = "../../juegos.html";
}

function reiniciarJuego() {
    palabraActualIndex++;
    if (palabraActualIndex >= palabras.length) {
        palabraActualIndex = 0;
    }

    palabra = palabras[palabraActualIndex].palabra;
    while (palabrasAdivinadas.includes(palabra)) {
        palabraActualIndex++;
        if (palabraActualIndex >= palabras.length) {
            palabraActualIndex = 0;
        }
        palabra = palabras[palabraActualIndex].palabra;
    }

    intentos = 6;
    letrasAdivinadas = [];
    palabraMostrar = "_".repeat(palabra.length);
    document.getElementById("palabra").innerText = palabraMostrar;
    document.getElementById("intentos").innerText = intentos;
    document.getElementById("mensaje").innerText = "";
    document.getElementById("mensaje").className = "";
    document.getElementById("palabrasRestantes").innerText = palabrasRestantes;
    generarTeclado();
}

generarTeclado();
