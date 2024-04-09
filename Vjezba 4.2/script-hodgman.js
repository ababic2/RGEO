

// Pomocne funckije
function ocistiCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function pravouganoikPoligon(ctx, x1, x2, y1, y2, boja, debljina = 1){
    ctx.strokeStyle = boja;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x1, y1);
    ctx.lineWidth = debljina;
    ctx.stroke();
}

function krugKaoTacka(ctx, x, y, boja, velicina = 1){
    ctx.fillStyle = boja;
    ctx.beginPath();
    ctx.arc(
        x,
        y,
        velicina,
        0,
        2 * Math.PI
    );
    ctx.fill();
}

function prava(ctx, x1, y1, x2, y2, boja, debljina = 1){
    ctx.strokeStyle = boja;
    ctx.lineWidth = debljina;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


// Zadatak 3

function presjeciPoligonSaDuzi(poligon, duz){
    var V = [];
    var n = poligon.length;
    var u = duz[0];
    var v = duz[1];
    var w = duz[2];
    if(n !== 0){
        let Q = poligon[n - 1];
        for(var i = 0; i < n; i++){
            let P = [Q[0], Q[1]];
            Q = poligon[i];
            var s = u * P[0] + v * P[1] + w;
            var t = u * Q[0] + v * Q[1] + w;
            if((s <= 0 && t > 0) || (s > 0 && t <= 0)){
                var p = Q[0] - P[0];
                var q = Q[1] - P[1];
                var r = P[0] * Q[1] - P[1] * Q[0];
                var delta = u * p + v * q;
                var x = (v * r - w * p) / delta;
                var y = -(u * r + w * q) / delta;
                V.push([x, y]);
            }
            if(t <= 0)
                V.push(Q);
        }
    }
    poligon = [];
    for (let i = 0; i < V.length; i++) {
        poligon.push(V[i]);
    }

    return poligon;
}

function sutherlandHodgman(poligon, R){
    poligon = presjeciPoligonSaDuzi(poligon, [1, 0, -R[1]]);
    poligon = presjeciPoligonSaDuzi(poligon, [-1, 0, R[0]]);
    poligon = presjeciPoligonSaDuzi(poligon, [0, 1, -R[3]]);
    poligon = presjeciPoligonSaDuzi(poligon, [0, -1, R[2]]);
    return poligon;
}

let poligon = [];
function odaberiTacke(ctx){
    let poligon = [];
    var R = [100, 200, 0, 400];
    pravouganoikPoligon(ctx, R[0], R[1], R[2], R[3], "red");
    canvas.ondblclick = function(event) {
        poligon = sutherlandHodgman(poligon, R);
        popuniPoligon(poligon);
        canvas.onclick = null;
        canvas.ondblclick = null;
    };

    canvas.onclick = function(event) {
        var x = event.clientX - canvas.getBoundingClientRect().left;
        var y = event.clientY - canvas.getBoundingClientRect().top;

        krugKaoTacka(ctx, x, y, "red", 2);
        var broj = poligon.length ;
        var zadnjaTacka = poligon[broj - 1];
        if(broj >= 1)
            prava(ctx, zadnjaTacka[0], zadnjaTacka[1], x, y, "blue");
        poligon.push([x,y]);


    };
}

function popuniPoligon(ctx, poligon) {
    if(poligon.length !== 0){
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(poligon[0][0], poligon[0][1]);
        for (var i = 1; i < poligon.length; i++) {
            ctx.lineTo(poligon[i][0], poligon[i][1]);
        }
        ctx.closePath();
        ctx.fill();
    }
}

function zadatak33(ctx){
    ocistiCanvas(ctx);
    odaberiTacke(ctx);
}
module.exports = { zadatak33 };
