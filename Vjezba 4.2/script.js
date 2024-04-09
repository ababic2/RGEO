var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


// Pomocne funckije
function canvasClear(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function linijaKaoTacka(ctx, x, y, boja, velicina = 1){
    velicina = velicina / 2;
    ctx.fillStyle = boja;
    ctx.beginPath();
    ctx.moveTo(x - velicina, y);
    ctx.lineTo(x + velicina, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y - velicina);
    ctx.lineTo(x, y + velicina);
    ctx.stroke();
}

function pravougaonikKaoTacka(ctx, x, y, boja, velicina = 1){
    ctx.fillStyle = boja;
    ctx.fillRect(x - velicina / 2, y - velicina / 2, velicina, velicina);
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

////////////////////////ZADATAK 1///////////////////////////////////////////
function insideRectangle(x, y, x1, y1, x2, y2) {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawRectangle(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
}

function cohenSutherlandClip(x1, y1, x2, y2, xMin, yMin, xMax, yMax) {
    const INSIDE = 0;
    const LEFT = 1;
    const RIGHT = 2;
    const BOTTOM = 4;
    const TOP = 8;

    function computeOutCode(x, y) {
        let code = INSIDE;

        if (x < xMin)
            code |= LEFT;
        else if (x > xMax)
            code |= RIGHT;
        if (y < yMin)
            code |= BOTTOM;
        else if (y > yMax)
            code |= TOP;

        return code;
    }

    let outcode1 = computeOutCode(x1, y1);
    let outcode2 = computeOutCode(x2, y2);
    let accept = false;

    while (true) {
        if (!(outcode1 | outcode2)) {
            accept = true;
            break;
        } else if (outcode1 & outcode2) {
            break;
        } else {
            let x, y;

            let outcodeOut = outcode1 ? outcode1 : outcode2;

            if (outcodeOut & TOP) {
                x = x1 + (x2 - x1) * (yMax - y1) / (y2 - y1);
                y = yMax;
            } else if (outcodeOut & BOTTOM) {
                x = x1 + (x2 - x1) * (yMin - y1) / (y2 - y1);
                y = yMin;
            } else if (outcodeOut & RIGHT) {
                y = y1 + (y2 - y1) * (xMax - x1) / (x2 - x1);
                x = xMax;
            } else if (outcodeOut & LEFT) {
                y = y1 + (y2 - y1) * (xMin - x1) / (x2 - x1);
                x = xMin;
            }

            if (outcodeOut === outcode1) {
                x1 = x;
                y1 = y;
                outcode1 = computeOutCode(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                outcode2 = computeOutCode(x2, y2);
            }
        }
    }

    if (accept) {
        return [x1, y1, x2, y2];
    } else {
        return null;
    }
}

function drawCohen(ctx) {
    // Clear canvas
    canvasClear(ctx)

    // Drawing rectangular region
    drawRectangle(ctx, 100, 100, 300, 250, 'red');

    // Generating and drawing 50 lines
    for (let i = 0; i < 50; i++) {
        // Generating random coordinates for lines
        const x1 = Math.random() * 450;
        const y1 = Math.random() * 350;
        const x2 = Math.random() * 450;
        const y2 = Math.random() * 350;

        // Drawing lines
        drawLine(ctx, x1, y1, x2, y2, '#CCCCCC');

        // Clipping lines to rectangular region
        const clippedLine = cohenSutherlandClip(x1, y1, x2, y2, 100, 100, 300, 250);
        if (clippedLine) {
            // Drawing part of lines inside rectangular region
            drawLine(ctx, clippedLine[0], clippedLine[1], clippedLine[2], clippedLine[3], 'black');
        }
    }
}

function zadatak1(){
    drawCohen(ctx)
}

////////////////////////ZADATAK 2///////////////////////////////////////////

function clipLine(x1, y1, x2, y2, xmin, ymin, xmax, ymax) {
    var p1 = [x1, y1];
    var p2 = [x2, y2];
    var q = [];
    var r = [];
    var t1 = 0;
    var t2 = 1;

    var dx = p2[0] - p1[0];
    var dy = p2[1] - p1[1];

    var p_arr = [-dx, dx, -dy, dy];
    var q_arr = [p1[0] - xmin, xmax - p1[0], p1[1] - ymin, ymax - p1[1]];

    for (var i = 0; i < 4; i++) {
        if (p_arr[i] == 0 && q_arr[i] < 0)
            return false;
        if (p_arr[i] != 0) {
            var t = q_arr[i] / p_arr[i];
            if (p_arr[i] < 0 && t > t1)
                t1 = t;
            else if (p_arr[i] > 0 && t < t2)
                t2 = t;
        }
    }

    if (t1 > t2)
        return false;

    return [p1[0] + t1 * dx, p1[1] + t1 * dy, p1[0] + t2 * dx, p1[1] + t2 * dy];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawLiang(ctx) {

    // Crtanje pravougaonika
    drawRectangle(ctx, 100, 100, 300, 250, 'red');

    // Generisanje i crtanje duži
    for (var i = 0; i < 50; i++) {
        var x1 = getRandomNumber(0, 450);
        var y1 = getRandomNumber(0, 350);
        var x2 = getRandomNumber(0, 450);
        var y2 = getRandomNumber(0, 350);
        drawLine(ctx, x1, y1, x2, y2, '#CCCCCC');

        // Provera i crtanje delova duži unutar pravougaonika
        var clippedLine = clipLine(x1, y1, x2, y2, 100, 100, 300, 250);
        if (clippedLine !== false) {
            drawLine(ctx, clippedLine[0], clippedLine[1], clippedLine[2], clippedLine[3], 'black');
        }
    }
}
function zadatak2(){
    canvasClear(ctx);
    drawLiang(ctx)

}
////////////////////////ZADATAK 3///////////////////////////////////////////

function polygonLinesIntersect(poligon, duz){
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
    poligon = polygonLinesIntersect(poligon, [1, 0, -R[1]]);
    poligon = polygonLinesIntersect(poligon, [-1, 0, R[0]]);
    poligon = polygonLinesIntersect(poligon, [0, 1, -R[3]]);
    poligon = polygonLinesIntersect(poligon, [0, -1, R[2]]);
    return poligon;
}

let poligon = [];
function odaberiTacke(){
    let poligon = [];
    var R = [100, 200, 0, 400];
    pravouganoikPoligon(ctx, R[0], R[1], R[2], R[3], "red");
    canvas.ondblclick = function(event) {
        poligon = sutherlandHodgman(poligon, R);
        fillPolygon(poligon);
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

function fillPolygon(poligon) {
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

function zadatak3(){
    canvasClear(ctx);
    odaberiTacke( );
}

////////////////////////ZADATAK 4///////////////////////////////////////////

// Funkcija koja primenjuje Bresenhamov algoritam za rasterizaciju linije
function drawLineBresenhamov(ctx, x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        ctx.fillRect(x0, y0, 1, 1);
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

// Funkcija koja crta 72 linije koje imaju zajedničku tačku i zaklapaju ugao od 5°
function drawLines(ctx, x, y, numLines, angle) {
    let angleRad = angle * Math.PI / 180;
    let cosAngle = Math.cos(angleRad);
    let sinAngle = Math.sin(angleRad);

    for (let i = 0; i < numLines; i++) {
        let newX = Math.round(x + Math.cos(i * angleRad) * 100);
        let newY = Math.round(y + Math.sin(i * angleRad) * 100);
        drawLineBresenhamov(ctx, x, y, newX, newY);
    }
}

function zadatak4(){
    canvasClear(ctx);
    drawLines(ctx, 400, 400, 72, 5);
}


////////////////////////ZADATAK 5///////////////////////////////////////////

function drawPixel(ctx, x, y, brightness) {
    var imageData = ctx.getImageData(x, y, 1, 1).data;
    var pixelBrightness = (imageData[3] == 0) ? 255 : imageData[0];
    var combinedBrightness = Math.max(brightness + pixelBrightness - 255, 0);
    ctx.fillStyle = "rgb(" + combinedBrightness + "," + combinedBrightness + "," + combinedBrightness + ")";
    ctx.fillRect(x, y, 1, 1);
}

function drawAntialiasedCircle(ctx, x_center, y_center, radius) {
    var x = radius;
    var y = 0;
    var decisionOver2 = 1 - x;

    while (y <= x) {
        drawPixel(ctx, x_center + x, y_center + y, 255 * (x - Math.floor(x)));
        drawPixel(ctx, x_center + y, y_center + x, 255 * (y - Math.floor(y)));
        drawPixel(ctx, x_center - y, y_center + x, 255 * (y - Math.floor(y)));
        drawPixel(ctx, x_center - x, y_center + y, 255 * (x - Math.floor(x)));
        drawPixel(ctx, x_center - x, y_center - y, 255 * (x - Math.floor(x)));
        drawPixel(ctx, x_center - y, y_center - x, 255 * (y - Math.floor(y)));
        drawPixel(ctx, x_center + y, y_center - x, 255 * (y - Math.floor(y)));
        drawPixel(ctx, x_center + x, y_center - y, 255 * (x - Math.floor(x)));

        y++;
        if (decisionOver2 <= 0) {
            decisionOver2 += 2 * y + 1;
        } else {
            x--;
            decisionOver2 += 2 * (y - x) + 1;
        }
    }
}

function zadatak5(){
    canvasClear(ctx);
    var centerX = 300;
    var centerY = 150;
    for (var radius = 5; radius <= 100; radius += 5) {
        drawAntialiasedCircle(ctx, centerX, centerY, radius);
    }
}

// Zadatak 6

function combinePixel(ctx, x, y, graylevel, boja = "black", velicina = 1){
    var pixdata = ctx.getImageData(x, y, velicina, velicina).data;
    var pixc = (pixdata[3] == 0) ? 255 : pixdata[0];
    var comblevel = Math.max(graylevel + pixc - 255, 0);
    ctx.fillStyle = "rgb("+ comblevel + "," + comblevel + "," + comblevel +")";
    ctx.fillRect(x, y, velicina, velicina);
}

function xiaolinWuAntialiasing(x1, y1, x2, y2, boja = "black", velicina = 1, M = 256){
    let e = 0;
    let s = Math.sign(x2 - x1) * Math.sign(y2 - y1);
    let ss = M * s;
    if(Math.abs(x2 - x1) >= Math.abs(y2 - y1)){
        let k = Math.floor(M * (y2 - y1) / (x2 - x1));
        let Y = (x1 < x2) ? y1 : y2;
        var mini = Math.min(x1, x2);
        var maxi = Math.max(x1, x2);
        for(var X = mini; X < maxi; X++){
            combinePixel(ctx, X, Y, e / M, boja, velicina);
            combinePixel(ctx, X, Y + 1, (M - 1 - e) / M, boja, velicina);
            e = e + k;
            if(e < 0 || e >= M){
                Y = Y + s;
                e = e - ss;
            }
        }
    }
    else{
        let k = Math.floor(M * (x2 - x1) / (y2 - y1));
        let X = (y1 < y2) ? x1 : x2;
        var mini = Math.min(y1, y2);
        var maxi = Math.max(y1, y2);
        for(var Y = mini; Y < maxi; Y++){
            combinePixel(ctx, X, Y, e / M, boja, velicina);
            combinePixel(ctx, X + 1, Y, (M - 1 - e) / M, boja, velicina);
            e = e + k;
            if(e < 0 || e >= M){
                X = X + s;
                e = e - ss;
            }
        }
    }
}

function lepezaAntialiasing(ctx, x, y, n = 72, radijus = 70, boja = "black", debljina = 1){
    var xp = x;
    var yp = y;
    ugao = 2 * Math.PI / n;
    var alfa = ugao;
    ugao = 0;
    for(let i = 0; i < n; i++){
        x = xp + radijus * Math.cos(ugao);
        y = yp + radijus * Math.sin(ugao);
        ugao -= alfa;
        xiaolinWuAntialiasing(xp, yp, x, y, boja, debljina);
    }
}

function zadatak6(){
    canvasClear(ctx);
    lepezaAntialiasing(ctx, 200, 200, 100, 200);
}
