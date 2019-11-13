const WIDTH = 800; // canvas elementets bredd
const HEIGHT = 600; // canvas elementets höjd

let canvas = document.createElement('canvas'); // skapa canvaselementet
let ctx = canvas.getContext('2d'); // spara canvaselementets context, vi behöver det för att kunna rita
canvas.setAttribute("class", "border"); // ge canvas klassen border så vi markerar ut det
canvas.width  = WIDTH; // sätt elementets bredd
canvas.height = HEIGHT; // ... & höjd

// Vi skapar en Box som vi kan kalla på för att skapa nya boxar.
const Box = function(x, y, width, height) {
    let box = {};
    box.x = x;
    box.y = y;
    box.speed = 8;
    box.width = width || 40;
    box.height = height || 40;
    box.color = getRandomColor();
    box.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    return box; // vi returnerar box objektet
}

let player = Box(WIDTH / 2, HEIGHT / 2); // skapa en spelare med Box klassen
// nu vill vi skapa ett antal objekt som vi kan krocka med på ritytan
// dessa kommer sparas i en array, obstacles, även dessa kommer vara Boxar
let obstacles = [];
for(let i = 0; i < 10; i++) {
    obstacles.push(
        Box(
            random(100, WIDTH - 100),
            random(100, HEIGHT - 100),
            random(40, 200), random(40, 200)
            )
        );
}

// samma som tidigare
let canvasLoop = window.requestAnimationFrame(step);
let start, timestamp;
function step(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;

    ctx.clearRect(0, 0, WIDTH, HEIGHT); // rensar hela canvas, så att vi kan rita om det, prova att kommentera ut

    // koden för att förflytta spelaren, kommer före kollisionen
    if(move.right) {
        player.x = player.x + player.speed;
    }
    if(move.left) {
        player.x = player.x - player.speed;
    }
    if(move.up) {
        player.y = player.y - player.speed;
    }
    if(move.down) {
        player.y = player.y + player.speed;
    }

    // här loopar vi igenom alla obstacles med foreach
    // det aktuella objektet sparas i element så att vi kan använda det
    obstacles.forEach(element => {
        let dir = colCheck(player, element); // använd kollisions funktionen för att se om spelaren krockar 
        // med det aktuella elementet
        element.draw(); // rita obstacle
    });

    player.draw(); // kalla på boxens rit funktion

    // callback på sig själv genom requestAnimationFrame
    canvasLoop = window.requestAnimationFrame(step);
}

// för att stoppa loopen, window.cancelAnimationFrame(canvasLoop);

let main = document.getElementsByTagName('main')[0]; // hämta main elementet från vårt HTML dokument
main.appendChild(canvas); // lägg till canvaselementet i main i HTML dokumentet

/*
 * Funktioner som vi använder
 */

// färgslumpare
function getRandomColor(alpha) {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + "," +  (alpha ? alpha : 1) + ")";
}
// slumpa ett tal mellan min, max
function random(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

// kollisionsfunktionen vi använder
// funkar okej, men med några problem
// lånad från http://www.somethinghitme.com/2013/04/16/creating-a-canvas-platformer-tutorial-part-tw/
// vill du kolla hela det tutorialet så kolla där
// kontrollerar om shapeA krockar med shapeB, objekten behöver x,y,width,height
// returnerar en riktning för kollisionen
function colCheck(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        var oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

/*
 * Movement code
 */ 

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