const WIDTH = 800; // canvas elementets bredd
const HEIGHT = 600; // canvas elementets höjd

// vi skapar 2 st canvas för att rita ut bakgrunden på det ena och karaktären på det andra
let bgCanvas = document.createElement('canvas'); // skapa canvaselementet
let bgCtx = bgCanvas.getContext('2d'); // spara canvaselementets context, vi behöver det för att kunna rita
bgCanvas.setAttribute("class", "border layer"); // ge canvas klassen border så vi markerar ut det
bgCanvas.width  = WIDTH; // sätt elementets bredd
bgCanvas.height = HEIGHT; // ... & höjd

// foreground canvas
let fgCanvas = document.createElement('canvas'); 
let fgCtx = fgCanvas.getContext('2d');
fgCanvas.setAttribute("class", "layer"); 
fgCanvas.width  = WIDTH;
fgCanvas.height = HEIGHT;

let canvasLoop;
let img = new Image();
img.src = 'img/sprites-top-down.png';
img.onload = function() { // vi använder denna onload för att rita ut bakgrunden också
    canvasLoop = window.requestAnimationFrame(step);
    bgCtx.drawImage(img, 10, 10, 800, 600, 0, 0, 800, 600);
    bgCtx.drawImage(img, 10, 1240, 800, 125, 0, HEIGHT - 125, 800, 125);
};


// objekt för spelaren
const Player = function(x, y) {
    const player = {};
    player.x = x;
    player.y = y;
    player.speed = 4;
    player.cycleLoop = [0, 1, 2, 3, 4, 5, 6];
    player.frameLimit = 6;
    player.frameCount = 0;
    player.width = 140;
    player.height = 150;
    player.currentDirection = 1;
    player.currentLoopIndex = 0;
    player.scale = 1;
    player.draw = function()
    {
        // vi börjar nu spelarens draw funktion med att sudda ut spelarområdet på dess canvas
        fgCtx.clearRect(this.x, this.y, this.width * this.scale, this.height * this.scale);
        /*
         * drawImage tar här först bilden vi ska använda för att rita
         * 840 är antalet pixlar från vänster kant där bilden finns i sprite sheetet
         * sedan kommer cycleLoop, som är en array med antalet frames för animationen
         * Vi använder sedan det index vi räknar upp (för att styra animationen) och gångrar det med bredden
         * slutresultatet är att vi ritar ut det som finns 
         * 840 + 0, 1, 2, 3 osv. * 140
         * 840 + this.cycleLoop[this.currentLoopIndex] * this.width,
         * 430 är bildens offset i antalet pixlar från toppen av dokumentet
         * Sedan följer den bredd som bilden har i dokumentet, spritesheeten
         * Sedan X position och Y positionen
         * Sedan följer den bredd och höjd som vi vill att bilden ska ha när vi ritar ut den
         */
        fgCtx.drawImage(img,
            840 + this.cycleLoop[this.currentLoopIndex] * this.width,
            430,
            this.width, this.height,
            this.x, this.y,
            this.width * this.scale, this.height * this.scale);
    }
    return player;    
}


let player = Player(WIDTH / 2 - 150, HEIGHT / 2 - 150);


let start, timestamp;
function step(timestamp) {
    // timestamp för hur länge animationen kört
    if (!start) start = timestamp;
    let progress = timestamp - start;

    //ctx.clearRect(0, 0, WIDTH, HEIGHT); // rensar hela canvas, så att vi kan rita om det, prova att kommentera ut

    player.frameCount++;
    if (player.frameCount >= player.frameLimit) {
        player.frameCount = 0;
        player.currentLoopIndex++;
        if (player.currentLoopIndex >= player.cycleLoop.length) {
            player.currentLoopIndex = 0;
        }
    }

    player.draw(); // kalla på boxens rit funktion

    // callback på sig själv genom requestAnimationFrame
    canvasLoop = window.requestAnimationFrame(step);
}

// för att stoppa loopen, window.cancelAnimationFrame(canvasLoop);

let main = document.getElementsByTagName('main')[0]; // hämta main elementet från vårt HTML dokument
main.appendChild(bgCanvas); // lägg till canvaselementet i main i HTML dokumentet
main.appendChild(fgCanvas);

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