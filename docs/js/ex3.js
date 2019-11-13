const WIDTH = 800; // canvas elementets bredd
const HEIGHT = 600; // canvas elementets höjd

let canvas = document.createElement('canvas'); // skapa canvaselementet
let ctx = canvas.getContext('2d'); // spara canvaselementets context, vi behöver det för att kunna rita
canvas.setAttribute("class", "border"); // ge canvas klassen border så vi markerar ut det
canvas.width  = WIDTH; // sätt elementets bredd
canvas.height = HEIGHT; // ... & höjd

// Vi skapar en Box som vi kan kalla på för att skapa nya boxar.
const Box = function(x, y) {
    let box = {};
    box.x = x;
    box.y = y;
    box.speed = 8;
    box.width = 40;
    box.height = 40;
    box.color = getRandomColor();
    box.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    return box; // vi returnerar box objektet
}

let box = Box(WIDTH / 2, HEIGHT / 2); // skapa en ny Box och spara den i variabeln box

// spelets huvudloop som kallas på genom requestAnimationFrame
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let canvasLoop = window.requestAnimationFrame(step);
// animering
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations

let start, timestamp;
function step(timestamp) {
    // timestamp för hur länge animationen kört
    if (!start) start = timestamp;
    let progress = timestamp - start;

    ctx.clearRect(0, 0, WIDTH, HEIGHT); // rensar hela canvas, så att vi kan rita om det, prova att kommentera ut

    if(move.right) {
        box.x = box.x + box.speed;
    }
    if(move.left) {
        box.x = box.x - box.speed;
    }
    if(move.up) {
        box.y = box.y - box.speed;
    }
    if(move.down) {
        box.y = box.y + box.speed;
    }

    box.draw(); // kalla på boxens rit funktion

    // callback på sig själv genom requestAnimationFrame
    canvasLoop = window.requestAnimationFrame(step);
}

// för att stoppa loopen, window.cancelAnimationFrame(canvasLoop);

let main = document.getElementsByTagName('main')[0]; // hämta main elementet från vårt HTML dokument
main.appendChild(canvas); // lägg till canvaselementet i main i HTML dokumentet

// färgslumpare
function getRandomColor(alpha) {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + "," +  (alpha ? alpha : 1) + ")";
}

// move objekt för att hålla reda på hur spelaren flyttar på sig
let move = { right: false, left: false, up: false, down: false }

// Keydown på movement
document.addEventListener("keydown", function(e) {
	switch(e.key) {
		case "ArrowRight":
            move.right = true;
            break;
		case "ArrowLeft":
            move.left = true;
            break;
        case "ArrowUp":
            move.up = true;
            break;
		case "ArrowDown":
            move.down = true;
            break;
        }
});

// keyup på movement
document.addEventListener("keyup", function(e) {
	switch(e.key) {
		case "ArrowRight":
            move.right = false;
            break;
		case "ArrowLeft":
            move.left = false;
            break;
        case "ArrowUp":
            move.up = false;
            break;
		case "ArrowDown":
            move.down = false;
            break;
        }
});