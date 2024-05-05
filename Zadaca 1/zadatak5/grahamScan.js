/*Uz iste pretpostavke kao u prethodnom zadatku, napišite funkciju “ConvexHull_GrahamScan”, koja
radi istu stvar kao i funkcija iz prethodnog zadatka, samo što za traženje konveksnog omotača koristi
Grahamov algoritam (Grahamovo skeniranje). Zaglavlje funkcije je sljedeće:
function ConvexHull_GrahamScan(P)
Testni program je i ovdje potreban, na isti način kao i u prethodnom zadatku.*/


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
    return [...Array(size + 1).keys()].map(i => i + startAt);
}
function arePointsEqual(P1, P2){
    return P1.x === P2.x && P1.y === P2.y;
}
function threePointsCross(P1, P2, P3) {
    return (P2.x - P1.x) * (P3.y - P1.y) - (P3.x - P1.x) * (P2.y - P1.y);
}
function sortPointsByAngle(P){
    function convBoolean(bl){
        return bl ? -1 : 1
    }
    let ind = indexOfLeftmostPoint(P);
    let left = P[ind];
    for (let i = 1; i < P.length; i++) {
        if(left.x > P[i].x){
            left = P[i];
            ind = i;
        }
    }
    let Q = left;
    P.sort((R,S)=>{
        s = threePointsCross(Q, R, S);
        if(s!=0){
            return convBoolean(s>0);
        }
        return convBoolean(Math.abs(R.x - Q.x) < Math.abs(S.x - Q.x) || Math.abs(R.y - Q.y) < Math.abs(S.y - Q.y));
    })
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

function ConvexHull_GrahamScan(P){
    sortPointsByAngle(P);
    let k = 0
    range(P.length - 2,1).forEach(i => {
        if(!arePointsEqual(P[i], P[i - 1])){
            while(k > 0 && threePointsCross(P[k-1], P[k], P[i]) < 0){
                k = k -1;
            }
            k = k + 1;
            P[k] = P[i];
        }
    });
    P = P.slice(0, k + 1);
    return P;
}
function convexHullGrahamScan(){
    connectPoints(ConvexHull_GrahamScan(points));
}
