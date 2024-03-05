const { drawTriangle } = require('./basicShapes.js');
const { createAndSaveCanvas } = require('./canvasInit.js');

const x = 200; // x koordinata centra kruga
const y = 200; // y koordinata centra kruga
const n = 20; // broj trouglova (segmenata)

// Funkcija za crtanje kruga koristeći trouglove (TriangleFan)
function drawCircleWithTriangles(ctx, x, y, n) {
    const colors = ['red', 'blue']; // Lista boja za trouglove
    const radius = 100; // Poluprečnik kruga

    // Crtanje kruga
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Crtanje trouglova (TriangleFan)
    for (let i = 0; i < n; i++) {
        const angle1 = (i / n) * Math.PI * 2;
        const angle2 = ((i + 1) / n) * Math.PI * 2;

        // Koordinate tačaka trougla
        const x1 = x;
        const y1 = y;
        const x2 = x + radius * Math.cos(angle1);
        const y2 = y + radius * Math.sin(angle1);
        const x3 = x + radius * Math.cos(angle2);
        const y3 = y + radius * Math.sin(angle2);

        // Crtanje trougla
        drawTriangle(ctx, x1, y1, x2, y2, x3, y3, colors[i % 2]);
    }
}

createAndSaveCanvas(drawCircleWithTriangles, 'drawCircleWithTriangles', 5, x, y, n)

