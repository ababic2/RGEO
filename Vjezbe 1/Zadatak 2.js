const { createAndSaveCanvas } = require('./canvasInit.js');
const { drawSquare } = require('./basicShapes.js');

const x = 10;
const y = 10;
const d = 100;

createAndSaveCanvas(drawSquare, 'drawSquare', 2, x, y, d);
