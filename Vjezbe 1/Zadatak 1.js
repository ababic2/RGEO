const { createAndSaveCanvas } = require('./canvasInit.js');

const m = 10;
const n = 10;
function drawGridWithLines(ctx, m, n) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    const cellWidth = canvasWidth / n;
    const cellHeight = canvasHeight / m;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    for (let i = 0; i < m; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellHeight);
        ctx.lineTo(canvasWidth, i * cellHeight);
        ctx.stroke();
    }

    for (let j = 0; j < n; j++) {
        ctx.beginPath();
        ctx.moveTo(j * cellWidth, 0);
        ctx.lineTo(j * cellWidth, canvasHeight);
        ctx.stroke();
    }
}

function drawGridWithRectangles(ctx, m, n) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    const cellWidth = canvasWidth / n;
    const cellHeight = canvasHeight / m;

    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ctx.fillRect(j * cellWidth, i * cellHeight, 1, 1);
        }
    }
}

function drawGridWithCircles(ctx, m, n) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    const cellWidth = canvasWidth / n;
    const cellHeight = canvasHeight / m;

    ctx.fillStyle = 'red';
    ctx.lineWidth = 1; // Set the line width to 1 pixel

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ctx.beginPath();
            ctx.strokeStyle = 'black'; // Set stroke color to black
            ctx.lineWidth = 1; // Set line width for the border
            ctx.arc((j + 0.5) * cellWidth, (i + 0.5) * cellHeight, 5.0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Create and save canvases
createAndSaveCanvas(drawGridWithLines, 'drawGridWithLines', 1, m, n);
createAndSaveCanvas(drawGridWithRectangles, 'drawGridWithRectangles', 1, m, n);
createAndSaveCanvas(drawGridWithCircles, 'drawGridWithCircles', 1, m, n);
