/*Napišite funkciju “GenerateBezierCurvePoints” koja generira tačke na Bézierovoj krivoj proizvoljnog
reda, sa zadanim upravljačkim tačkama. Funkcija treba da ima zaglavlje
function GenerateBezierCurvePoints(P, n)
Parametar “P” je niz upravljačkih tačaka (broj tačaka određuje red krive), dok je parametar “n” broj
tačaka koje želimo generirati. Generiranje tačaka treba obaviti korištenjem eksplicitne formule koja
opisuju Bézierove krive, varirajući parametar 𝑡 u ravnomjernim koracima Δ𝑡 u opsegu od 0 do 1 (Δ𝑡 se
određuje tako da broj generiranih tačaka bude tačno “n”). Kao rezultat, funkcija vraća niz generiranih
tačaka na Bézierovoj krivoj.
Napisanu funkciju demonstrirajte u web aplikaciji koja će korisniku omogućiti da pomoću miša
zada pozicije upravljačkih tačaka, a koja će nakon toga klikom na neko dugme izgenerirati tačke na
odgovarajućoj Bézierovoj krivoj, i iscrtati aproksimaciju te krive u vidu poligonalne linije koja spaja
generirane tačke. Predvidite i polje za unos u kojem je moguće zadavati broj tačaka koje će se generirati*/

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let points = [];
let controlPoints = [];
let number = parseInt(document.getElementById("text").value);

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
function range(size, startAt = 0) {
    return [...Array(size+1).keys()].map(i => i + startAt);
}
canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    controlPoints.push(new Point(x,y));
    drawPoint(x, y, "red");
});

function binomial(n, k) {
    if ((typeof n !== 'number') || (typeof k !== 'number'))
        return false;
    var coeff = 1;
    for (var x = n - k + 1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
}
function GenerateBezierCurvePoints(P, n){
    let ts = [];
    let tren = 0;
    range(n,0).forEach(i => {
        ts.push(parseFloat(tren.toFixed(8)));
        tren += 1.0 / n;
    });
    let res = [];
    ts.forEach(t => {
        let x = 0;
        let y = 0;
        let pn = P.length-1;
        for (let i = 0; i < P.length; i++) {
            const point = P[i];
            x += binomial(pn,i) * t**i * ((1-t)**(pn-i)) * point.x;
            y += binomial(pn,i) * t**i * ((1-t)**(pn-i)) * point.y;
        }
        res.push(new Point(x,y));
    });
    return res;
}

function generateBezierCurve(){
    number = parseInt(document.getElementById("text").value);
    points = GenerateBezierCurvePoints(controlPoints, number);
    for (let i = 0; i < points.length; i++) {
        const element = points[i];
        drawPoint(element.x, element.y, "green");
        if(i !== 0) {
            drawLine(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
        }
    }
}