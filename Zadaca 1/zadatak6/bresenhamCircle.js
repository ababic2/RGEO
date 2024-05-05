/*Napišite funkciju “CircleDraw_Antialiased” koja vrši iscrtavanje kružnice koristeći rasterizaciju s
antialiasingom i kombiniranjem svjetline. Funkcija treba imati sljedeće zaglavlje:
function CircleDraw_Antialiased(X, Y, r)
Ovdje je “kontekst uređaja, “X” i “Y” su fizičke koordinate centra kružnice (posmatrano relativno
u odnosu na kontekst uređaja), dok je “r” poluprečnik kružnice. Odgovarajući algoritam kreirajte
kombiniranjem ideja iz Bresenhamovog algoritma za rasterizaciju kružnice (u kojem se ne obavlja
antialiasing) s idejama iz Xiaolin Wu algoritma za rasterizaciju duži s antialiasingom. Pri tome, nije
neophodno da se kreirani algoritam oslanja isključivo na cjelobrojnu aritmetiku (odnosno, upotreba
realne aritmetike je dozvoljena). Za kombiniranje svjetline piksela koji se generira rasteriziranjem i
piksela koji se već odranije nalazi na platnu, koristite “zdravo za gotovo” funkciju “CombinePixel” koja je
data u okviru Zadatka 6 na Laboratorijskoj vježbi 4.
Napisanu funkciju demonstrirajte u web aplikaciji koja će iscrtati 20 koncentričnih kružnica
rasteriziranih uz primjenu antialiasinga čiji je centar na poziciji (300, 150), a poluprečnici im variraju
od 5 do 100 u koraku po 5.*/

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let points = [];
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    controlPoints = [];
}
function range(size, startAt = 0) {
    return [...Array(size + 1).keys()].map(i => i + startAt);
}

function CombinePixel ( X, Y, graylevel) {
    var pixdata = ctx.getImageData (X, Y, 1, 1).data;
    var pixc = ( pixdata [ 3 ] == 0) ? 255 : pixdata [ 0 ] ;
    var comblevel = Math.max( graylevel + pixc - 255 , 0 ) ;
    ctx.fillStyle = " rgb (" + comblevel + " ," + comblevel + " ," + comblevel + " ) " ;
    ctx.fillRect(X, Y, 1 , 1 ) ;
}

function CircleDraw_Anitaliased(x, y, R){
    let p = 0, q = R, pp = 1, qq = 2 * R - 1, e = 0, M = 256;
    while(p < q) {
        CombinePixel(x + p,y + q, e);
        CombinePixel(x + p + 1,y + q + 1,M - 1 - e);

        CombinePixel(x + q,  y - p, e);
        CombinePixel(x + q + 1,y - p - 1,M - 1 - e);

        CombinePixel(x - p,  y - q, e);
        CombinePixel(x - p - 1,y - q - 1,M - 1 - e);

        CombinePixel(x - q,  y + p, e);
        CombinePixel(x - q + 1,y - p - 1,M - 1 - e);
        p++;
        e += pp;
        pp += 2;
        if(qq < 2 * e) {
            q--; e -= qq; qq -= 2;
        }
        if(p <= q) {
            CombinePixel(x + q, y + p, e);
            CombinePixel(x + q + 1,y + p + 1,M - 1 - e);

            CombinePixel(x + p, y-q, e);
            CombinePixel(x + p + 1,y - q - 1,M - 1 - e);

            CombinePixel(x - q, y - p, e);
            CombinePixel(x - q - 1,y - p - 1,M - 1 - e);

            CombinePixel(x - p, y + q, e);
            CombinePixel(x - p - 1,y + q + 1,M - 1 - e);
        }
    }
}

function bresenhamCircle(){
    clearCanvas();
    [x, y] = [300,150]
    let r = 5;
    range(19,0).forEach(element => {
        CircleDraw_Anitaliased(x, y, r)
        r += 5;
    });
}
