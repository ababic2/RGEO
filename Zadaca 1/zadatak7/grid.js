/*Napišite funkcije “MakeGrid” i “RectangularSearch_GridMethod” koje služe kao podrška za potrebe
pretraživanju pravougaonog opsega pomoću metoda mreže. Funkcija “MakeGrid” kreira odgovarajuću
mrežu i razvrstava tačke iz ulaznog spiska u nju. Ona ima sljedeće zaglavlje:
function MakeGrid(P, p, q)Parametar “P” predstavlja niz tačaka koje se razvrstavaju u mrežu, dok parametri “p” i “q” određuju
format mreže. Kao rezultat, funkcija vraća objekat koji predstavlja kreiranu mrežu, koji treba da
posjeduje atribute “p” i “q” koji čuvaju format mreže, zatim atribute “x1”, “x2”, “y1” i “y2” određuju
raspon koordinata koje prekriva mreža, te atribut “C” koji predstavlja matricu (tj. niz čiji su elementi
nizovi) ćelija, pri čemu je svaka od tih ćelija također niz koji sadrži spisak tačaka koji pripada toj ćeliji.
Funkcija “RectangularSearch_GridMethod” vrši pretragu opsega na osnovu prethodno kreirane mreže.
Ona ima sljedeće zaglavlje:
function RectangularSearch_GridMethod(G, R);
Parametar “G” je mreža koja se pretražuje, dok parametar “R” predstavlja pravougaonik (čije su
stranice paralelne koordinatnim osama) koji pretražujemo. Pri tome se pravougaonik modelira kao
objekat za koji se pretpostavlja da posjeduje atribute nazvane “x1”, “x2”, “y1” i “y2”, koji određuju opseg
koordinata koje pripadaju pravougaoniku. Kao rezultat, funkcija vraća niz nađenih tačaka koje leže u
zadanom pravougaoniku.
Napisanu funkciju demonstrirajte u web aplikaciji koja generira između 50 i 100 tačaka sa slučajno
odabranim koordinatama u opsegu platna (tačan broj tačaka se također slučajno odabira). Nakon toga,
program treba da slučajno generira neki pravougaonik s koordinatama paralelnim koordinatnim
osama koji prekriva manji opseg nego opseg generiranih tačaka, nađe sve tačke koje padaju u taj
pravugaonik pozivom napisanih funkcija, te da grafički prikaže generirane tačke, generirani
pravougaonik (crtanjem linija koje spajaju njegova tjemena) i nađene tačke koje leže unutar tog
pravougaonika. Pri tome, te tačke treba iscrtati na neki način da se vizualno razlikuju od ostalih tačaka*/

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let points = [];
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Grid{
    constructor(p, q, x1, x2, y1, y2, matrix){
        this.p = p;
        this.q = q;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.C = matrix;
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
function CellMatrix(p,q){
    let arr = [];
    for (var i = 0; i < p; i++) {
        arr.push([0]);
        for (var j = 0; j < q; j++) {
            arr[i][j] = [];
        }
    }
    return arr;
}
function MakeGrid(P, p, q){
    let x1 = Infinity;
    let x2 = -Infinity;
    let y1 = Infinity;
    let y2 = -Infinity;
    P.forEach(t => {
        x1 = Math.min(x1, t.x);
        x2 = Math.max(x2, t.x);
        y1 = Math.min(y1, t.y);
        y2 = Math.max(y2, t.y);
    });
    x2 += ((x1 !== x2)? 0.01 * (x2 - x1):1);
    y2 += ((y1 !== y2)? 0.01 * (y2 - y2):1);
    let w = (x2 - x1) / q;
    let h = (y2 - y1) / p;
    G = new Grid(p, q, x1, x2, y1, y2, CellMatrix(p + 1,q + 1));
    P.forEach(t=>{
        v = Math.floor((t.x - x1)/w);
        u = Math.floor((t.y - y1)/h);
        G.C[u][v].push(t);
    })
    return G;
}
function RectangularSearch_GridMethod(G, R){
    let Q = [];
    let w = (G.x2 - G.x1)/G.q;
    let h = (G.y2 - G.y1)/G.p;
    let xmin = Math.max(Math.floor((R.x1 - G.x1)/w), 0);
    let xmax = Math.min(Math.floor((R.x2 - G.x1)/w), G.q);
    let ymin = Math.max(Math.floor((R.y1 - G.y1)/h), 0);
    let ymax = Math.min(Math.floor((R.y2 - G.y1)/h), G.p);
    range(xmax - xmin,xmin).forEach(j => {
        range(ymax - ymin,ymin).forEach(i => {
            for (let k = 0; k < G.C[i][j].length; k++) {
                let P = G.C[i][j][k];
                if(P.x >= R.x1 && P.x <= R.x2 && P.y >= R.y1 && P.y <= R.y2){
                    Q.push(P);
                }
            }
        });
    });
    return Q;
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
function runGridAndSearch(){
    let G = MakeGrid(points,5,5);
    let res = RectangularSearch_GridMethod(G, R);

    for (let i = 0; i < res.length; i++) {
        const element = res[i];
        drawPoint(element.x, element.y, "red")
    }
}