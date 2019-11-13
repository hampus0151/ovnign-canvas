const WIDTH = 800; // canvas elementets bredd
const HEIGHT = 600; // canvas elementets höjd

let canvas = document.createElement('canvas'); // skapa canvaselementet
let ctx = canvas.getContext('2d'); // spara canvaselementets context, vi behöver det för att kunna rita
canvas.setAttribute("class", "border"); // ge canvas klassen border så vi markerar ut det
canvas.width  = WIDTH; // sätt elementets bredd
canvas.height = HEIGHT; // ... & höjd

/*
 * Rita något då?
 * Referens https://www.w3schools.com/tags/ref_canvas.asp
 */

// Text
ctx.font = "20px Arial"; // typsnitt och storlek, du kan använda typsnitt du länkar in från google fonts
ctx.fillStyle = '#000'; // färg
ctx.textAlign = "center"; // align på texten, här center för att vi placerar den i canvas mitt
ctx.fillText("Text på canvas", canvas.width / 2, 100); // texten vi ska skriva ut samt dess X och Y kordinat ( från top left)

// Rektangel
ctx.fillStyle = "red"; // fill
ctx.fillRect(100, 300, 100, 100); // fyll en rektangel, X Y bredd höjd

// Cirkel
ctx.beginPath(); // börja en path, krävs för detta
ctx.arc(100, 75, 50, 0, 2 * Math.PI); // se funktionen för mer information
ctx.fillStyle = "green"; // färg
ctx.strokeStyle = "rgba(255,200,200, 0.7)"; // stroke-färg
ctx.lineWidth = "12"; // linjens bredd
ctx.stroke(); // rita stroke
ctx.fill(); // fyll

// Linje
ctx.beginPath();
ctx.moveTo(400, 400); // linjens startpunkt, X Y
ctx.lineTo(600, 550); // linjens slutpunkt, X Y
ctx.strokeStyle = getRandomColor(0.8); // slumpa en färg
ctx.lineWidth = "4"; // linjens bredd
ctx.stroke();

// Bild
let img = new Image();
img.src = 'img/nti-logo.png';
img.onload = function() {
    ctx.drawImage(img, 400, 150, 256, 256);
};


let main = document.getElementsByTagName('main')[0]; // hämta main elementet från vårt HTML dokument
main.appendChild(canvas); // lägg till canvaselementet i main i HTML dokumentet

// färgslumpare
function getRandomColor(alpha) {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + "," +  (alpha ? alpha : 1) + ")";
}