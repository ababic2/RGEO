/*Napišite funkciju “GenerateCurvePoints_Adaptive” koja generira tačke na krivoj liniji koja je zadana
u parametarskom obliku, korištenjem adaptivnog algoritma. Funkcija treba imati sljedeće zaglavlje
function GenerateCurvePoints_Adaptive(phi, psi, tmin, tmax, h, d)
Parametri “phi” i “psi” predstavljaju funkcije φ i ψ iz parametarskog modela krive 𝑥 = φ(𝑡), 𝑦 = ψ(𝑡),
parametri “tmin” i “tmax” definiraju opseg u kojem se može kretati parametar 𝑡, parametar “h” određuje
početni korak u kojem će se mijenjati parametar 𝑡 (mada se korak adaptira tokom izvođenja algoritma),
dok parametar “d” predstavlja okvirno rastojanje između generiranih tačaka. Kao rezultat, funkcija treba
da vrati niz (tj. objekat tipa “Array”) koji sadrži generirane tačke.
Napisanu funkciju demonstrirajte u web aplikaciji koja će na platnu iscrtati nekoliko zanimljivih
parametarski zadanih krivih linija, čije ćete jednačine (po vlastitom izboru) naći na internetu.*/

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
}
function drawPoint(x, y){
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.arc((x + 1) * canvas.width / 2, (1 - y) * canvas.height / 2, 2, 0, 2 * Math.PI); // Scale and draw a circle
    ctx.fill();
    ctx.closePath()
}

function drawPoints() {
    points.forEach(point => {
        drawPoint(point.x, point.y)
    });
}

function GenerateCurvePoints_Adaptive(phi, psi, tmin, tmax, h, d){
    V = []
    t = tmin
    x = phi(t)
    y = psi(t)
    x2 = x
    y2 = y
    V.push(new Point(x,y))
    while(t < tmax){
        // console.log(t,"<",tmax)
        x3 = x
        y3 = y
        x = phi(t+h)
        y = psi(t+h)
        while((x-x3)**2 + (y-y3)**2 > d**2){
            h = h * 0.8
            x = phi(t+h)
            y = psi(t+h)
        }
        if((x-x2)**2 + (y-y2)**2 > 0.3*d**2){
            V.push(new Point(x,y))
            x2 = x
            y2 = y
        }
        t = t + h
        h = 1.1*h
    }
    V.push(new Point(phi(tmax), psi(tmax)))
    return V
}

function generateFlower(){
    //https://images.app.goo.gl/J9EpLtPBKmepzVScA
    clearCanvas()
    points = GenerateCurvePoints_Adaptive(t => Math.cos(t) * Math.sin(4 * t), t => Math.sin(t) * Math.sin(4 * t),-6.2,6.28,0.1,0.01)
    drawPoints()
}

function generateFish() {
    //https://www.johndcook.com/blog/2022/11/06/three-interesting-curves/
    clearCanvas()
    points = GenerateCurvePoints_Adaptive(t =>  0.9*(Math.cos(t) - Math.sin(t)*Math.sin(t)/Math.sqrt(2)) , t => Math.cos(t)*Math.sin(t),-6.2,6.28,0.1,0.01)
    drawPoints()
}

function generateHypotrochoid() {
    //https://images.app.goo.gl/J9EpLtPBKmepzVScA
    clearCanvas()
    points = GenerateCurvePoints_Adaptive(t => 0.1*(2 * Math.cos(t) + 5 * Math.cos(2 * t / 3)), t => 0.1*(2 * Math.sin(t) - 5 * Math.sin(2 * t / 3)),-6.2,15,0.1,0.01)
    drawPoints()
}
function generateTangled() {
    //https://www.geogebra.org/m/wkETezY3
    clearCanvas()
    points = GenerateCurvePoints_Adaptive(t => Math.sin(2 * t), t =>  Math.sin(3 * t),-6.2,6.28,0.1,0.01)
    drawPoints()
}

function generateHeart() {
    clearCanvas()
    points = GenerateCurvePoints_Adaptive(t => 0.01*(16 * Math.sin(t)**3), t => 0.01*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)),-6.2,6.28,0.1,0.01)
    drawPoints()
}