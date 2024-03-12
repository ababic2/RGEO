const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Dodavanje event listenera za klik lijevim mišem na canvas
canvas.addEventListener('click', addVertex);

// Funkcija koja se poziva kada se klikne na canvas
function addVertex(event) {
    // Dobivanje referenca na canvas
    var canvas = document.getElementById('myCanvas');
    // Dobivanje konteksta crtanja (2D kontekst)
    // var ctx2 = canvas.getContext('2d');
    // Dobivanje koordinata klika
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    // Crtanje točke (vertexa)
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function loadTxtFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

function addPointsFromFile(fileContent, ctx) {
    const lines = fileContent.trim().split('\n');
    lines.forEach(line => {
        const [x, y] = line.split(',').map(Number);
        drawPoint(ctx, x, y);
    });
}

function addLinesFromFile(fileContent, ctx) {
    const lines = fileContent.trim().split('\n');
    lines.forEach(line => {
        const [x1, y1, x2, y2] = line.split(',').map(Number);
        drawLine(ctx, x1, y1, x2, y2);
    });
}

function drawPoint(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

document.addEventListener('DOMContentLoaded', () => {

    const fileInputVertex = document.getElementById('fileInputVertex');
    fileInputVertex.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        const fileContent = await loadTxtFile(file);
        addPointsFromFile(fileContent, ctx);
    });

    const fileInputLine = document.getElementById('fileInputLine');
    fileInputLine.addEventListener('change', async (event) => {
       const file = event.target.files[0];
       const fileContent = await loadTxtFile(file);
       addLinesFromFile(fileContent, ctx);
    });

    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', clearCanvas);

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

