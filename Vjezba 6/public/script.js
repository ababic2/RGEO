let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let points = [];

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
}

// Funkcija za generisanje nasumičnih tačaka - scaleane da se izbjegne rad s decimalnim br jer ne bude precizno odredjivanje opsega
function generateRandomPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Očisti canvas
    for (let i = 0; i < 100; i++) {
        let point = {
            x: Math.random() * canvas.width, // Nasumična x koordinata
            y: Math.random() * canvas.height  // Nasumična y koordinata
        };
        points.push(point);
    }
    drawPoints(ctx, points, "red");
    return points;
}

// Funkcija za generisanje nasumičnog pravougaonika koji pokriva neke tačke
function generateRandomRectangle() {
    let x1 = Math.random() * canvas.width; // Nasumična x koordinata gornjeg lijevog ugla
    let y1 = Math.random() * canvas.height; // Nasumična y koordinata gornjeg lijevog ugla
    let x2 = Math.random() * canvas.width; // Nasumična x koordinata donjeg desnog ugla
    let y2 = Math.random() * canvas.height; // Nasumična y koordinata donjeg desnog ugla

    // Swap values if necessary to ensure x1 < x2 and y1 < y2
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
    }
    if (y1 > y2) {
        [y1, y2] = [y2, y1];
    }

    return { x1: x1, y1: y1, x2: x2, y2: y2 };
}


// Brute force algoritam za određivanje tačaka unutar pravougaonika
function RectangularSearch_Naive(points, rectangle) {
    let pointsInside = [];
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        if (point.x >= rectangle.x1 && point.x <= rectangle.x2 &&
            point.y >= rectangle.y1 && point.y <= rectangle.y2) {
            pointsInside.push(point);
        }
    }
    return pointsInside;
}

// Funkcija za iscrtavanje tačaka na canvasu
function drawPoints(ctx, points, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        ctx.beginPath();
        ctx.arc(Math.floor(point.x), Math.floor(point.y), 3, 0, Math.PI * 2);
        ctx.fill();
    }
}


// Glavna funkcija koja se poziva na klik na dugme
function drawRectangleAndPoints() {

    // Generisanje nasumičnih tačaka i pravougaonika
    let rectangle = generateRandomRectangle();

    // Crtanje pravougaonika
    ctx.strokeStyle = "black";
    ctx.strokeRect(rectangle.x1, rectangle.y1, rectangle.x2 - rectangle.x1, rectangle.y2 - rectangle.y1);


    // Pronalaženje tačaka unutar pravougaonika i iscrtavanje svih tačaka
    let pointsInside = RectangularSearch_Naive(points, rectangle);
    drawPoints(ctx, pointsInside, "green");

    // Ispis broja tačaka unutar pravougaonika
    console.log("Broj tačaka unutar pravougaonika:", pointsInside.length);
    console.log("Tačke unutar pravougaonika:", pointsInside);
}
