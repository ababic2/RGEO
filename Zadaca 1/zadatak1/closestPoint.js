/**Napišite funkciju “ClosestPointPair_VeryFast” koja nalazi najbliži par tačaka u spisku tačaka
koristeći poboljšani brzi algoritam koji radi u vremenu reda Θ(𝑛 log 𝑛). Funkcija treba da ima zaglavlje
function ClosestPointPair_VeryFast(P)

Ulazni parametar “P” je niz tačaka za koje se traži najbliži par tačaka. Kao rezultat, funkcija vraća
uređenu trojku modeliranu kao objekat koji posjeduje atribute nazvane “d”, “U” i “V”. Pri tome, “d”
predstavlja traženo najkraće rastojanje, dok “U” i “V” predstavljaju nađene tačke na najkraćem rastojanju.

Za potrebe implementacije, dozvoljeno je kreirati i koristiti pomoćne funkcije.
Napisanu funkciju demonstrirajte u web aplikaciji koja generira između 50 i 100 tačaka sa slučajno
odabranim koordinatama u opsegu platna (tačan broj tačaka se također slučajno odabira). Nakon toga,
program treba da nađe najbliži par tačaka pozivom napisane funkcije, te da grafički prikaže generirane
tačke i nađeni najbliži par tačaka tako što će tačke koje čine najbliži par spojiti linijom**/

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let points = []

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function range(size, startAt = 0) {
    return [...Array(size+1).keys()].map(i => i + startAt);
}
function drawPoint(ctx, x, y){
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "black"
    ctx.closePath()

    // Display coordinates
    ctx.font = "10px Arial";
    // ctx.fillText(`(${x}, ${y})`, x + 5, y - 5); // Adjust text position as needed
}
function drawLine(ctx, x1, y1, x2, y2, d = 0){
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.font = "10px Arial";

    // Calculate the midpoint between (x1, y1) and (x2, y2) for text positioning
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Display the distance d at the midpoint of the line
    ctx.fillText(`${d}`, midX, midY);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomPointss() {
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
        drawPoint(ctx, points[i].x, points[i].y);
    }
    return points;
}
function Merge_By_Y_Aux(P, Q, p, q, r){
    let i = p
    let j = r + 1
    let k = p
    while (i !== r + 1 && j !== q + 1) {
        if(P[i].y < P[j].y){
            Q[k] = P[i]
            i = i + 1
        }
        else{
            Q[k] = P[j]
            j = j + 1
        }
        k = k + 1
    }
    while (i < r + 1) {
        Q[k] = P[i]
        i = i + 1
        k = k + 1
    }
    while (j < q + 1) {
        Q[k] = P[j]
        j = j + 1
        k = k + 1
    }
}

function ClosestPointPair_VeryFast_Aux(P, Q, p, q){
    if(q <= p){
        return [Infinity,P[p],P[p]]
    }
    let r = Math.floor((p + q ) / 2)
    let [d, U, V] = ClosestPointPair_VeryFast_Aux(Q, P, p, r);
    const [d2, U2, V2] = ClosestPointPair_VeryFast_Aux(Q, P, r + 1, q);
    if(d2 <= d){
        d = d2
        U = U2
        V = V2
    }
    let c = (P[r].x + P[r+1].x)/2
    Merge_By_Y_Aux(P, Q, p, q, r)
    let S = [0, 1, 2, 3];
    let m = 0
    range(q-p,p).forEach(k => {
        if( (Q[k].x > c - d) && (Q[k].x < c + d) ){
            range(Math.min(m,4),0).forEach(i => {
                let j = S[i]
                let w = (Q[k].x - Q[j].x)**2 + (Q[k].y - Q[j].y)**2
                if(w === 0){
                    return
                }
                if(w < d){
                    d = w
                    U = Q[k]
                    V = Q[j]
                }
            });
            S[(m % 4) + 1] = k
            m = m + 1
        }
    });
    return [Math.abs(d),U,V]
}

function ClosestPointPair_VeryFast(P){
    function cmp(R, S){
        return R.x < S.x
    }
    P.sort(cmp)
    let Q = [...P]
    let [d, U, V] = ClosestPointPair_VeryFast_Aux(P,Q,0,P.length-1)
    return [Math.sqrt(d), U, V]
}

function findClosest(){
    if(points.length > 1) {
        [distance, point1, point2] = ClosestPointPair_VeryFast(points)
        drawLine(ctx, point1.x, point1.y, point2.x, point2.y, distance)
    } else {
        console.log("First generate random points!")
    }
}
