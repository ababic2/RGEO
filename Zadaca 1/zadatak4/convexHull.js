/*Napišite funkciju nazvanu “ConvexHull_GiftWrapping” koja nalazi konveksni omotač za spisak
tačaka koji joj se zadaje kao parametar. Za nalaženje konveksnog omotača treba koristiti algoritam
“uvijanje poklona” (Jarvisov algoritam), koji nalaženje obavlja “u mjestu” (tj. bez kreiranja novog
spiska). Funkcija treba imati sljedeće zaglavlje:
function ConvexHull_GiftWrapping(P)
Ulazni parametar “P” je niz čiji su elementi tačke za koje treba naći konveksni omotač. Kao rezultat,
funkcija treba da vrati kreirani poligon, u vidu objekta za koji se pretpostavlja da ima atribut nazvan
“V”, koji predstavlja niz tačaka, koje su tjemena konstruiranog poligona, u ispravnom redoslijedu.
Možete pretpostaviti da ulazni spisak “P” sadrži barem tri tačke. U slučaju kad na konveksnom
omotaču imamo kolinearnih tačaka, funkcija bi u konveksni omotač trebala da uključi sve tačke koje bi
mogle biti uključene u konveksni omotač. Za potrebe implementacije, dozvoljeno je kreirati i koristiti
pomoćne funkcije.
Napisanu funkciju demonstrirajte u web aplikaciji koja generira između 50 i 100 tačaka sa slučajno
odabranim koordinatama u opsegu platna (tačan broj tačaka se također slučajno odabira). Nakon toga,
program treba da nađe konveksni omotač generiranih tačaka, te da grafički prikaže generirane tačke i
nađeni konveksni omotač koji se dobija pozivom navedene funkcije (naravno, nađeni konveksni
omotač treba prikazati kao skupinu linija koje povezuju tjemena nađenog poligona koji predstavlja
konveksni omotač).*/

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let points = [];

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    controlPoints = [];
}
function drawPoint(x, y, color = "black"){
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLine(x1, y1, x2, y2){
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomPoints() {
    let randomNumber = getRandomNumber(50, 100);
    console.log("Generating " + randomNumber + " points")
    clearCanvas()
    for (let i = 0; i < randomNumber; i++) {
        let point = new Point(
            Math.floor(Math.random()*canvas.width),
            Math.floor(Math.random() * canvas.height)
        );
        points.push(point);
    }
    for (let i = 0; i < points.length; i++) {
        drawPoint(points[i].x, points[i].y);
    }
    return points;
}
function connectPoints(convexHullPoints){
    for (let i = 0; i < convexHullPoints.length; i++) {
        if(i !== 0){
            drawLine(convexHullPoints[i - 1].x, convexHullPoints[i - 1].y, convexHullPoints[i].x, convexHullPoints[i].y)
        }
    }
    drawLine(convexHullPoints[0].x, convexHullPoints[0].y, convexHullPoints[convexHullPoints.length - 1].x, convexHullPoints[convexHullPoints.length - 1].y)
}

function range(size, startAt = 0) {
    return [...Array(size+1).keys()].map(i => i + startAt);
}
function arePointsEqual(P1, P2){
    return P1.x === P2.x && P1.y === P2.y;
}
function threePointsCross(P1, P2, P3) {
    return (P2.x - P1.x) * (P3.y-P1.y) - (P3.x - P1.x) * (P2.y - P1.y);
}

// Function to find the index of the leftmost point in an array of points P
function indexOfLeftmostPoint(P) {
    let leftmostIndex = 0; // Assume the first point is the leftmost initially
    for (let i = 1; i < P.length; i++) {
        if (isFirstPointLeftOf(P[i], P[leftmostIndex])) {
            leftmostIndex = i;
        }
    }
    return leftmostIndex;
}

// Function to check if a point P1 is to the left of another point P2
function isFirstPointLeftOf(P1, P2) {
    return P1.x < P2.x || (P1.x === P2.x && P1.y < P2.y);
}

function ConvexHull_GiftWrapping(P){
    let V = [];
    let ind = indexOfLeftmostPoint(P);
    let left = P[ind];
    for (let i = 1; i < P.length; i++) {
        if(left.x > P[i].x){
            left = P[i];
            ind = i;
        }
    }
    let Q = left;
    do {
        V.push(Q);
        let b = 0;
        if(arePointsEqual(Q, P[0])){
            b = 1;
        }
        range(P.length-2,1).forEach(i => {
            if(threePointsCross(Q, P[b], P[i]) < 0){
                b = i;
                return;
            }
        });
        Q = P[b];
    } while (!arePointsEqual(Q, V[0]));
    return V;
}

function convexHullWrap(){
    connectPoints(ConvexHull_GiftWrapping(points))
}