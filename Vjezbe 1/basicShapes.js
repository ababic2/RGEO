// ------- modul osnovnih geo oblika --------
// Funkcija za crtanje trougla
function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
}

// Funkcija koja crta kvadrat na canvasu
function drawSquare(ctx, x, y, d) {
    // boje za stranice kvadrata
    const colors = ['blue', 'red', 'green', 'yellow'];

    // Iscrtajte svaku stranicu kvadrata
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[i];
        switch (i) {
            case 0:
                ctx.fillRect(x, y, d, 1);
                break;
            case 1:
                ctx.fillRect(x + d, y, 1, d);
                break;
            case 2:
                ctx.fillRect(x, y + 1, 1, d);
                break;
            case 3:
                ctx.fillRect(x, y + d, d, 1);
                break;
        }
    }
}


// Funkcija za crtanje Quad-a korištenjem trouglova
function drawQuad(ctx, x, y, d) {
    const colors = ['red', 'blue']; // Lista boja za svaki trougao
    const x2 = x + d; // Koordinata x druge tačke
    const y2 = y; // Koordinata y druge tačke
    const x3 = x; // Koordinata x treće tačke
    const y3 = y + d; // Koordinata y treće tačke
    const x4 = x2; // Koordinata x četvrte tačke
    const y4 = y3; // Koordinata y četvrte tačke
    console.log(x + ' ' + y + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3)

    // Crtanje prvog trougla
    drawTriangle(ctx, x2, y2, x4, y4, x, y, colors[0]);

    // Crtanje drugog trougla
    drawTriangle(ctx, x, y, x3, y3, x4, y4, colors[1]);
}

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'black'; // Set stroke color to black
    ctx.lineWidth = 1; // Set line width for the border
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}
module.exports = { drawTriangle, drawSquare, drawQuad, drawCircle };
