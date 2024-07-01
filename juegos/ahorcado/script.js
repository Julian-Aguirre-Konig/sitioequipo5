const palabras = ["educacion", "vial", "seguridad", "peaton", "bicicleta"];
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
let intentos = 6;
let letrasAdivinadas = [];
let palabraMostrar = "_".repeat(palabra.length);

document.getElementById("palabra").innerText = palabraMostrar;

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
    } else {
        intentos--;
        document.getElementById("intentos").innerText = intentos;
    }

    if (palabraMostrar === palabra) {
        document.getElementById("mensaje").innerText = "¡Felicidades! Has adivinado la palabra.";
        document.getElementById("mensaje").className = "correcto";
        deshabilitarTeclado();
    } else if (intentos === 0) {
        document.getElementById("mensaje").innerText = `Has perdido. La palabra era: ${palabra}`;
        document.getElementById("mensaje").className = "incorrecto";
        deshabilitarTeclado();
    }
}

function deshabilitarTeclado() {
    const botones = document.querySelectorAll(".key");
    botones.forEach(boton => boton.disabled = true);
}

function reiniciarJuego() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    intentos = 6;
    letrasAdivinadas = [];
    palabraMostrar = "_".repeat(palabra.length);
    document.getElementById("palabra").innerText = palabraMostrar;
    document.getElementById("intentos").innerText = intentos;
    document.getElementById("mensaje").innerText = "";
    document.getElementById("mensaje").className = "";
    generarTeclado();
}

generarTeclado();
