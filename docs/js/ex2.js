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
    box.speed = 4;
    box.width = 100;
    box.height = 100;
    box.color = getRandomColor();
    box.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    return box; // vi returnerar box objektet
}

let box = Box(0, 200); // skapa en ny Box och spara den i variabeln box

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
    let dateObject = new Date(progress); // omvandla detta till ett date object för att kunna skria ut tiden

    // genom att inte rensa bakgrunden utan istället fylla med ett semitransparent läge kan vi skapa en skugga
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // getRandomColor()???
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // ctx.clearRect(0, 0, WIDTH, HEIGHT); // rensar hela canvas, så att vi kan rita om det, prova att kommentera ut

    // Text på canvas, uppdaterar och skriver ut sekunder och minuter utifrån progress
    ctx.font = "14px Arial"; // typsnitt och storlek, du kan använda typsnitt du länkar in från google fonts
    ctx.fillStyle = '#000'; // färg
    ctx.textAlign = "left"; // align på texten, här center för att vi placerar den i canvas mitt
    ctx.fillText(dateObject.getUTCMinutes() + ":" + dateObject.getUTCSeconds(), 10, 20); // texten vi ska skriva ut samt dess X och Y kordinat ( från top left)

    // animering av vår box
    // först så uppdaterar vi X värdet på boxen, är det utanför canvas.width - 100 så byter vi håll på dess speed
    box.x += box.speed;
    if (box.x + box.speed > WIDTH - box.width || box.x + box.speed < 0) {
        box.speed = -box.speed;
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