const m = 5;
const n = 5;

const { drawTriangle } = require('./basicShapes.js');
const { drawCircle } = require('./basicShapes.js');
const { createAndSaveCanvas } = require('./canvasInit.js');
// Funkcija za crtanje Quad-a korištenjem trouglova updated version za ovaj zadatak
function drawQuad(ctx, x, y, d, radius) {
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

    drawCircle(ctx, x, y, radius);
    drawCircle(ctx, x2, y2, radius);
    drawCircle(ctx, x4, y4, radius);
    drawCircle(ctx, x3, y3, radius);
}

function drawGridWithCirclesAndQuads(ctx, m, n) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // const cellWidth = canvasWidth / n;
    // const cellHeight = canvasHeight / m;

    const padding = 20;

    const cellWidth = (canvasWidth - (n - 1) * padding) / n;
    const cellHeight = (canvasHeight - (m - 1) * padding) / m;

    // Drawing grid of circles
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            // Drawing quad inside the circle
            const x = j * (cellWidth + (j === 0 ? padding : 0));
            const y = i * (cellHeight + (i === 0 ? padding : 0));
            const d = Math.min(cellWidth, cellHeight); // Length of quad's side
            const radius = Math.min(cellWidth, cellHeight) / 8; // Set radius for circles

            drawQuad(ctx, x, y, d, radius); // Draw the quad inside the cell

        }
    }
}

createAndSaveCanvas(drawGridWithCirclesAndQuads, 'drawGridWithCirclesAndQuads', 4, m, n)
