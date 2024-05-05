/*Napišite funkcije “Make2dTree” i “RectangularSearch_2dTree” koje služe kao podrška za potrebe
pretraživanju pravougaonog opsega pomoću 2d-stabla. Funkcija “Make2dTree” kreira odgovarajuće
2d-stablo i smješta u njega tačke iz ulaznog spiska. Ona ima sljedeće zaglavle:
function Make2dTree(P)
Parametar “P” predstavlja ulazni niz tačaka. Kao rezultat, funkcija vraća kreirano 2d-stablo,
modelirano kao niz čvorova. Čvorovi stabla se modeliraju kao objekti koji imaju atribute nazvane “P”,
“l” i “r”. Atribut “P” predstavlja tačku pohranjenu u čvoru, dok su “l” i “r” indeksi gdje se u nizu koji
modelira stablo nalaze korijenski čvor lijevog i desnog podstabla. Pretraga opsega na osnovu prethodno
kreiranog 2d-stabla vrši se pomoću funkcije “RectangularSearch_2dTree”, a njeno zaglavlje je
function RectangularSearch_2dTree(T, R);
Parametar “T” je 2d-stablo koje pretražujemo, dok parametar “R” predstavlja pravougaonik koji
pretražujemo, modeliran na isti način kao u prethodnom zadatku. Kao rezultat, funkcija vraća niz
nađenih tačaka koje leže u zadanom pravougaoniku.
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
class TreeNode{
    constructor(P, l, r){
        this.P = P;
        this.l = l;
        this.r = r;
    }
}
class Rectangle{
    constructor(x1, x2, y1, y2){
        if(x1 > x2){
            var tmp = x2;
            x2 = x1;
            x1 = tmp;
        }
        if(y1 > y2){
            var tmp = y2;
            y2 = y1;
            y1 = tmp;
        }
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
}
function drawPoint(x, y, clr = "black"){
    ctx.fillStyle = clr;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
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
function clearCanvas(){
    points=[];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawRect(R){
    ctx.lineWidth = 3;
    drawLine(R.x1, R.y1, R.x1, R.y2);
    drawLine(R.x1, R.y1, R.x2, R.y1);
    drawLine(R.x2, R.y1, R.x2, R.y2);
    drawLine(R.x1, R.y2, R.x2, R.y2);
    ctx.lineWidth = 1;
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

    let x1 = Math.floor(Math.random()*canvas.width);
    let x2 = Math.floor(Math.random()*canvas.width);
    let y1 = Math.floor(Math.random()*canvas.height);
    let y2 = Math.floor(Math.random()*canvas.height);
    R = new Rectangle(x1,x2,y1,y2);
    drawRect(R);
}

function Make2dTree(P){
    let T = Array(P.length);
    let k = 0;
    T[0] = new TreeNode(P[0],-1,-1);
    range(P.length - 2,1).forEach(i => {
        let f = false;
        let c = 0;
        while(c !== -1){
            d = f ? (P[i].x < T[c].P.x) : (P[i].y < T[c].P.y);
            p = c;
            c = d ? T[c].l : T[c].r;
            f = !f;
        }
        k++;
        T[k] = new TreeNode(P[i],-1,-1);
        if(d){
            T[p].l = k;
        }
        else{
            T[p].r = k;
        }
    });
    return T;
}
function RectangularSearch_2dTree_Aux(T, p, R, V, f){
    if(p !== -1){
        P = T[p].P
        if(P.x >= R.x1 && P.x <= R.x2 && P.y >= R.y1 && P.y <= R.y2) {
            V.push(P);
        }
        if(f?(R.x1 < P.x):(R.y1 < P.y)) {
            RectangularSearch_2dTree_Aux(T, T[p].l, R, V, !f);
        }
        if(f?(R.x2 >= P.x):(R.y2 >= P.y)) {
            RectangularSearch_2dTree_Aux(T, T[p].r, R, V, !f);
        }
    }
}

function RectangularSearch_2dTree(T, R){
    let V = [];
    RectangularSearch_2dTree_Aux(T,0, R, V,false);
    return V;
}

function generateTree() {
    let G = Make2dTree(points);
    let res = RectangularSearch_2dTree(G,R);
    for (let i = 0; i < res.length; i++) {
        const element = res[i];
        drawPoint(element.x, element.y, "red");
    }
}
tacke = [new Point(2,3),new Point(1,3),new Point(42,3),new Point(2,23),new Point(2,1),
    new Point(22,13),new Point(32,223)]
t = Make2dTree(tacke)
R = new Rectangle(1.5,23,1.5,24)
console.log("KDAJDKLHAJKDHAK")
console.log(RectangularSearch_2dTree(t,R))

