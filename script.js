const palabras = ["PROGRAMAR", "JAVASCRIPT", "GITHUB", "AHORCADO", "DESARROLLO", "CODIGO", "INTERNET"];
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let palabraMostrar = "_".repeat(palabraSecreta.length).split("");
let intentos = 6;

const palabraElem = document.getElementById("palabra");
const intentosElem = document.getElementById("intentos");
const letrasElem = document.getElementById("letras");
const mensajeElem = document.getElementById("mensaje");
const canvas = document.getElementById("ahorcado");
const ctx = canvas.getContext("2d");

palabraElem.textContent = palabraMostrar.join(" ");
intentosElem.textContent = intentos;

// Crear botones de letras
for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.onclick = () => adivinarLetra(letra, btn);
    letrasElem.appendChild(btn);
}

function adivinarLetra(letra, btn) {
    btn.disabled = true;

    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                palabraMostrar[i] = letra;
            }
        }
    } else {
        intentos--;
        dibujarAhorcado(6 - intentos);
    }

    palabraElem.textContent = palabraMostrar.join(" ");
    intentosElem.textContent = intentos;

    if (!palabraMostrar.includes("_")) {
        mensajeElem.textContent = "🎉 ¡Ganaste!";
        desactivarBotones();
    }
    if (intentos === 0) {
        mensajeElem.textContent = `💀 Perdiste. La palabra era: ${palabraSecreta}`;
        desactivarBotones();
    }
}

function desactivarBotones() {
    const botones = letrasElem.querySelectorAll("button");
    botones.forEach(b => b.disabled = true);
}

// Dibujo del ahorcado paso a paso
function dibujarAhorcado(paso) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#333";
    if (paso === 1) { // Base
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(190, 190);
        ctx.stroke();
    }
    if (paso === 2) { // Poste vertical
        ctx.beginPath();
        ctx.moveTo(50, 190);
        ctx.lineTo(50, 20);
        ctx.stroke();
    }
    if (paso === 3) { // Poste horizontal
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(150, 20);
        ctx.stroke();
    }
    if (paso === 4) { // Cuerda
        ctx.beginPath();
        ctx.moveTo(150, 20);
        ctx.lineTo(150, 50);
        ctx.stroke();
    }
    if (paso === 5) { // Cabeza
        ctx.beginPath();
        ctx.arc(150, 65, 15, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (paso === 6) { // Cuerpo + extremidades
        ctx.beginPath();
        ctx.moveTo(150, 80);
        ctx.lineTo(150, 130);
        ctx.stroke();
        // Brazos
        ctx.moveTo(150, 90);
        ctx.lineTo(130, 110);
        ctx.moveTo(150, 90);
        ctx.lineTo(170, 110);
        // Piernas
        ctx.moveTo(150, 130);
        ctx.lineTo(130, 160);
        ctx.moveTo(150, 130);
        ctx.lineTo(170, 160);
        ctx.stroke();
    }
}
